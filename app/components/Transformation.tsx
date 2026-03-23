"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Transformation() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".transform-box",
      { scale: 0.8 },
      {
        scale: 1,
        scrollTrigger: {
          trigger: ref.current,
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section ref={ref} className="h-[120vh] flex items-center justify-center">
      <div className="transform-box w-[70%] h-[300px] bg-gradient-to-br from-black to-[#FF5A1F] rounded-2xl flex items-center justify-center">
        Watch your space transform
      </div>
    </section>
  );
}