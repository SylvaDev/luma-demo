"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const glow = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <section ref={ref} className="h-screen flex flex-col items-center justify-center relative text-center">
      <motion.div style={{ opacity: glow }} className="absolute w-[300px] h-[300px] bg-[#FF5A1F] blur-[120px] rounded-full" />
      <h1 className="text-4xl md:text-6xl font-bold z-10">Your Walls. Reimagined.</h1>
      <p className="mt-4 text-gray-300 z-10">Light isn’t decoration. It’s atmosphere.</p>
    </section>
  );
}