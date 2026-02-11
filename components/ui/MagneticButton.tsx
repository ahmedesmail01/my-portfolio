"use client";

import Link from "next/link";
import clsx from "clsx";

export default function MagneticButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-transform duration-200",
        "border border-stroke backdrop-blur shadow-glow",
        variant === "primary"
          ? "bg-ember text-white hover:brightness-110 hover:-translate-y-0.5"
          : "bg-glass text-white/90 hover:bg-white/10 hover:-translate-y-0.5",
      )}
    >
      {children}
    </Link>
  );
}
