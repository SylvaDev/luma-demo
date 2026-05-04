"use client";

import "./globals.css";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

import { ThemeProvider } from "./context/ThemeContext";

const LumaTileBackground = dynamic(
  () => import("./components/LumaTileBackground"),
  { ssr: false }
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#030208] text-white antialiased">
        <ThemeProvider>
          <LumaTileBackground />
          <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}