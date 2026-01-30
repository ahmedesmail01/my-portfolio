"use client";

import { motion, Variants } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number; // Delay for the whole animation to start
  duration?: number; // Duration per word
  stagger?: number; // Delay between words
}

export default function BlurText({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  duration = 0.8,
  stagger = 0.08,
}: BlurTextProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: duration,
        ease: "easeOut",
      },
    },
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
    },
  };

  return (
    <motion.div
      className={`flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className={`inline-block mr-[0.25em] ${wordClassName}`}
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
