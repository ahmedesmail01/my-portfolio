"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import { useGsap } from "@/components/anim/useGsap";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    gsap.fromTo(
      ".proj-card",
      { y: 18, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      },
    );
  });

  return (
    <section id="projects" ref={ref} className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Selected Work
          </h2>
          <p className="mt-2 text-white/65">
            A few products I’ve built across LMS, streaming, payments, and
            ServiceNow automation.
          </p>
        </div>
        <span className="hidden rounded-full border border-stroke bg-glass px-3 py-1 text-xs text-white/70 md:inline-flex">
          Drop-in component • data-driven
        </span>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.title}
            className="proj-card group relative overflow-hidden rounded-2xl border border-stroke bg-glass p-6 shadow-glow"
          >
            <div
              className="pointer-events-none absolute -inset-16 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100
              bg-[radial-gradient(circle_at_30%_20%,rgba(177,15,46,0.35),transparent_60%)]"
            />

            <h3 className="relative z-10 text-xl font-semibold">{p.title}</h3>
            <p className="relative z-10 mt-2 text-white/70">{p.summary}</p>

            <div className="relative z-10 mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-stroke bg-black/25 px-3 py-1 text-xs text-white/75"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="relative z-10 mt-4 font-[family-name:var(--font-mono)] text-xs text-white/60">
              {p.stack.join(" • ")}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
