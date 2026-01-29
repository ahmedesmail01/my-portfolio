"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/ui/Section";
import Chip from "@/components/ui/Chip";
import { profile } from "@/data/profile";
import { portfolioCounters } from "@/data/experience";
import { useGsap } from "@/components/anim/useGsap";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    // reveal
    gsap.fromTo(
      ".about-reveal",
      { y: 18, opacity: 0, filter: "blur(10px)" },
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

    // glitch headline micro loop
    gsap.to(".glitch", {
      textShadow: "0 0 22px rgba(177,15,46,.65)",
      duration: 0.12,
      repeat: -1,
      yoyo: true,
      ease: "none",
      repeatDelay: 2.4,
    });

    // animated counters
    const nums = gsap.utils.toArray<HTMLElement>(".counter-num");
    nums.forEach((el) => {
      const to = Number(el.dataset.to ?? "0");
      const obj = { v: 0 };
      gsap.to(obj, {
        v: to,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
        onUpdate: () => (el.textContent = Math.round(obj.v).toString()),
      });
    });
  });

  return (
    <section ref={ref as any}>
      <Section
        id="about"
        title="About"
        subtitle="Tech-first UI engineer — I build fast, cinematic interfaces with real-world constraints (performance, SEO, scalability)."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="about-reveal rounded-2xl border border-stroke bg-glass p-6 shadow-glow">
            <h3 className="glitch text-xl font-semibold tracking-tight">
              A modern frontend engineer with a product mindset.
            </h3>
            <p className="mt-3 text-white/70">
              I focus on building clean architecture, smooth motion, and
              responsive systems. Strong in{" "}
              <span className="text-white/90">Next.js + TypeScript</span>, and I
              also have solid experience with{" "}
              <span className="text-white/90">Angular</span>,{" "}
              <span className="text-white/90">Vue</span>, and{" "}
              <span className="text-white/90">ServiceNow</span>.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Next.js App Router",
                "GSAP / ScrollTrigger",
                "SEO & performance",
                "Design systems",
                "Localization-ready UI",
                "ServiceNow automation",
              ].map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-stroke bg-black/25 p-4">
              <div className="text-sm text-white/80">Now</div>
              <div className="mt-1 font-[family-name:var(--font-mono)] text-xs text-white/60">
                {profile.title}
              </div>
            </div>
          </div>

          <div className="about-reveal rounded-2xl border border-stroke bg-glass p-6 shadow-glow">
            <div className="grid grid-cols-2 gap-3">
              {portfolioCounters.map((c) => (
                <div
                  key={c.label}
                  className="rounded-2xl border border-stroke bg-black/25 p-4"
                >
                  <div
                    className="counter-num text-3xl font-semibold"
                    data-to={c.value}
                  >
                    0
                  </div>
                  <div className="mt-1 text-xs text-white/60">{c.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold">Tool belt</div>
              <p className="mt-2 text-white/65">
                React / Next.js / TypeScript • Tailwind • State management • UI
                libraries • ServiceNow ITSM workflows.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Tailwind",
                  "Redux Toolkit",
                  "React Query",
                  "Angular",
                  "Vue",
                  "ServiceNow ITSM",
                ].map((t) => (
                  <Chip key={t} className="hover:border-white/20">
                    {t}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}
