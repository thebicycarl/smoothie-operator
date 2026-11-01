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
  metadataBase: new URL("https://smoothieoperator.com.au"),
  title: "SMOOTHIE OPERATOR | Black Forest Powerhouse",
  description:
    "Black Forest Powerhouse smoothie serves on the Athlete stack, with optional collagen. Packs of 6 serves, cold-chain delivery. Formulated supplementary sports food.",
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
