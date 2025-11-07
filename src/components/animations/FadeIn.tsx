"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { PropsWithChildren } from "react";

type FadeInProps = PropsWithChildren<{ delay?: number; y?: number }>;

export default function FadeIn({ children, delay = 0, y = 16 }: FadeInProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkVisibility = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          setIsInView(true);
        }
      }
    };

    // Check visibility after the browser has painted
    const rafId = requestAnimationFrame(() => {
      checkVisibility();
    });

    // Also set up intersection observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}


