"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/ui/Section";
import Chip from "@/components/ui/Chip";
import { profile } from "@/data/profile";
import { useGsap } from "@/components/anim/useGsap";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [toast, setToast] = useState("");

  useGsap(ref, () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    gsap.fromTo(
      ".ct-reveal",
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
  });

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setToast("Copied ✓");
      setTimeout(() => setToast(""), 1400);
    } catch {
      setToast("Copy failed");
      setTimeout(() => setToast(""), 1400);
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio Inquiry — ${name || "Hello"}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}\n`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section ref={ref as any}>
      <Section
        id="contact"
        title="Contact"
        subtitle="Let’s build something sharp. Send a message or reach me via quick links."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="ct-reveal rounded-2xl border border-stroke bg-glass p-6 shadow-glow">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">Quick Links</div>
                <p className="mt-1 text-white/65 text-sm">
                  Fastest way: copy email/phone — or open LinkedIn.
                </p>
              </div>

              {toast ? (
                <span className="rounded-full border border-stroke bg-black/25 px-3 py-1 text-xs text-white/80">
                  {toast}
                </span>
              ) : null}
            </div>

            <div className="mt-5 space-y-3">
              <button
                onClick={() => copy(profile.email)}
                className="w-full rounded-2xl border border-stroke bg-black/25 p-4 text-left hover:bg-white/5"
              >
                <div className="text-xs text-white/55">Email</div>
                <div className="mt-1 font-[family-name:var(--font-mono)] text-sm text-white/85">
                  {profile.email}
                </div>
              </button>

              <button
                onClick={() => copy(profile.phone)}
                className="w-full rounded-2xl border border-stroke bg-black/25 p-4 text-left hover:bg-white/5"
              >
                <div className="text-xs text-white/55">Phone</div>
                <div className="mt-1 font-[family-name:var(--font-mono)] text-sm text-white/85">
                  {profile.phone}
                </div>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-stroke bg-black/25 p-4 hover:bg-white/5"
                >
                  <div className="text-xs text-white/55">LinkedIn</div>
                  <div className="mt-1 text-sm text-white/85">Open</div>
                </a>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-stroke bg-black/25 p-4 hover:bg-white/5"
                >
                  <div className="text-xs text-white/55">GitHub</div>
                  <div className="mt-1 text-sm text-white/85">Open</div>
                </a>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Next.js",
                  "Angular",
                  "Vue",
                  "ServiceNow",
                  "GSAP",
                  "TypeScript",
                ].map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </div>
          </div>

          <div className="ct-reveal rounded-2xl border border-stroke bg-glass p-6 shadow-glow">
            <div className="text-lg font-semibold">Send a message</div>
            <p className="mt-1 text-sm text-white/65">
              This uses your email client (mailto) — no backend needed.
            </p>

            <form onSubmit={submit} className="mt-5 space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-2xl border border-stroke bg-black/25 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-white/20"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                type="email"
                className="w-full rounded-2xl border border-stroke bg-black/25 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-white/20"
              />
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Message"
                rows={5}
                className="w-full resize-none rounded-2xl border border-stroke bg-black/25 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-white/20"
              />

              <button
                type="submit"
                className="w-full rounded-full border border-stroke bg-ember px-5 py-3 text-sm font-medium text-white hover:brightness-110 shadow-glow"
              >
                Send
              </button>

              <div className="text-xs text-white/50">
                Tip: You can also copy email/phone from the left panel.
              </div>
            </form>
          </div>
        </div>
      </Section>
    </section>
  );
}
