import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getServerEnv } from "@/lib/env";
import { evaluateLeadIntelligence, evaluateSkinPreAssessment } from "@/lib/openai";
import { createServerSupabaseClient } from "@/lib/supabase";
import type { LeadStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const env = getServerEnv();
    const getField = (key: string) => {
      const value = formData.get(key);
      return typeof value === "string" ? value.trim() : "";
    };

    const photoFile = formData.get("photo");

    const lead: {
      full_name: string;
      country: string;
      concern: string;
      preferred_travel_month: string;
      budget_range: string;
      email: string;
      whatsapp: string;
      preferred_city: string;
      notes: string;
      photo_url: string;
      ai_primary_concern: string;
      ai_confidence_score: number;
      ai_photo_quality_status: string;
      ai_photo_quality_feedback: string;
      ai_recommended_treatments: string;
      ai_summary: string;
      ai_disclaimer: string;
      ai_lead_score: number;
      ai_priority_label: "low" | "medium" | "high";
      ai_conversion_summary: string;
      ai_staff_summary: string;
      ai_follow_up_reasons: string;
      lead_status?: LeadStatus;
    } = {
      full_name: getField("full_name"),
      country: getField("country"),
      concern: getField("concern"),
      preferred_travel_month: getField("preferred_travel_month"),
      budget_range: getField("budget_range"),
      email: getField("email"),
      whatsapp: getField("whatsapp"),
      preferred_city: getField("preferred_city"),
      notes: getField("notes"),
      photo_url: "",
      ai_primary_concern: "",
      ai_confidence_score: 0,
      ai_photo_quality_status: "",
      ai_photo_quality_feedback: "",
      ai_recommended_treatments: "",
      ai_summary: "",
      ai_disclaimer: "",
      ai_lead_score: 0,
      ai_priority_label: "low",
      ai_conversion_summary: "",
      ai_staff_summary: "",
      ai_follow_up_reasons: ""
    };

    if (!lead.full_name || !lead.country || !lead.concern || !lead.preferred_travel_month || !lead.budget_range || !lead.email) {
      return NextResponse.json({ error: "Please complete the required consultation fields." }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();
    let assessment: Awaited<ReturnType<typeof evaluateSkinPreAssessment>> | null = null;

    if (photoFile instanceof File && photoFile.size > 0) {
      const buffer = Buffer.from(await photoFile.arrayBuffer());
      const storagePath = `${randomUUID()}-${photoFile.name.replace(/\s+/g, "-").toLowerCase()}`;
      const uploadResult = await supabase.storage.from(env.supabaseStorageBucket).upload(storagePath, buffer, {
        contentType: photoFile.type,
        upsert: false
      });

      if (uploadResult.error) {
        throw new Error(uploadResult.error.message);
      }

      const { data: publicUrlData } = supabase.storage.from(env.supabaseStorageBucket).getPublicUrl(storagePath);
      lead.photo_url = publicUrlData.publicUrl;

      assessment = await evaluateSkinPreAssessment(buffer.toString("base64"), photoFile.type);
      lead.ai_primary_concern = assessment.primary_concern;
      lead.ai_confidence_score = assessment.confidence_score;
      lead.ai_photo_quality_status = assessment.photo_quality_status;
      lead.ai_photo_quality_feedback = assessment.photo_quality_feedback;
      lead.ai_recommended_treatments = assessment.recommended_treatments.join(" | ");
      lead.ai_summary = assessment.summary;
      lead.ai_disclaimer = assessment.disclaimer;
    }

    const leadIntelligence = await evaluateLeadIntelligence({
      full_name: lead.full_name,
      country: lead.country,
      concern: lead.concern,
      preferred_travel_month: lead.preferred_travel_month,
      budget_range: lead.budget_range,
      email: lead.email,
      whatsapp: lead.whatsapp,
      preferred_city: lead.preferred_city,
      notes: lead.notes,
      ai_primary_concern: lead.ai_primary_concern,
      ai_confidence_score: lead.ai_confidence_score,
      ai_photo_quality_status: lead.ai_photo_quality_status,
      ai_recommended_treatments: lead.ai_recommended_treatments
        ? lead.ai_recommended_treatments
            .split("|")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],
      ai_summary: lead.ai_summary
    });

    lead.ai_lead_score = leadIntelligence.lead_score;
    lead.ai_priority_label = leadIntelligence.priority_label;
    lead.ai_conversion_summary = leadIntelligence.conversion_summary;
    lead.ai_staff_summary = leadIntelligence.staff_summary;
    lead.ai_follow_up_reasons = leadIntelligence.follow_up_reasons.join(" | ");

    const { error } = await supabase.from("international_leads").insert(lead);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ success: true, assessment, lead_intelligence: leadIntelligence, ai_mode: env.aiMode });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to save your consultation request." },
      { status: 500 }
    );
  }
}
