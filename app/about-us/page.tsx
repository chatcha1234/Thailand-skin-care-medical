import { Card } from "@/components/ui/card";

export default function AboutUsPage() {
  return (
    <section className="space-y-8">
      <div className="max-w-4xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">About Us</p>
        <h1 className="text-4xl font-semibold text-slate-950">A medical tourism website designed to turn interest into patient journeys</h1>
        <p className="text-base leading-8 text-slate-600">
          Thailand SkinCare Medical Tourism Platform is positioned as a one-stop experience for international patients
          seeking skin analysis, dermatology care, aesthetic treatments, and post-treatment support in Thailand.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">Personalized</h2>
          <p className="text-sm leading-7 text-slate-600">We match concerns, timeline, and travel goals instead of pushing the same package to everyone.</p>
        </Card>
        <Card className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">Trusted</h2>
          <p className="text-sm leading-7 text-slate-600">Doctor and clinic trust signals are presented clearly for international patient decision making.</p>
        </Card>
        <Card className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">Convenient</h2>
          <p className="text-sm leading-7 text-slate-600">Consultation, travel support, treatment, and follow-up live in one conversion flow.</p>
        </Card>
      </div>
    </section>
  );
}
