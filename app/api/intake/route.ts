import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getServerEnv } from "@/lib/env";
import { evaluatePhotoQuality } from "@/lib/openai";
import { calculateFormCompleteness, calculateReadinessScore } from "@/lib/scoring";
import { buildClinicalSummary } from "@/lib/summary";
import { createServerSupabaseClient } from "@/lib/supabase";
import type { BudgetOption, DurationOption, PatientInsert, SkinConcern } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getStringField(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    throw new Error(`Missing field: ${key}`);
  }

  return value.trim();
}

export async function POST(request: Request) {
  try {
    const env = getServerEnv();
    const formData = await request.formData();
    const photoFile = formData.get("photo");

    if (!(photoFile instanceof File)) {
      return NextResponse.json({ error: "Photo upload is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await photoFile.arrayBuffer());
    const storagePath = `${randomUUID()}-${photoFile.name.replace(/\s+/g, "-").toLowerCase()}`;
    const supabase = createServerSupabaseClient();

    const uploadResult = await supabase.storage.from(env.supabaseStorageBucket).upload(storagePath, buffer, {
      contentType: photoFile.type,
      upsert: false
    });

    if (uploadResult.error) {
      throw new Error(uploadResult.error.message);
    }

    const { data: publicUrlData } = supabase.storage.from(env.supabaseStorageBucket).getPublicUrl(storagePath);
    const photoAssessment = await evaluatePhotoQuality(buffer.toString("base64"), photoFile.type);

    const draftPatient = {
      full_name: getStringField(formData, "full_name"),
      age_range: getStringField(formData, "age_range"),
      gender: getStringField(formData, "gender"),
      country: getStringField(formData, "country"),
      skin_concern: getStringField(formData, "skin_concern") as SkinConcern,
      duration: getStringField(formData, "duration") as DurationOption,
      previous_treatment: getStringField(formData, "previous_treatment"),
      allergy: getStringField(formData, "allergy"),
      medication: getStringField(formData, "medication"),
      budget_range: getStringField(formData, "budget_range") as BudgetOption
    };

    const formCompleteness = calculateFormCompleteness(draftPatient);
    const readinessScore = calculateReadinessScore(formCompleteness, photoAssessment.quality_score);

    const patientInsert: PatientInsert & { photo_feedback: string } = {
      ...draftPatient,
      photo_url: publicUrlData.publicUrl,
      photo_quality_score: photoAssessment.quality_score,
      photo_status: photoAssessment.status,
      readiness_score: readinessScore,
      summary: "",
      photo_feedback: photoAssessment.feedback
    };

    patientInsert.summary = buildClinicalSummary(patientInsert, photoAssessment);

    const { data, error } = await supabase.from("patients").insert(patientInsert).select("id").single();

    if (error || !data) {
      throw new Error(error?.message ?? "Failed to save patient intake record.");
    }

    return NextResponse.json({ id: data.id, readiness_score: readinessScore });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to process intake submission."
      },
      { status: 500 }
    );
  }
}
