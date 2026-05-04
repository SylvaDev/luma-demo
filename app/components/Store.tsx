"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { site } from "@/content/site";

export default function Store() {
  const [cart, setCart] = useState(0);
  const [checkoutState, setCheckoutState] = useState<"idle" | "loading">("idle");
  const [notice, setNotice] = useState<string | null>(null);

  async function startCheckout() {
    setCheckoutState("loading");
    setNotice(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = (await res.json()) as { url?: string; error?: string; message?: string };

      if (!res.ok) {
        if (data.error === "stripe_not_configured" && data.message) {
          setNotice(data.message);
        } else {
          setNotice(site.checkout.error);
        }
        setCheckoutState("idle");
        return;
      }

      if (data.url) {
        setCart((c) => c + 1);
        window.location.assign(data.url);
        return;
      }

      setNotice(site.checkout.error);
      setCheckoutState("idle");
    } catch {
      setNotice(site.checkout.error);
      setCheckoutState("idle");
    }
  }

  return (
    <section id="store" className="px-6 py-24 md:py-28">
      <div className="mx-auto max-w-lg rounded-3xl border border-white/10 bg-black/45 p-8 text-center backdrop-blur-xl md:p-10">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#FF5A1F]/90">
          {site.store.eyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
          {site.store.title}
        </h2>
        <p className="mt-3 text-sm text-white/55">{site.store.hint}</p>

        {notice && (
          <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-left text-sm text-amber-100/90">
            {notice}
          </p>
        )}

        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          disabled={checkoutState === "loading"}
          onClick={startCheckout}
          className="mt-8 w-full rounded-full bg-[#FF5A1F] py-3.5 text-sm font-medium text-white shadow-[0_0_28px_rgba(255,90,31,0.35)] transition enabled:hover:bg-[#ff6b35] disabled:cursor-wait disabled:opacity-70"
        >
          {checkoutState === "loading" ? site.checkout.loading : site.store.addToCart}
        </motion.button>
        <p className="mt-5 text-sm text-white/50">
          {site.store.cartLabel}: {cart}
        </p>
      </div>
    </section>
  );
}
