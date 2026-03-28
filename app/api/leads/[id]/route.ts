import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { leadStatusOptions } from "@/lib/types";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const payload = (await request.json()) as {
      lead_status?: string;
      staff_notes?: string;
      assigned_to?: string;
      next_action_at?: string | null;
    };

    const leadStatus = payload.lead_status ?? "new";

    if (!leadStatusOptions.includes(leadStatus as (typeof leadStatusOptions)[number])) {
      return NextResponse.json({ error: "Invalid lead status." }, { status: 400 });
    }

    const updates = {
      lead_status: leadStatus,
      staff_notes: payload.staff_notes?.trim() ?? "",
      assigned_to: payload.assigned_to?.trim() ?? "",
      next_action_at: payload.next_action_at || null,
      contacted_at: leadStatus === "contacted" ? new Date().toISOString() : null
    };

    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase.from("international_leads").update(updates).eq("id", id).select("*").single();

    if (error || !data) {
      return NextResponse.json({ error: error?.message ?? "Lead not found." }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update lead." },
      { status: 500 }
    );
  }
}
