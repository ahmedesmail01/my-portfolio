"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/profile";
import { useGsap } from "@/components/anim/useGsap";
import MagneticButton from "@/components/ui/MagneticButton";
import me from "@/public/images/me.jpeg";

import BlurText from "@/components/ui/BlurText";
import DarkVeil from "@/components/ui/DarkVeil";
import LogoLoop from "@/components/ui/LogoLoop";
import { useRef } from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiAngular,
  SiVuedotjs,
  SiGithub,
  SiNestjs,
  SiPrisma,
  SiStripe,
  SiGreensock, // Using as GSAP placeholder since GSAP doesn't have a direct SI icon often used, or I can use an SVG
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const TECH_STACK = [
  { id: 1, label: "Next.js", icon: <SiNextdotjs /> },
  { id: 2, label: "React", icon: <SiReact /> },
  { id: 3, label: "TypeScript", icon: <SiTypescript /> },
  { id: 4, label: "GSAP", icon: <SiGreensock /> },
  { id: 5, label: "Tailwind CSS", icon: <SiTailwindcss /> },
  { id: 6, label: "Framer Motion", icon: <SiFramer /> },
  { id: 7, label: "Node.js", icon: <SiNodedotjs /> },
  { id: 8, label: "Angular", icon: <SiAngular /> },
  { id: 9, label: "Vue.js", icon: <SiVuedotjs /> },
  { id: 10, label: "Github", icon: <SiGithub /> },
  { id: 11, label: "Nestjs", icon: <SiNestjs /> },
  { id: 12, label: "Prisma", icon: <SiPrisma /> },
  { id: 13, label: "Stripe", icon: <SiStripe /> },
];

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

    // 1. Background elements fade in (DarkVeil handles its own generic vibe, but we can fade in overlay objects)
    tl.fromTo(
      ".hero-bg-el",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, stagger: 0.1, duration: 1.5 },
      0,
    );

    // Text reveals are handled by BlurText's internal Framer Motion,
    // but we can coordinate the button/image reveals with GSAP delay.

    // 2. Other masked elements reveal (buttons)
    tl.fromTo(
      ".hero-text-reveal",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        clearProps: "transform",
      },
      0.8, // Start a bit later to let text blur in
    );

    // 3. Main image specialized reveal
    tl.fromTo(
      ".hero-photo-container",
      { scale: 0.9, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 1.4, ease: "expo.out" },
      0.5,
    );

    // 4. Parallax Mouse Move - Keep this for the shapes
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
      className="relative min-h-[90vh] overflow-hidden px-6 py-28 md:py-32"
    >
      {/* Background Pattern & Floating Objects */}
      <div ref={parallaxRef} className="absolute inset-0 z-0 overflow-hidden">
        {/* Dark Veil Background */}
        <DarkVeil
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />

        {/* Floating Shapes */}
        <div className="hero-bg-el layer-bg absolute left-[10%] top-[20%] h-32 w-32 rounded-full bg-ember/10 blur-3xl pointer-events-none" />
        <div className="hero-bg-el layer-bg absolute right-[15%] top-[10%] h-64 w-64 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

        <div className="hero-bg-el layer-mid absolute left-[5%] bottom-[20%] h-4 w-4 rounded-full border border-white/10 pointer-events-none" />
        <div className="hero-bg-el layer-mid absolute right-[20%] top-[15%] h-8 w-8 rotate-45 border border-ember/20 pointer-events-none" />
        <div className="hero-bg-el layer-mid absolute left-[40%] top-[40%] h-2 w-2 rounded-full bg-white/20 pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            <div className="py-1">
              <BlurText
                text="Frontend"
                className="block text-white/95"
                delay={0.2}
              />
            </div>
            <div className="py-1">
              <span className="block bg-linear-to-r from-white to-white/50 bg-clip-text text-transparent">
                <BlurText
                  text="Engineer."
                  className="block text-white/95"
                  delay={0.4}
                />
              </span>
            </div>
          </h1>

          <div className="mt-6 max-w-lg text-lg text-white/60 leading-relaxed">
            <BlurText
              text={profile.summary}
              delay={0.6}
              wordClassName="inline-block mr-1.5"
            />
          </div>

          <div className="hero-text-reveal mt-8 flex flex-wrap gap-4">
            <MagneticButton href="#projects">View Latest Work</MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              Let&apos;s Talk
            </MagneticButton>
          </div>

          <div className="hero-text-reveal mt-12 flex items-center gap-6 text-sm text-white/40">
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-white/20" />
              <span className="shrink-0">Core Stack</span>
            </div>
            <div className="w-full max-w-[300px] overflow-hidden mask-[linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
              <LogoLoop logos={TECH_STACK} />
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
