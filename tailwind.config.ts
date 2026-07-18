import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pastel green & blue palette. Token names are kept stable so colour
        // tweaks live in this one file; values below define the actual hues.
        cream: "#EAF5EF", // page background (pale mint)
        "cream-deep": "#D8EBE0", // alternating section background
        "cream-card": "#F7FCF9", // cards (near-white, green tint)
        terracotta: "#3E9B7C", // primary green (CTAs, accents)
        "terracotta-dark": "#226B52", // deep green (headings, hovers)
        amber: "#6FB7DC", // pastel blue accent (stars, badges)
        orange: "#9FD3B0", // soft mint
        sky: "#8FC5DE", // pastel sky blue
        "sky-dark": "#4F93B3", // deeper blue
        brown: "#3E6B5C", // muted green-grey (borders, tracks)
        pink: "#BFE0F0", // pastel blue glow
        ink: "#1B3A30", // primary text (deep teal)
      },
      fontFamily: {
        sans: ["var(--font-barlow)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-fraunces)", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};
export default config;
