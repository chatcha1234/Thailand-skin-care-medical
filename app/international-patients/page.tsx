import { Card } from "@/components/ui/card";
import { internationalSupport } from "@/lib/site-content";

export default function InternationalPatientsPage() {
  return (
    <section className="space-y-8">
      <div className="max-w-4xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">International Patients</p>
        <h1 className="text-4xl font-semibold text-slate-950">Travel support that makes treatment planning easier</h1>
        <p className="text-base leading-8 text-slate-600">
          This website is positioned as more than a clinic brochure. It is designed to support consultation, travel timing,
          local logistics, and aftercare communication for international patients.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {internationalSupport.map((item) => (
          <Card key={item} className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-950">{item}</h2>
            <p className="text-sm leading-7 text-slate-600">
              Structured around convenience, transparency, and lower friction for international patient travel decisions.
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
