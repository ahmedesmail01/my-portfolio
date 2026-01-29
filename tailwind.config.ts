import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07070A",
        ember: "#B10F2E",
        wine: "#3A0B14",
        glass: "rgba(255,255,255,0.06)",
        stroke: "rgba(255,255,255,0.12)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 10px 40px rgba(177,15,46,0.25)",
      },
      borderRadius: { "2xl": "1.25rem" },
    },
  },
  plugins: [],
} satisfies Config;
