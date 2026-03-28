import { Card } from "@/components/ui/card";
import { patientJourney } from "@/lib/site-content";

export default function HowItWorksPage() {
  return (
    <section className="space-y-8">
      <div className="max-w-4xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">How It Works</p>
        <h1 className="text-4xl font-semibold text-slate-950">A simple path from first inquiry to treatment in Thailand</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {patientJourney.map((step, index) => (
          <Card key={step} className="space-y-3">
            <p className="text-sm font-semibold text-brand-600">Step {index + 1}</p>
            <p className="text-sm leading-7 text-slate-700">{step}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
