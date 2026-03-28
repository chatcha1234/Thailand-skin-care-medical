import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
};

const baseClassName =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variantClassNames = {
  primary: "bg-slate-950 text-white hover:bg-slate-800",
  secondary: "bg-white text-slate-900 ring-1 ring-inset ring-slate-200 hover:bg-slate-50",
  ghost: "bg-transparent text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-white"
};

export function Button({
  children,
  href,
  type = "button",
  className = "",
  disabled,
  variant = "primary",
  onClick
}: ButtonProps) {
  const resolvedClassName = `${baseClassName} ${variantClassNames[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={resolvedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={resolvedClassName} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
