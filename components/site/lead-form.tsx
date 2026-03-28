"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const fieldClassName =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-[#fcfcfd] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200";

export function LeadForm() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [assessment, setAssessment] = useState<null | {
    primary_concern: string;
    confidence_score: number;
    photo_quality_status: string;
    photo_quality_feedback: string;
    recommended_treatments: string[];
    summary: string;
    disclaimer: string;
  }>(null);

  async function handleSubmit(formData: FormData) {
    setSubmitting(true);
    setStatus(null);
    setAssessment(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        body: formData
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to submit your consultation request.");
      }

      setStatus({
        type: "success",
        message: "Your consultation request has been received. Our team will contact you shortly."
      });
      setAssessment(payload.assessment ?? null);
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Something went wrong while submitting your request."
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="p-8">
      <form action={handleSubmit} className="grid gap-5 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Full name
          <input name="full_name" required className={fieldClassName} placeholder="Your full name" />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Country
          <input name="country" required className={fieldClassName} placeholder="Country of residence" />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Main concern
          <input name="concern" required className={fieldClassName} placeholder="Acne, pigmentation, anti-aging, redness" />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Preferred travel month
          <input name="preferred_travel_month" required className={fieldClassName} placeholder="October 2026" />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Budget range
          <input name="budget_range" required className={fieldClassName} placeholder="THB 15,000-30,000" />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Email
          <input name="email" type="email" required className={fieldClassName} placeholder="you@example.com" />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          WhatsApp
          <input name="whatsapp" className={fieldClassName} placeholder="+971..." />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Preferred treatment city
          <input name="preferred_city" className={fieldClassName} placeholder="Bangkok, Phuket, Chiang Mai" />
        </label>
        <label className="block text-sm font-medium text-slate-700 md:col-span-2">
          Upload a skin photo for AI pre-screening
          <input
            name="photo"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className={`${fieldClassName} file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:font-medium file:text-white`}
          />
          <span className="mt-2 block text-xs leading-6 text-slate-500">
            Optional. Used for preliminary skin concern screening and treatment matching only, not medical diagnosis.
          </span>
        </label>
        <label className="block text-sm font-medium text-slate-700 md:col-span-2">
          Tell us about your goals
          <textarea
            name="notes"
            rows={5}
            className={fieldClassName}
            placeholder="Share your concern, timeline, and whether you want consultation before travel."
          />
        </label>
        <div className="space-y-4 md:col-span-2">
          {status ? (
            <p
              className={`rounded-2xl px-4 py-3 text-sm ${
                status.type === "success"
                  ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {status.message}
            </p>
          ) : null}
          {assessment ? (
            <div className="rounded-3xl border border-slate-200 bg-[#fbfbfc] p-5 text-sm text-slate-700">
              <p className="font-semibold text-slate-950">AI pre-screening result</p>
              <p className="mt-2">Primary concern: {assessment.primary_concern}</p>
              <p>Confidence: {assessment.confidence_score}/100</p>
              <p>Photo review: {assessment.photo_quality_status}</p>
              <p className="mt-2">{assessment.photo_quality_feedback}</p>
              <p className="mt-2">{assessment.summary}</p>
              <p className="mt-3 font-medium text-slate-950">Recommended treatment directions</p>
              <ul className="mt-2 space-y-1">
                {assessment.recommended_treatments.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-6 text-slate-500">{assessment.disclaimer}</p>
            </div>
          ) : null}
          <Button type="submit" disabled={submitting}>
            {submitting ? "Sending request..." : "Request Consultation"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
