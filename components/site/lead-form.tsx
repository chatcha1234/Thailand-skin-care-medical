"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const fieldClassName =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-[#fcfcfd] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200";

const selectOptionsClassName = `${fieldClassName} appearance-none`;

const countries = ["Thailand", "Singapore", "Malaysia", "Indonesia", "Vietnam", "Philippines", "UAE", "Saudi Arabia", "Qatar", "Australia", "United Kingdom", "United States", "Other"];
const concerns = ["Acne", "Pigmentation / Melasma", "Redness / Sensitive skin", "Scars / Texture", "Anti-aging", "Laser rejuvenation", "General skin consultation"];
const travelMonths = [
  "January 2026",
  "February 2026",
  "March 2026",
  "April 2026",
  "May 2026",
  "June 2026",
  "July 2026",
  "August 2026",
  "September 2026",
  "October 2026",
  "November 2026",
  "December 2026",
  "Not decided yet"
];
const budgetRanges = ["Below THB 10,000", "THB 10,000-20,000", "THB 20,000-40,000", "Above THB 40,000", "Need guidance"];
const whatsappCodes = ["+66", "+65", "+60", "+62", "+84", "+63", "+971", "+966", "+974", "+61", "+44", "+1", "Other"];
const treatmentCities = ["Bangkok", "Phuket", "Chiang Mai", "Pattaya", "Need recommendation"];

export function LeadForm() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [aiMode, setAiMode] = useState<"mock" | "real" | null>(null);
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
    setAiMode(null);

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
      setAiMode(payload.ai_mode ?? null);
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
      <div className="mb-6 space-y-2">
        <h2 className="text-2xl font-semibold text-slate-950">Consultation request form</h2>
        <p className="text-sm leading-7 text-slate-600">Share the essentials first. Most patients finish this form in about 2 minutes.</p>
      </div>
      <form action={handleSubmit} className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5 md:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Contact details</h3>
            <p className="text-xs text-slate-500">Required</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Full name
              <input name="full_name" required className={fieldClassName} placeholder="Your full name" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Country
              <select name="country" required defaultValue="" className={selectOptionsClassName}>
                <option value="" disabled>
                  Select your country
                </option>
                {countries.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Email
              <input name="email" type="email" required className={fieldClassName} placeholder="you@example.com" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              WhatsApp country code
              <select name="whatsapp" defaultValue="" className={selectOptionsClassName}>
                <option value="">Select code</option>
                {whatsappCodes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="space-y-5 md:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Trip & treatment planning</h3>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Main concern
              <select name="concern" required defaultValue="" className={selectOptionsClassName}>
                <option value="" disabled>
                  Select main concern
                </option>
                {concerns.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Preferred travel month
              <select name="preferred_travel_month" required defaultValue="" className={selectOptionsClassName}>
                <option value="" disabled>
                  Select travel month
                </option>
                {travelMonths.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Budget range
              <select name="budget_range" required defaultValue="" className={selectOptionsClassName}>
                <option value="" disabled>
                  Select budget range
                </option>
                {budgetRanges.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Preferred treatment city
              <select name="preferred_city" defaultValue="" className={selectOptionsClassName}>
                <option value="">Select city</option>
                {treatmentCities.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="space-y-5 md:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Optional AI pre-screening</h3>
          <label className="block text-sm font-medium text-slate-700">
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
        </div>

        <div className="space-y-5 md:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Additional notes</h3>
          <label className="block text-sm font-medium text-slate-700">
            Tell us about your goals
            <textarea
              name="notes"
              rows={5}
              className={fieldClassName}
              placeholder="Share your concern, timeline, and whether you want consultation before travel."
            />
          </label>
        </div>
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
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-semibold text-slate-950">AI pre-screening result</p>
                {aiMode ? (
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {aiMode} mode
                  </span>
                ) : null}
              </div>
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-6 text-slate-500">
              This form supports consultation planning only. Final diagnosis and treatment decisions remain with licensed medical professionals.
            </p>
            <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
              {submitting ? "Sending request..." : "Request Consultation"}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
