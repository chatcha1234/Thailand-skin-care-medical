import { LeadDashboard } from "@/components/site/lead-dashboard";
import { Card } from "@/components/ui/card";
import { createServerSupabaseClient } from "@/lib/supabase";
import type { InternationalLeadRecord } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function DashboardLeadsPage() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from("international_leads").select("*").order("created_at", { ascending: false });

  const leads = ((error ? [] : data) ?? []) as InternationalLeadRecord[];

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Operations dashboard</p>
          <h1 className="text-4xl font-semibold text-slate-950">Manage incoming consultation leads in one place</h1>
          <p className="max-w-3xl text-base leading-8 text-slate-600">
            Review new consultation requests, inspect the AI pre-screening output, assign follow-up ownership, and keep the
            pipeline moving without bouncing between Supabase rows manually.
          </p>
        </div>
        <Card className="space-y-3 bg-[#fbfbfc]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">How to use</p>
          <p className="text-sm leading-7 text-slate-600">
            Start with `new` leads, assign an owner, set the next action time, and capture outreach notes directly inside the
            dashboard.
          </p>
        </Card>
      </section>

      {error ? (
        <Card className="border-red-200 bg-red-50 text-red-700">
          Unable to load leads: {error.message}
        </Card>
      ) : (
        <LeadDashboard initialLeads={leads} />
      )}
    </div>
  );
}
