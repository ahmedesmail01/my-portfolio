import Navbar from "@/components/nav/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <main className="relative min-h-dvh">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <footer className="px-6 pb-10 pt-16 text-center text-white/60">
        <span className="font-[family-name:var(--font-mono)] text-xs">
          Built with Next.js • GSAP • TypeScript
        </span>
      </footer>
    </main>
  );
}
