import { NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * Creates a Stripe Checkout Session (payment mode).
 * Requires STRIPE_SECRET_KEY in the environment.
 */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      {
        error: "stripe_not_configured",
        message:
          "Set STRIPE_SECRET_KEY in .env.local to enable checkout. See .env.example.",
      },
      { status: 503 }
    );
  }

  try {
    const stripe = new Stripe(secret);
    const origin =
      request.headers.get("origin") ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 499_00,
            product_data: {
              name: "Luma Tile FX — Starter (demo)",
              description:
                "Demo checkout line item for the Luma showcase site. Replace with your catalog SKUs.",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/?checkout=success`,
      cancel_url: `${origin}/?checkout=cancel`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "no_session_url" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json(
      { error: "checkout_failed" },
      { status: 500 }
    );
  }
}
