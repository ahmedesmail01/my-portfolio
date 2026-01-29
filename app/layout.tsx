import "./globals.css";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const jet = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  title: "Ahmed Esmail — Frontend Engineer",
  description: "Next.js / React Frontend Engineer • ServiceNow Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`noise ${space.variable} ${jet.variable} text-white`}>
        {children}
      </body>
    </html>
  );
}
