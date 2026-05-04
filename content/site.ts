/**
 * Story-first marketing copy. Swap this module for a CMS (Sanity, Contentful, etc.)
 * or fetch at build time without changing component structure.
 */
export const site = {
  brand: {
    name: "Luma",
    nameUpper: "LUMA",
    product: "Luma Tile FX",
  },
  nav: {
    buy: "Buy now",
    features: "Features",
    stories: "Stories",
  },
  hero: {
    eyebrow: "Luma Tile FX",
    titleLine1: "Your walls.",
    titleLine2: "Reimagined in light.",
    sub:
      "Translucent tiles that paint the room—color, motion, and atmosphere in one surface.",
    primaryCta: "Build a wall",
    secondaryCta: "See what it does",
    scroll: "Scroll",
  },
  transformation: {
    eyebrow: "Scene engine",
    title: "Watch the room reshape itself",
    body: "From calm ambient washes to pulse-driven parties—one installation, infinite moods. The wall becomes a living gradient.",
  },
  features: {
    eyebrow: "Why specifiers choose Luma",
    title: "Built for atmosphere, not gimmicks",
    items: [
      {
        title: "Custom color scenes",
        copy: "Dial in brand palettes, sunsets, or monochrome galleries with software-defined looks.",
      },
      {
        title: "Music sync",
        copy: "Low-latency audio analysis so the grid breathes with the beat without harsh flashes.",
      },
      {
        title: "App control",
        copy: "Groups, schedules, and presets—hand off to clients or lock a signature install look.",
      },
    ],
  },
  testimonials: {
    eyebrow: "In the field",
    title: "What people notice first",
    quotes: [
      { text: "This setup changed our space completely.", by: "Residential client" },
      { text: "Reads like a six-figure install on camera.", by: "Content studio" },
      { text: "Our go-to for lobby feature walls this year.", by: "Commercial integrator" },
    ],
  },
  store: {
    eyebrow: "Commerce-ready",
    title: "Choose your setup",
    hint: "Stripe Checkout when keys are set—this block is structured for a real catalog later.",
    addToCart: "Secure checkout",
    cartLabel: "Items reserved",
  },
  stickyCta: {
    label: "Buy now — limited demo allocation",
  },
  cta: {
    title: "Upgrade your space",
    body: "When the wall is the light source, the whole room gets a new budget line.",
    button: "Checkout",
  },
  loader: {
    message: "Calibrating tiles…",
  },
  theme: {
    warm: "Warm",
    cyan: "Cyan",
    aria: "Color atmosphere",
  },
  checkout: {
    missingStripe:
      "Stripe is not configured. Add STRIPE_SECRET_KEY to `.env.local` to enable live checkout.",
    loading: "Opening secure checkout…",
    error: "Checkout could not start. Try again.",
  },
} as const;

export type SiteContent = typeof site;
