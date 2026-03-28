import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  blogPosts,
  doctors,
  faqItems,
  featuredConcerns,
  internationalSupport,
  packages,
  patientJourney,
  reviews,
  treatments
} from "@/lib/site-content";

export default function HomePage() {
  return (
    <div className="space-y-24 pb-10">
      <section className="grid gap-10 rounded-[36px] border border-white/70 bg-white/88 px-8 py-12 shadow-[0_18px_60px_rgba(15,23,42,0.06)] lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
            AI-Powered International SkinCare Concierge Platform
          </span>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-slate-950">
              Get Professional Skin Treatment in Thailand, Safely, Smoothly, and with Full Support
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              From online skin assessment to clinic booking, travel planning, and aftercare, we help international
              patients access trusted skincare and dermatology services in Thailand.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact">Book Online Consultation</Button>
            <Button href="/how-it-works" variant="secondary">
              Get Treatment Plan
            </Button>
            <Button href="/contact" variant="ghost">
              Chat on WhatsApp / LINE
            </Button>
          </div>
          <div className="grid gap-4 pt-4 md:grid-cols-3">
            <Card className="space-y-2 bg-[#fbfbfc]">
              <p className="text-3xl font-semibold text-slate-950">1-2</p>
              <p className="text-sm text-slate-600">Priority launch markets: English-first with Arabic or Chinese expansion</p>
            </Card>
            <Card className="space-y-2 bg-[#fbfbfc]">
              <p className="text-3xl font-semibold text-slate-950">24h</p>
              <p className="text-sm text-slate-600">Target response time for consultation requests and pre-travel triage</p>
            </Card>
            <Card className="space-y-2 bg-[#fbfbfc]">
              <p className="text-3xl font-semibold text-slate-950">One-stop</p>
              <p className="text-sm text-slate-600">Treatment matching, travel support, and post-treatment follow-up in one flow</p>
            </Card>
          </div>
        </div>

        <Card className="space-y-8 bg-[#fbfbfc]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Why patients choose Thailand</p>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-950">Trusted care with a medical tourism advantage</h2>
            <div className="space-y-4 text-sm leading-7 text-slate-600">
              <p>Dermatology and aesthetic treatment options curated for international patients.</p>
              <p>Transparent package ranges before travel.</p>
              <p>English-first patient coordination with concierge-style support.</p>
              <p>Travel planning around downtime, recovery, and follow-up.</p>
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Skin Concerns</p>
            <h2 className="text-3xl font-semibold text-slate-950">Common concerns we help international patients navigate</h2>
          </div>
          <Link href="/treatments" className="text-sm font-semibold text-slate-900 hover:text-slate-700">
            Explore all treatments
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredConcerns.map((item) => (
            <Card key={item.title} className="space-y-3">
              <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
              <p className="text-sm leading-7 text-slate-600">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="space-y-4 bg-slate-950 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">How It Works</p>
          <h2 className="text-3xl font-semibold">From interest to treatment in Thailand</h2>
          <p className="text-sm leading-7 text-slate-300">
            The platform is built to move patients from first inquiry to consultation, travel planning, treatment, and aftercare
            without making them guess the next step.
          </p>
          <Button href="/how-it-works" className="w-fit" variant="secondary">
            View the full journey
          </Button>
        </Card>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {patientJourney.map((step, index) => (
            <Card key={step} className="space-y-3 bg-white">
              <p className="text-sm font-semibold text-brand-600">Step {index + 1}</p>
              <p className="text-sm leading-7 text-slate-700">{step}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Featured Treatments</p>
          <h2 className="text-3xl font-semibold text-slate-950">Medical dermatology and aesthetic care, matched to travel goals</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {treatments.slice(0, 4).map((treatment) => (
            <Card key={treatment.slug} className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-brand-600">{treatment.category}</p>
                <h3 className="text-2xl font-semibold text-slate-950">{treatment.title}</h3>
              </div>
              <p className="text-sm leading-7 text-slate-600">{treatment.summary}</p>
              <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                <span>{treatment.duration}</span>
                <span>{treatment.price}</span>
              </div>
              <Link href={`/treatments/${treatment.slug}`} className="text-sm font-semibold text-slate-900 hover:text-slate-700">
                Learn more
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Packages</p>
            <h2 className="text-3xl font-semibold text-slate-950">Travel-friendly treatment programs with transparent ranges</h2>
          </div>
          <div className="space-y-4">
            {packages.map((item) => (
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

        <Card className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">International Support</p>
            <h2 className="text-3xl font-semibold text-slate-950">Built around medical tourism, not just clinic browsing</h2>
          </div>
          <ul className="space-y-3 text-sm leading-7 text-slate-600">
            {internationalSupport.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Doctors & Trust</p>
          <h2 className="text-3xl font-semibold text-slate-950">Credibility-first profiles for international decision making</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {doctors.map((doctor) => (
            <Card key={doctor.name} className="space-y-3">
              <h3 className="text-xl font-semibold text-slate-950">{doctor.name}</h3>
              <p className="text-sm font-medium text-brand-600">{doctor.specialty}</p>
              <p className="text-sm leading-7 text-slate-600">{doctor.trust}</p>
              <p className="text-sm text-slate-500">{doctor.languages}</p>
              <p className="text-sm text-slate-500">{doctor.clinic}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card className="space-y-5 bg-[#fbfbfc]">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Patient Stories</p>
            <h2 className="text-3xl font-semibold text-slate-950">Reviews that focus on trust, planning, and recovery clarity</h2>
          </div>
          <div className="space-y-4">
            {reviews.map((review) => (
              <blockquote key={review.name} className="rounded-[24px] border border-slate-200 bg-white p-5">
                <p className="text-sm leading-7 text-slate-700">&ldquo;{review.quote}&rdquo;</p>
                <footer className="mt-3 text-sm font-semibold text-slate-950">{review.name}</footer>
                <p className="text-sm text-slate-500">{review.outcome}</p>
              </blockquote>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">SEO Content</p>
              <h2 className="text-3xl font-semibold text-slate-950">Blog topics that attract international demand</h2>
            </div>
            <ul className="space-y-3 text-sm leading-7 text-slate-600">
              {blogPosts.map((post) => (
                <li key={post}>{post}</li>
              ))}
            </ul>
          </Card>
          <Card className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">FAQ Snapshot</p>
              <h2 className="text-2xl font-semibold text-slate-950">Clear answers reduce hesitation before travel</h2>
            </div>
            <div className="space-y-4">
              {faqItems.slice(0, 3).map((item) => (
                <div key={item.question} className="rounded-2xl border border-slate-200 p-4">
                  <h3 className="text-base font-semibold text-slate-950">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="rounded-[36px] border border-slate-200 bg-white px-8 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Ready to launch</p>
            <h2 className="text-4xl font-semibold text-slate-950">Start with consultation, then build the right treatment trip</h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              This platform is designed to generate qualified international leads, build trust quickly, and move patients
              into a high-intent consultation flow before they commit to travel.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact">Book Your Online Consultation</Button>
            <Button href="/packages" variant="secondary">
              View Packages
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
