"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/ui/Section";
import Chip from "@/components/ui/Chip";
import { profile } from "@/data/profile";
import { useGsap } from "@/components/anim/useGsap";

gsap.registerPlugin(ScrollTrigger);

function SkillCard({
  title,
  items,
  hint,
}: {
  title: string;
  items: string[];
  hint: string;
}) {
  return (
    <div className="skill-card group relative overflow-hidden rounded-2xl border border-stroke bg-glass p-6 shadow-glow">
      {/* sheen */}
      <div
        className="pointer-events-none absolute -left-32 top-0 h-full w-56 -skew-x-12 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100
        bg-[radial-gradient(circle_at_30%_20%,rgba(177,15,46,0.30),transparent_60%)]"
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-semibold">{title}</div>
          <div className="mt-1 text-xs text-white/60">{hint}</div>
        </div>
        <div className="h-10 w-10 rounded-2xl border border-stroke bg-black/25" />
      </div>

      <div className="relative z-10 mt-5 flex flex-wrap gap-2">
        {items.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref as any, () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    gsap.fromTo(
      ".skill-card",
      {
        y: 18,
        opacity: 0,
        rotateX: 8,
        transformPerspective: 800,
        filter: "blur(10px)",
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      },
    );
  });

  return (
    <section ref={ref as any}>
      <Section
        id="skills"
        title="Skills"
        subtitle="A compact stack that ships fast: modern frontend + motion + clean systems. Also comfortable with Angular, Vue, and ServiceNow."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <SkillCard
            title="Frontend Core"
            hint="Modern React + Next.js delivery"
            items={profile.skills.frontend}
          />
          <SkillCard
            title="ServiceNow"
            hint="ITSM workflows & automation"
            items={profile.skills.servicenow}
          />
          <SkillCard
            title="Tools & Delivery"
            hint="Product-focused engineering"
            items={profile.skills.tools}
          />
          <div className="skill-card relative overflow-hidden rounded-2xl border border-stroke bg-glass p-6 shadow-glow">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(177,15,46,0.30),transparent_65%)]" />
            <div className="relative z-10">
              <div className="text-lg font-semibold">Also experienced with</div>
              <p className="mt-2 text-white/70">
                Angular & Vue for component-driven UIs — and ServiceNow for
                enterprise workflow systems.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Angular",
                  "Vue",
                  "ServiceNow",
                  "ITSM",
                  "Workflow Design",
                  "RBAC",
                ].map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-stroke bg-black/25 p-4">
                <div className="text-xs text-white/60">
                  Engineering philosophy
                </div>
                <div className="mt-1 text-sm text-white/80">
                  “Ship fast — keep it clean — animate with purpose.”
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}
