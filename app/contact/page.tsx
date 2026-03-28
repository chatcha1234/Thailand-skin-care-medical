import { LeadForm } from "@/components/site/lead-form";
import { Card } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-6">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Book Consultation</p>
          <h1 className="text-4xl font-semibold text-slate-950">Request your online consultation before traveling to Thailand</h1>
          <p className="text-base leading-8 text-slate-600">
            Share your skin concern, budget, and preferred travel month. Our team can follow up with preliminary guidance,
            consultation coordination, and treatment trip planning.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Card className="space-y-2 bg-[#fbfbfc] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Step 1</p>
            <p className="text-sm font-medium text-slate-950">Share your concern</p>
          </Card>
          <Card className="space-y-2 bg-[#fbfbfc] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Step 2</p>
            <p className="text-sm font-medium text-slate-950">Get preliminary guidance</p>
          </Card>
          <Card className="space-y-2 bg-[#fbfbfc] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Step 3</p>
            <p className="text-sm font-medium text-slate-950">Plan your treatment trip</p>
          </Card>
        </div>
        <Card className="space-y-4 bg-[#fbfbfc]">
          <h2 className="text-2xl font-semibold">What to prepare</h2>
          <ul className="space-y-3 text-sm leading-7 text-slate-600">
            <li>Your main skin concern and goals</li>
            <li>Preferred travel month and treatment city</li>
            <li>Approximate budget range</li>
            <li>WhatsApp or email for follow-up</li>
            <li>An optional skin photo for AI pre-screening and treatment direction matching</li>
          </ul>
        </Card>
      </div>
      <LeadForm />
    </section>
  );
}
