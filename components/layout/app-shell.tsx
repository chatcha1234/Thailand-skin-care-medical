import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/site-content";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-white/70 bg-[#f7f8fa]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
              TH
            </span>
            <span className="max-w-[220px] text-sm font-semibold leading-5 text-slate-950">
              Thailand SkinCare Medical Tourism Platform
            </span>
          </Link>
          <nav className="flex max-w-full flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-slate-950">
                {link.label}
              </Link>
            ))}
          </nav>
          <Button href="/contact" className="px-4 py-2.5">
            Book Consultation
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-12">{children}</main>
      <footer className="border-t border-white/70 bg-[#f7f8fa]">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-950">International skincare support in Thailand</h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              This website provides educational information, care coordination, and preliminary treatment planning support
              for international patients. It does not replace consultation with a licensed medical professional.
            </p>
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <p>Email: care@thaiskincarehub.com</p>
            <p>WhatsApp: +66 80 000 0000</p>
            <p>Bangkok, Thailand</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
