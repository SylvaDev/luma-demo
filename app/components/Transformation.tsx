"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

import { site } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

export default function Transformation() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".transform-box",
      { scale: 0.92, opacity: 0.85 },
      {
        scale: 1,
        opacity: 1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          end: "center center",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section
      ref={ref}
      className="flex min-h-[100vh] items-center justify-center px-6 py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="transform-box relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-10 shadow-[0_0_80px_rgba(255,90,31,0.12)] backdrop-blur-xl md:p-16"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#FF5A1F]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />
        <p className="relative text-xs font-medium uppercase tracking-[0.35em] text-[#FF5A1F]/90">
          {site.transformation.eyebrow}
        </p>
        <h2 className="relative mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
          {site.transformation.title}
        </h2>
        <p className="relative mt-4 max-w-xl text-white/65">
          {site.transformation.body}
        </p>
      </motion.div>
    </section>
  );
}
