"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
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
  const ref = useRef<HTMLAnchorElement>(null);

  function onMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(ref.current, {
      x: x * 0.18,
      y: y * 0.18,
      duration: 0.25,
      ease: "power2.out",
    });
  }

  function onLeave() {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.35, ease: "power3.out" });
  }

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition",
        "border border-stroke backdrop-blur shadow-glow",
        variant === "primary"
          ? "bg-ember text-white hover:brightness-110"
          : "bg-glass text-white/90 hover:bg-white/10",
      )}
    >
      {children}
    </Link>
  );
}
