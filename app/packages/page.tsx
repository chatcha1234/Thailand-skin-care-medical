import Link from "next/link";
import { Card } from "@/components/ui/card";
import { packages } from "@/lib/site-content";

export default function PackagesPage() {
  return (
    <section className="space-y-8">
      <div className="max-w-4xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Packages</p>
        <h1 className="text-4xl font-semibold text-slate-950">Pre-structured programs for short trips and treatment planning</h1>
        <p className="text-base leading-8 text-slate-600">
          Package pages reduce friction by pairing treatment logic with timing, transparent estimates, and patient support.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {packages.map((item) => (
          <Card key={item.slug} className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-950">{item.title}</h2>
            <p className="text-sm leading-7 text-slate-600">{item.summary}</p>
            <p className="text-sm text-slate-500">{item.duration}</p>
            <p className="text-sm font-semibold text-brand-600">{item.price}</p>
            <Link href={`/packages/${item.slug}`} className="text-sm font-semibold text-brand-600 hover:text-brand-700">
              View package
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
