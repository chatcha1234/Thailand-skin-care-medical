import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { treatments } from "@/lib/site-content";

export function generateStaticParams() {
  return treatments.map((item) => ({ slug: item.slug }));
}

export default function TreatmentDetailPage({ params }: { params: { slug: string } }) {
  const treatment = treatments.find((item) => item.slug === params.slug);

  if (!treatment) {
    notFound();
  }

  return (
    <section className="space-y-8">
      <div className="max-w-4xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">{treatment.category}</p>
        <h1 className="text-4xl font-semibold text-slate-950">{treatment.title}</h1>
        <p className="text-base leading-8 text-slate-600">{treatment.summary}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-950">Treatment overview</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-slate-950">Suitable for</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">{treatment.audience}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950">Duration</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">{treatment.duration}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950">Recommended sessions</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">{treatment.sessions}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950">Recovery time</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">{treatment.recovery}</p>
            </div>
          </div>
        </Card>
        <Card className="space-y-4 bg-brand-50">
          <h2 className="text-2xl font-semibold text-slate-950">Price & care</h2>
          <p className="text-sm font-semibold text-brand-700">{treatment.price}</p>
          <p className="text-sm leading-7 text-slate-600">{treatment.care}</p>
          <Button href="/contact" className="w-fit">
            Book Consultation
          </Button>
        </Card>
      </div>
      <Card className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-950">FAQ</h2>
        <div className="space-y-3">
          {treatment.faq.map((question) => (
            <div key={question} className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-medium text-slate-900">{question}</p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
