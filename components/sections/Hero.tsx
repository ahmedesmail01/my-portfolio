"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/profile";
import { useGsap } from "@/components/anim/useGsap";
import MagneticButton from "@/components/ui/MagneticButton";
import me from "@/public/images/me.jpeg";

import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useGsap(ref as any, () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    // Intro Reveal Sequence
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1.2 },
    });

    // 1. Background elements fade in
    tl.fromTo(
      ".hero-bg-el",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, stagger: 0.1, duration: 1.5 },
      0,
    );

    // 2. Typing effect for Headings
    tl.fromTo(
      ".type-frontend",
      { text: "" },
      {
        text: "Frontend",
        duration: 0.8,
        ease: "none",
      },
      0.5,
    );

    tl.fromTo(
      ".type-engineer",
      { text: "" },
      {
        text: "Engineer.",
        duration: 0.8,
        ease: "none",
      },
      1.3,
    );

    // 3. Typing effect for Summary (faster)
    tl.fromTo(
      ".type-summary",
      { text: "" },
      {
        text: profile.summary,
        duration: 1.2,
        ease: "none",
      },
      2.1,
    );

    // 4. Other masked elements reveal (buttons, stack)
    tl.fromTo(
      ".hero-text-reveal",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        clearProps: "transform",
      },
      3.0, // Start after summary
    );

    // 5. Main image specialized reveal
    tl.fromTo(
      ".hero-photo-container",
      { scale: 0.9, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 1.4, ease: "expo.out" },
      0.5, // Start early with text
    );

    // 6. Parallax Mouse Move
    if (parallaxRef.current) {
      const q = gsap.utils.selector(parallaxRef.current);

      const onMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = clientX / window.innerWidth - 0.5;
        const yPos = clientY / window.innerHeight - 0.5;

        // Move background shapes slower
        gsap.to(q(".layer-bg"), {
          x: xPos * -30,
          y: yPos * -30,
          duration: 1,
          ease: "power2.out",
        });

        // Move shapes faster (closer)
        gsap.to(q(".layer-mid"), {
          x: xPos * -60,
          y: yPos * -60,
          duration: 1,
          ease: "power2.out",
        });

        // Move main photo slightly for depth
        gsap.to(".hero-photo-container", {
          rotationY: xPos * 8,
          rotationX: yPos * -8,
          duration: 1.5,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }
  });

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] overflow-hidden px-6 pt-28 md:pt-32"
    >
      {/* Background Pattern & Floating Objects */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />

        {/* Floating Shapes */}
        <div className="hero-bg-el layer-bg absolute left-[10%] top-[20%] h-32 w-32 rounded-full bg-ember/10 blur-3xl" />
        <div className="hero-bg-el layer-bg absolute right-[15%] top-[10%] h-64 w-64 rounded-full bg-blue-500/5 blur-[100px]" />

        <div className="hero-bg-el layer-mid absolute left-[5%] bottom-[20%] h-4 w-4 rounded-full border border-white/10" />
        <div className="hero-bg-el layer-mid absolute right-[20%] top-[15%] h-8 w-8 rotate-45 border border-ember/20" />
        <div className="hero-bg-el layer-mid absolute left-[40%] top-[40%] h-2 w-2 rounded-full bg-white/20" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="order-2 md:order-1">
          {/* Status Badge */}
          {/* <div className="hero-text-reveal mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Available for new projects
          </div> */}

          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            <div className="overflow-hidden py-1">
              <span className="type-frontend block text-white/95">
                Frontend
              </span>
            </div>
            <div className="overflow-hidden py-1">
              <span className="type-engineer block bg-linear-to-r from-white to-white/50 bg-clip-text text-transparent">
                Engineer.
              </span>
            </div>
          </h1>

          <p className="type-summary mt-6 max-w-lg text-lg text-white/60 leading-relaxed">
            {profile.summary}
          </p>

          <div className="hero-text-reveal mt-8 flex flex-wrap gap-4">
            <MagneticButton href="#projects">View Latest Work</MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              Let&apos;s Talk
            </MagneticButton>
          </div>

          <div className="hero-text-reveal mt-12 flex items-center gap-6 text-sm text-white/40">
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-white/20" />
              <span>Core Stack</span>
            </div>
            <div className="flex gap-4">
              {["Next.js", "React", "Typescript", "GSAP", "Tailwind"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="hover:text-white/80 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="order-1 flex justify-center md:order-2 md:justify-end perspective-[1000px]">
          <div className="hero-photo-container relative w-full max-w-[460px] transform-3d">
            {/* Decorative back layers */}
            <div className="absolute -inset-4 rounded-3xl border border-white/5 bg-white/2 backdrop-blur-sm -z-10 transform translate-z-[-20px]" />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-glass shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)] z-20 pointer-events-none" />

              <Image
                src={me}
                alt="Portrait"
                width={900}
                height={900}
                priority
                className="relative z-10 h-[500px] w-full object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Overlay content on image */}
              <div className="absolute bottom-4 left-4 right-4 z-30">
                <div className="overflow-hidden rounded-xl bg-black/40 p-4 backdrop-blur-md border border-white/10">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white font-medium text-sm">
                        {profile.name}
                      </div>
                      <div className="text-white/50 text-xs">
                        Senior Frontend Engineer
                      </div>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-xs">👋</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
