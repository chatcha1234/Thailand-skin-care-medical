import { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[28px] border border-white/70 bg-white/88 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)] backdrop-blur ${className}`.trim()}
    >
      {children}
    </div>
  );
}
