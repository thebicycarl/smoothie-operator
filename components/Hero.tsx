"use client";

import Image from "next/image";
import { scrollToSection } from "@/lib/scroll";

export default function Hero() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-brown/15 bg-cream/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <span className="font-display text-xl font-semibold tracking-tight text-terracotta-dark">
            smoothie<span className="text-amber">operator</span>
          </span>
          <button
            type="button"
            onClick={() => scrollToSection("configurator")}
            className="hidden min-h-[44px] items-center rounded-lg bg-terracotta px-5 font-bold text-cream transition duration-300 ease-in-out hover:bg-terracotta-dark sm:inline-flex"
          >
            Build Your Stack
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden px-5 pb-16 pt-10 sm:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <span className="inline-flex items-center rounded-full bg-amber/25 px-3 py-1 text-xs font-bold uppercase tracking-widest text-terracotta-dark">
              Build your own nutrient stack
            </span>

            <h1 className="mt-5 font-display text-5xl font-semibold leading-[0.95] tracking-tight text-terracotta-dark sm:text-6xl lg:text-7xl">
              Easy nutrition,
              <br />
              café flavour.
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70 sm:text-lg">
              Pick your flavours, then dial in protein, creatine, and collagen
              to match your goals. Rip, pour, blend — ready in 30 seconds.
            </p>

            <div className="mt-7 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row md:items-start">
              <button
                type="button"
                onClick={() => scrollToSection("menu")}
                className="flex min-h-[44px] w-full items-center justify-center rounded-lg bg-terracotta px-7 text-base font-bold text-cream transition duration-300 ease-in-out hover:bg-terracotta-dark sm:w-auto"
              >
                Pick Flavours
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("configurator")}
                className="flex min-h-[44px] w-full items-center justify-center rounded-lg border-2 border-terracotta-dark px-7 text-base font-bold text-terracotta-dark transition duration-300 ease-in-out hover:bg-terracotta-dark hover:text-cream sm:w-auto"
              >
                Build Your Stack
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(63,160,124,0.30)_0%,_transparent_70%)]" />
            <div className="absolute h-64 w-64 rounded-full bg-pink/40 blur-2xl sm:h-80 sm:w-80" />
            <Image
              src="/images/product-hero2.png"
              width={400}
              height={400}
              alt="Performance smoothie packet"
              priority
              className="relative z-10 w-[280px] drop-shadow-2xl sm:w-[400px]"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
