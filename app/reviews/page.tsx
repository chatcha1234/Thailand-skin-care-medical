import { Card } from "@/components/ui/card";
import { reviews } from "@/lib/site-content";

export default function ReviewsPage() {
  return (
    <section className="space-y-8">
      <div className="max-w-4xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Reviews</p>
        <h1 className="text-4xl font-semibold text-slate-950">Patient stories focused on trust, support, and clarity</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <Card key={review.name} className="space-y-4">
            <p className="text-sm leading-7 text-slate-700">“{review.quote}”</p>
            <div className="space-y-1">
              <p className="font-semibold text-slate-950">{review.name}</p>
              <p className="text-sm text-slate-500">{review.outcome}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
