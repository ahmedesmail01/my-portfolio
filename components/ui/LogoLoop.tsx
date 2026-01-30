"use client";

import React from "react";
import { motion } from "framer-motion";

interface Logo {
  id: string | number;
  label: string;
}

interface LogoLoopProps {
  logos: Logo[];
}

export default function LogoLoop({ logos }: LogoLoopProps) {
  // Duplicate logos to create a seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="relative flex w-full overflow-hidden mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
      <motion.div
        className="flex gap-8 pr-8"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 20, // Adjust speed
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="flex shrink-0 items-center justify-center"
          >
            <span className="cursor-default text-sm text-white/50 transition-colors hover:text-white/90">
              {logo.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
