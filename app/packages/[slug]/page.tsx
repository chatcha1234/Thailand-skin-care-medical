import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { packages } from "@/lib/site-content";

export function generateStaticParams() {
  return packages.map((item) => ({ slug: item.slug }));
}

export default function PackageDetailPage({ params }: { params: { slug: string } }) {
  const pkg = packages.find((item) => item.slug === params.slug);

  if (!pkg) {
    notFound();
  }

  return (
    <section className="space-y-8">
      <div className="max-w-4xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Package</p>
        <h1 className="text-4xl font-semibold text-slate-950">{pkg.title}</h1>
        <p className="text-base leading-8 text-slate-600">{pkg.summary}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-950">What is included</h2>
          <ul className="space-y-3 text-sm leading-7 text-slate-600">
            {pkg.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
        <Card className="space-y-4 bg-slate-900 text-white">
          <h2 className="text-2xl font-semibold">Travel snapshot</h2>
          <p className="text-sm leading-7 text-slate-300">{pkg.duration}</p>
          <p className="text-sm font-semibold text-brand-100">{pkg.price}</p>
          <Button href="/contact" className="w-fit bg-white text-slate-950 hover:bg-slate-100">
            Request Consultation
          </Button>
        </Card>
      </div>
    </section>
  );
}
