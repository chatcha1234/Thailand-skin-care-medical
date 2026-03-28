import { Card } from "@/components/ui/card";
import { faqItems } from "@/lib/site-content";

export default function FaqPage() {
  return (
    <section className="space-y-8">
      <div className="max-w-4xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">FAQ</p>
        <h1 className="text-4xl font-semibold text-slate-950">Answers that help patients feel ready before they travel</h1>
      </div>
      <div className="space-y-4">
        {faqItems.map((item) => (
          <Card key={item.question} className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-950">{item.question}</h2>
            <p className="text-sm leading-7 text-slate-600">{item.answer}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
