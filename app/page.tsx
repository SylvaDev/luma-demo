"use client";

import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Transformation from "./components/Transformation";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Store from "./components/Store";
import StickyCTA from "./components/StickyCTA";
import CTA from "./components/CTA";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 1200);
  }, []);

  return (
    <main className="overflow-x-hidden text-white">
      {!loaded && <Loader />}
      {loaded && (
        <>
          <Navbar />
          <Hero />
          <Transformation />
          <Features />
          <Testimonials />
          <Store />
          <StickyCTA />
          <CTA />
        </>
      )}
    </main>
  );
}