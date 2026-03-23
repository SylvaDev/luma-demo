"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function InteractiveTiles() {
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;

      gsap.to(".tile", { x, y, stagger: 0.02 });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section className="h-screen flex items-center justify-center gap-3 flex-wrap">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="tile w-16 h-16 md:w-20 md:h-20 bg-[#FF5A1F] rounded-lg" />
      ))}
    </section>
  );
}