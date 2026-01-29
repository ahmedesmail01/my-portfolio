"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/profile";
import { useGsap } from "@/components/anim/useGsap";
import MagneticButton from "@/components/ui/MagneticButton";
import me from "@/public/images/me.jpeg";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    gsap.fromTo(
      ".hero-reveal",
      { y: 24, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
      },
    );

    gsap.to(".hero-orbit", {
      rotate: 360,
      transformOrigin: "50% 50%",
      duration: 14,
      repeat: -1,
      ease: "none",
    });

    gsap.to(".hero-photo", {
      y: -18,
      scrollTrigger: {
        trigger: ref.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  });

  return (
    <section ref={ref} className="relative overflow-hidden px-6 pt-24 md:pt-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="relative z-10">
          <div className="hero-reveal inline-flex items-center gap-2 rounded-full border border-stroke bg-glass px-3 py-1 text-xs text-white/80 shadow-glow">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" />
            {profile.location}
          </div>

          <h1 className="hero-reveal mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
            <span className="text-white/90">Frontend Engineer</span>
            <span className="block bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              with cinematic UI & performance mindset
            </span>
          </h1>

          <p className="hero-reveal mt-4 max-w-xl text-white/75">
            {profile.summary}
          </p>

          <div className="hero-reveal mt-6 flex flex-wrap gap-3">
            {profile.highlights.map((h) => (
              <span
                key={h}
                className="rounded-full border border-stroke bg-glass px-3 py-1 text-xs text-white/80"
              >
                {h}
              </span>
            ))}
          </div>

          <div className="hero-reveal mt-8 flex flex-wrap gap-3">
            <MagneticButton href="#projects">View Work</MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              Contact
            </MagneticButton>
          </div>
        </div>

        <div className="relative">
          {/* orbit rings */}
          <div className="hero-orbit pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-stroke opacity-60" />
          <div className="hero-orbit pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-stroke opacity-30" />

          {/* photo card */}
          <div className="hero-photo relative mx-auto w-full max-w-[440px] overflow-hidden rounded-2xl border border-stroke bg-glass shadow-glow">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(177,15,46,0.40),transparent_55%)]" />
            <Image
              src={me}
              alt="Portrait"
              width={900}
              height={900}
              priority
              className="relative z-10 h-[460px] w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
              <div className="rounded-xl border border-stroke bg-black/30 px-4 py-3 backdrop-blur">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/85">{profile.name}</span>
                  <span className="font-[family-name:var(--font-mono)] text-xs text-white/60">
                    Next.js • GSAP • TS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* edge glow */}
          <div className="pointer-events-none absolute -inset-6 rounded-[2.2rem] bg-[radial-gradient(circle_at_50%_50%,rgba(177,15,46,0.22),transparent_60%)] blur-2xl" />
        </div>
      </div>
    </section>
  );
}
