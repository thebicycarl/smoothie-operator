import type { Metadata } from "next";
import { Fraunces, Barlow } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SMOOTHIE OPERATOR | Performance Smoothies",
  description:
    "Ready-to-blend, café-quality smoothie packs. Customise your protein, creatine, collagen and more — delivered cold-chain to your door.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${barlow.variable} font-sans`}
    >
      <body className="bg-cream text-ink antialiased">{children}</body>
    </html>
  );
}
