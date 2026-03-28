import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
};

const baseClassName =
  "inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60";

export function Button({ children, href, type = "button", className = "", disabled }: ButtonProps) {
  if (href) {
    return (
      <Link href={href} className={`${baseClassName} ${className}`.trim()}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={`${baseClassName} ${className}`.trim()} disabled={disabled}>
      {children}
    </button>
  );
}
