import { Card } from "@/components/ui/card";
import { blogPosts } from "@/lib/site-content";

export default function BlogPage() {
  return (
    <section className="space-y-8">
      <div className="max-w-4xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Blog</p>
        <h1 className="text-4xl font-semibold text-slate-950">SEO content that captures international treatment intent</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {blogPosts.map((post) => (
          <Card key={post} className="space-y-3">
            <h2 className="text-2xl font-semibold text-slate-950">{post}</h2>
            <p className="text-sm leading-7 text-slate-600">
              Long-form educational content to attract search demand, build trust, and support consultation conversion.
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
