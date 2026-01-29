"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/ui/Section";
import Chip from "@/components/ui/Chip";
import { experience } from "@/data/experience";
import { useGsap } from "@/components/anim/useGsap";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const items = useMemo(() => experience, []);

  useGsap(ref, () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    gsap.fromTo(
      ".xp-item",
      { y: 16, opacity: 0, filter: "blur(10px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      },
    );

    gsap.to(".xp-line", {
      scaleY: 1,
      transformOrigin: "top",
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1,
      },
    });
  });

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const cards = gsap.utils.toArray<HTMLElement>(".xp-item");
    const triggers: ScrollTrigger[] = [];

    cards.forEach((el, idx) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 45%",
          end: "bottom 45%",
          onEnter: () => setActiveIdx(idx),
          onEnterBack: () => setActiveIdx(idx),
        }),
      );
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  const active = items[activeIdx];

  return (
    <section ref={ref as any}>
      <Section
        id="experience"
        title="Experience"
        subtitle="Timeline view on the left — sticky role HUD on the right. Built for quick scanning."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_420px]">
          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-4 top-2 h-full w-px bg-white/10" />
            <div className="xp-line absolute left-4 top-2 h-full w-px scale-y-0 bg-ember/60" />

            <div className="space-y-5">
              {items.map((x, idx) => (
                <article
                  key={x.company + x.period}
                  className="xp-item relative rounded-2xl border border-stroke bg-glass p-6 shadow-glow"
                >
                  <div className="absolute left-[10px] top-7 h-3 w-3 rounded-full bg-ember shadow-glow" />
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-semibold">{x.role}</div>
                      <div className="mt-1 text-sm text-white/70">
                        {x.company} •{" "}
                        <span className="text-white/60">{x.period}</span>
                        {x.location ? (
                          <span className="text-white/50"> • {x.location}</span>
                        ) : null}
                      </div>
                    </div>

                    <div className="rounded-full border border-stroke bg-black/25 px-3 py-1 text-xs text-white/70">
                      {idx === activeIdx ? "Active" : "View"}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {x.stack.slice(0, 6).map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>

                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/70">
                    {x.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          {/* Sticky HUD */}
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-2xl border border-stroke bg-glass p-6 shadow-glow">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Role HUD</div>
                <div className="font-[family-name:var(--font-mono)] text-xs text-white/55">
                  {activeIdx + 1}/{items.length}
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-stroke bg-black/25 p-4">
                <div className="text-lg font-semibold">{active.role}</div>
                <div className="mt-1 text-sm text-white/70">
                  {active.company} • {active.period}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs text-white/55">Primary stack</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {active.stack.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-stroke bg-black/25 p-4">
                <div className="text-xs text-white/55">What I delivered</div>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-white/70">
                  {active.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <div className="text-xs text-white/55">Signal</div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-ember"
                    style={{ width: `${Math.min(100, 35 + activeIdx * 22)}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-white/55">
                  Scroll the timeline — HUD updates automatically.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </section>
  );
}
