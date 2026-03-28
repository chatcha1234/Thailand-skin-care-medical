import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { packages, treatments } from "@/lib/site-content";

const quickLinks = [
  {
    title: "Treatments",
    description: "Explore dermatology, laser, pigmentation, anti-aging, and skin wellness options.",
    href: "/treatments"
  },
  {
    title: "Packages",
    description: "Compare short-stay and travel-friendly treatment programs with estimated pricing.",
    href: "/packages"
  },
  {
    title: "Doctors & Clinics",
    description: "Review trust signals, language support, and partner clinic positioning.",
    href: "/doctors-clinics"
  },
  {
    title: "How It Works",
    description: "Understand the full journey from online consultation to treatment in Thailand.",
    href: "/how-it-works"
  }
];

export default function HomePage() {
  return (
    <div className="space-y-16 pb-10">
      <section className="grid gap-8 rounded-[36px] border border-white/70 bg-white/88 px-8 py-12 shadow-[0_18px_60px_rgba(15,23,42,0.06)] lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
            AI-Powered International SkinCare Concierge Platform
          </span>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-slate-950">
              Professional skin treatment planning in Thailand for international patients
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Start with consultation, receive preliminary guidance, and move into a clear treatment and travel plan
              built around your goals, budget, and timeline.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/contact">Book Consultation</Button>
            <Button href="/how-it-works" variant="secondary">
              How It Works
            </Button>
            <Link href="/faq" className="inline-flex items-center text-sm font-semibold text-slate-700 underline-offset-4 hover:text-slate-950 hover:underline">
              Read FAQ
            </Link>
          </div>
        </div>

        <Card className="space-y-5 bg-[#fbfbfc]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Why this platform</p>
          <div className="space-y-4 text-sm leading-7 text-slate-600">
            <p>Consult before travel and understand likely options first.</p>
            <p>Compare treatment directions and package ranges more clearly.</p>
            <p>Use AI pre-screening as a support tool, not as a diagnosis system.</p>
            <p>Move from inquiry to consultation with less friction.</p>
          </div>
        </Card>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Browse the site</p>
          <h2 className="text-3xl font-semibold text-slate-950">Use dedicated pages instead of one long scroll</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {quickLinks.map((item) => (
            <Card key={item.title} className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
              <p className="text-sm leading-7 text-slate-600">{item.description}</p>
              <Link href={item.href} className="text-sm font-semibold text-slate-900 hover:text-slate-700">
                Open page
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Featured Treatments</p>
              <h2 className="text-2xl font-semibold text-slate-950">Start with the treatment area you care about</h2>
            </div>
            <Link href="/treatments" className="text-sm font-semibold text-slate-900 hover:text-slate-700">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {treatments.slice(0, 3).map((treatment) => (
              <div key={treatment.slug} className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-medium text-brand-600">{treatment.category}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-950">{treatment.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{treatment.summary}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Packages</p>
              <h2 className="text-2xl font-semibold text-slate-950">Compare travel-friendly programs quickly</h2>
            </div>
            <Link href="/packages" className="text-sm font-semibold text-slate-900 hover:text-slate-700">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {packages.slice(0, 3).map((item) => (
              <div key={item.slug} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                  <span className="text-sm font-medium text-slate-900">{item.price}</span>
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.summary}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="rounded-[36px] border border-slate-200 bg-white px-8 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Next step</p>
            <h2 className="text-4xl font-semibold text-slate-950">Request consultation and receive the right next step before traveling</h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Use the consultation form to share your concern, travel month, and budget. You can also upload a photo for AI-assisted
              preliminary screening and treatment direction matching.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact">Go to Consultation Form</Button>
            <Button href="/doctors-clinics" variant="secondary">
              View Doctors & Clinics
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
