"use client";
import { useState } from "react";

export default function Store() {
  const [cart, setCart] = useState(0);

  return (
    <section className="py-20 text-center">
      <h2>Choose Your Setup</h2>

      <button onClick={() => setCart(cart + 1)}>
        Add Demo Product
      </button>

      <p>Cart: {cart}</p>
    </section>
  );
}