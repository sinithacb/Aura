"use client";
import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

type FadeInProps = PropsWithChildren<{ delay?: number; y?: number }>;

export default function FadeIn({ children, delay = 0, y = 16 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}


