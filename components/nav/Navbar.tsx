"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { profile } from "@/data/profile";
import Image from "next/image";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");
  const barRef = useRef<HTMLDivElement>(null);

  const links = useMemo(() => SECTIONS, []);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // active section via IntersectionObserver
    const els = links
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0.12, 0.2, 0.35] },
    );

    els.forEach((el) => io.observe(el));

    if (!reduce) {
      gsap.fromTo(
        barRef.current,
        { y: -18, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
        },
      );
    }

    return () => io.disconnect();
  }, [links]);

  function go(id: string) {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div ref={barRef} className="fixed left-0 right-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border border-stroke bg-black/90 px-4 py-3 backdrop-blur shadow-glow">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative h-9 w-9 overflow-hidden rounded-full border border-stroke bg-black/25 shadow-glow">
            <Image
              src="/images/me.jpeg"
              alt={`${profile.name} avatar`}
              fill
              sizes="36px"
              className="object-cover"
              priority
            />
            {/* subtle highlight */}
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(177,15,46,0.25),transparent_55%)]" />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold">{profile.name}</div>
            <div className="font-[family-name:var(--font-mono)] text-[11px] text-white/55">
              Frontend • Angular • Vue • ServiceNow
            </div>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="relative rounded-full px-3 py-2 text-sm text-white/70 transition hover:text-white"
            >
              {l.label}
              {active === l.id ? (
                <span className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full bg-ember" />
              ) : null}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            className="hidden rounded-full border border-stroke bg-glass px-4 py-2 text-sm text-white/85 hover:bg-white/10 md:inline-flex"
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <button
            onClick={() => setOpen((s) => !s)}
            className="inline-flex items-center justify-center rounded-full border border-stroke bg-glass px-4 py-2 text-sm text-white/85 hover:bg-white/10 md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {/* Mobile */}
      {open ? (
        <div className="mx-auto mt-3 max-w-6xl overflow-hidden rounded-2xl border border-stroke bg-black/90 p-3 backdrop-blur shadow-glow md:hidden">
          <div className="grid grid-cols-2 gap-2">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="rounded-xl border border-stroke bg-glass px-3 py-3 text-left text-sm text-white/80 hover:bg-white/10"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
