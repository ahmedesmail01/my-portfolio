"use client";

import React from "react";
import { motion } from "framer-motion";

interface Logo {
  id: string | number;
  label: string;
  icon: React.ReactNode;
}

interface LogoLoopProps {
  logos: Logo[];
}

export default function LogoLoop({ logos }: LogoLoopProps) {
  // Duplicate logos to create a seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="relative flex w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex gap-12 pr-12 items-center"
        animate={{
          x: ["0%", "-33.33%"],
        }}
        transition={{
          duration: 30, // Slower, smoother scroll
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="group flex shrink-0 items-center justify-center"
          >
            <div className="flex flex-col items-center gap-2 transition-all duration-300 group-hover:scale-110">
              <div className="text-3xl text-white/40 grayscale transition-all duration-500 group-hover:text-white group-hover:grayscale-0">
                {logo.icon}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
