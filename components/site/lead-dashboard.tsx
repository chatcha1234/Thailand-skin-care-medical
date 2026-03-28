"use client";
import { useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { leadStatusOptions } from "@/lib/types";
import type { InternationalLeadRecord, LeadStatus } from "@/lib/types";

const statusLabel: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  closed: "Closed"
};

const statusClassName: Record<LeadStatus, string> = {
  new: "bg-sky-50 text-sky-700 ring-sky-200",
  contacted: "bg-amber-50 text-amber-700 ring-amber-200",
  qualified: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  closed: "bg-slate-100 text-slate-600 ring-slate-200"
};

const priorityClassName = {
  low: "bg-slate-100 text-slate-600 ring-slate-200",
  medium: "bg-amber-50 text-amber-700 ring-amber-200",
  high: "bg-rose-50 text-rose-700 ring-rose-200"
} as const;

function formatDateTime(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function splitPipeList(value: string) {
  return value
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function LeadDashboard({ initialLeads }: { initialLeads: InternationalLeadRecord[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [query, setQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus | "all">("all");
  const [selectedLeadId, setSelectedLeadId] = useState(initialLeads[0]?.id ?? "");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [draft, setDraft] = useState({
    lead_status: initialLeads[0]?.lead_status ?? "new",
    assigned_to: initialLeads[0]?.assigned_to ?? "",
    next_action_at: initialLeads[0]?.next_action_at ? initialLeads[0].next_action_at.slice(0, 16) : "",
    staff_notes: initialLeads[0]?.staff_notes ?? ""
  });

  const filteredLeads = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesStatus = selectedStatus === "all" || lead.lead_status === selectedStatus;
      const haystack = [
        lead.full_name,
        lead.email,
        lead.country,
        lead.concern,
        lead.preferred_city,
        lead.assigned_to
      ]
        .join(" ")
        .toLowerCase();

      return matchesStatus && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [leads, query, selectedStatus]);

  const selectedLead = filteredLeads.find((lead) => lead.id === selectedLeadId) ?? filteredLeads[0] ?? null;

  function syncDraft(lead: InternationalLeadRecord | null) {
    setDraft({
      lead_status: lead?.lead_status ?? "new",
      assigned_to: lead?.assigned_to ?? "",
      next_action_at: lead?.next_action_at ? lead.next_action_at.slice(0, 16) : "",
      staff_notes: lead?.staff_notes ?? ""
    });
  }

  function handleSelectLead(lead: InternationalLeadRecord) {
    setSelectedLeadId(lead.id);
    setFeedback(null);
    syncDraft(lead);
  }

  async function handleSave() {
    if (!selectedLead) {
      return;
    }

    setFeedback(null);

    startTransition(async () => {
      try {
        const response = await fetch(`/api/leads/${selectedLead.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lead_status: draft.lead_status,
            assigned_to: draft.assigned_to,
            next_action_at: draft.next_action_at ? new Date(draft.next_action_at).toISOString() : null,
            staff_notes: draft.staff_notes
          })
        });

        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error ?? "Unable to update lead.");
        }

        const nextLead = payload.data as InternationalLeadRecord;

        setLeads((currentLeads) => currentLeads.map((lead) => (lead.id === nextLead.id ? nextLead : lead)));
        setSelectedLeadId(nextLead.id);
        syncDraft(nextLead);
        setFeedback("Lead updated.");
      } catch (error) {
        setFeedback(error instanceof Error ? error.message : "Something went wrong while saving.");
      }
    });
  }

  const statusCounts = leads.reduce<Record<LeadStatus, number>>(
    (accumulator, lead) => {
      accumulator[lead.lead_status] += 1;
      return accumulator;
    },
    { new: 0, contacted: 0, qualified: 0, closed: 0 }
  );

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {leadStatusOptions.map((status) => (
          <Card key={status} className="space-y-2 bg-[#fbfbfc]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{statusLabel[status]}</p>
            <p className="text-3xl font-semibold text-slate-950">{statusCounts[status]}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="space-y-5 p-0">
          <div className="border-b border-slate-200 p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name, email, country, or concern"
                className="w-full rounded-2xl border border-slate-200 bg-[#fcfcfd] px-4 py-3 text-sm"
              />
              <select
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value as LeadStatus | "all")}
                className="rounded-2xl border border-slate-200 bg-[#fcfcfd] px-4 py-3 text-sm"
              >
                <option value="all">All statuses</option>
                {leadStatusOptions.map((status) => (
                  <option key={status} value={status}>
                    {statusLabel[status]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="max-h-[780px] space-y-3 overflow-y-auto px-4 pb-4">
            {filteredLeads.length ? (
              filteredLeads.map((lead) => (
                <button
                  key={lead.id}
                  type="button"
                  onClick={() => handleSelectLead(lead)}
                  className={`w-full rounded-[24px] border p-5 text-left transition ${
                    selectedLead?.id === lead.id ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold">{lead.full_name}</p>
                      <p className={`text-sm ${selectedLead?.id === lead.id ? "text-slate-300" : "text-slate-500"}`}>{lead.email}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ring-1 ${
                          selectedLead?.id === lead.id ? "bg-white/10 text-white ring-white/20" : statusClassName[lead.lead_status]
                        }`}
                      >
                        {statusLabel[lead.lead_status]}
                      </span>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ring-1 ${
                          selectedLead?.id === lead.id ? "bg-white/10 text-white ring-white/20" : priorityClassName[lead.ai_priority_label]
                        }`}
                      >
                        {lead.ai_priority_label} priority
                      </span>
                    </div>
                  </div>
                  <div className={`mt-4 grid gap-2 text-sm ${selectedLead?.id === lead.id ? "text-slate-200" : "text-slate-600"}`}>
                    <p>{lead.country} · {lead.concern}</p>
                    <p>{lead.preferred_travel_month} · {lead.budget_range}</p>
                    <p>AI score: {lead.ai_lead_score || 0}/100</p>
                    <p>Assigned: {lead.assigned_to || "-"}</p>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-6 text-sm text-slate-500">No leads match the current filter.</div>
            )}
          </div>
        </Card>

        <Card className="space-y-6">
          {selectedLead ? (
            <>
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Lead detail</p>
                  <h1 className="text-3xl font-semibold text-slate-950">{selectedLead.full_name}</h1>
                  <p className="text-sm leading-7 text-slate-600">
                    Submitted {formatDateTime(selectedLead.created_at)} · {selectedLead.country} · {selectedLead.email}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ring-1 ${statusClassName[selectedLead.lead_status]}`}>
                    {statusLabel[selectedLead.lead_status]}
                  </span>
                  <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ring-1 ${priorityClassName[selectedLead.ai_priority_label]}`}>
                    {selectedLead.ai_priority_label} priority
                  </span>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="space-y-3 bg-[#fbfbfc] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Trip & contact</p>
                  <p className="text-sm text-slate-700">Concern: {selectedLead.concern}</p>
                  <p className="text-sm text-slate-700">Travel month: {selectedLead.preferred_travel_month}</p>
                  <p className="text-sm text-slate-700">Budget: {selectedLead.budget_range}</p>
                  <p className="text-sm text-slate-700">Preferred city: {selectedLead.preferred_city || "-"}</p>
                  <p className="text-sm text-slate-700">WhatsApp: {selectedLead.whatsapp || "-"}</p>
                </Card>

                <Card className="space-y-3 bg-[#fbfbfc] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">AI triage</p>
                  <p className="text-sm font-semibold text-slate-950">Lead score: {selectedLead.ai_lead_score || 0}/100</p>
                  <p className="text-sm text-slate-700">Primary concern: {selectedLead.ai_primary_concern || "-"}</p>
                  <p className="text-sm text-slate-700">Confidence: {selectedLead.ai_confidence_score || 0}/100</p>
                  <p className="text-sm text-slate-700">Photo status: {selectedLead.ai_photo_quality_status || "-"}</p>
                  <p className="text-sm text-slate-700">Next action: {formatDateTime(selectedLead.next_action_at)}</p>
                  <p className="text-sm text-slate-700">Contacted at: {formatDateTime(selectedLead.contacted_at)}</p>
                </Card>
              </div>

              {selectedLead.photo_url ? (
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Uploaded photo</p>
                  <div className="relative h-[320px] overflow-hidden rounded-[28px] border border-slate-200">
                    <img
                      src={selectedLead.photo_url}
                      alt={`${selectedLead.full_name} uploaded skin concern`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              ) : null}

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Patient note</p>
                  <div className="rounded-[24px] border border-slate-200 bg-[#fbfbfc] p-5 text-sm leading-7 text-slate-700">
                    {selectedLead.notes || "No additional note provided."}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">AI conversion summary</p>
                  <div className="rounded-[24px] border border-slate-200 bg-[#fbfbfc] p-5 text-sm leading-7 text-slate-700">
                    {selectedLead.ai_conversion_summary || "No AI summary available."}
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">AI staff brief</p>
                  <div className="rounded-[24px] border border-slate-200 bg-[#fbfbfc] p-5 text-sm leading-7 text-slate-700">
                    {selectedLead.ai_staff_summary || selectedLead.ai_summary || "No AI staff brief available."}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Follow-up reasons</p>
                  <div className="rounded-[24px] border border-slate-200 bg-[#fbfbfc] p-5">
                    <ul className="space-y-2 text-sm leading-7 text-slate-700">
                      {splitPipeList(selectedLead.ai_follow_up_reasons).length ? (
                        splitPipeList(selectedLead.ai_follow_up_reasons).map((item) => <li key={item}>{item}</li>)
                      ) : (
                        <li>No AI follow-up reasons available.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Recommended treatments</p>
                <div className="flex flex-wrap gap-2">
                  {splitPipeList(selectedLead.ai_recommended_treatments).length ? (
                    splitPipeList(selectedLead.ai_recommended_treatments).map((item) => (
                      <span key={item} className="rounded-full border border-slate-200 bg-[#fbfbfc] px-3 py-2 text-sm text-slate-700">
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">No recommended treatment yet.</span>
                  )}
                </div>
              </div>

              <div className="space-y-4 border-t border-slate-200 pt-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Lead status
                    <select
                      value={draft.lead_status}
                      onChange={(event) => setDraft((current) => ({ ...current, lead_status: event.target.value as LeadStatus }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#fcfcfd] px-4 py-3 text-sm"
                    >
                      {leadStatusOptions.map((status) => (
                        <option key={status} value={status}>
                          {statusLabel[status]}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block text-sm font-medium text-slate-700">
                    Assigned to
                    <input
                      value={draft.assigned_to}
                      onChange={(event) => setDraft((current) => ({ ...current, assigned_to: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#fcfcfd] px-4 py-3 text-sm"
                      placeholder="Coordinator name"
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700 md:col-span-2">
                    Next action time
                    <input
                      type="datetime-local"
                      value={draft.next_action_at}
                      onChange={(event) => setDraft((current) => ({ ...current, next_action_at: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#fcfcfd] px-4 py-3 text-sm"
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700 md:col-span-2">
                    Staff notes
                    <textarea
                      rows={6}
                      value={draft.staff_notes}
                      onChange={(event) => setDraft((current) => ({ ...current, staff_notes: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#fcfcfd] px-4 py-3 text-sm"
                      placeholder="Add follow-up notes, treatment fit, pricing context, or outreach details"
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className={`text-sm ${feedback?.includes("updated") ? "text-emerald-600" : "text-slate-500"}`}>
                    {feedback ?? "Update the operational fields and save changes here."}
                  </p>
                  <Button type="button" disabled={isPending} onClick={handleSave as never} className="w-full sm:w-auto">
                    {isPending ? "Saving..." : "Save lead"}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="py-10 text-sm text-slate-500">No lead selected.</div>
          )}
        </Card>
      </section>
    </div>
  );
}
