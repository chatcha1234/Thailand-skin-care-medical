import Link from "next/link";
import { Card } from "@/components/ui/card";
import { treatments } from "@/lib/site-content";

export default function TreatmentsPage() {
  return (
    <section className="space-y-8">
      <div className="max-w-4xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Treatments</p>
        <h1 className="text-4xl font-semibold text-slate-950">Dermatology, aesthetic skin care, and medical wellness programs</h1>
        <p className="text-base leading-8 text-slate-600">
          Each treatment page is structured for international patient intent with practical information about timing,
          recovery, suitability, price range, and pre-travel planning.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {treatments.map((item) => (
          <Card key={item.slug} className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-brand-600">{item.category}</p>
              <h2 className="text-2xl font-semibold text-slate-950">{item.title}</h2>
            </div>
            <p className="text-sm leading-7 text-slate-600">{item.summary}</p>
            <p className="text-sm text-slate-500">{item.price}</p>
            <Link href={`/treatments/${item.slug}`} className="text-sm font-semibold text-brand-600 hover:text-brand-700">
              Open treatment page
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
