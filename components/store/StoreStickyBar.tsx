"use client";

import { useEffect, useState } from "react";
import { useStackConfigContext } from "@/components/StackConfigProvider";
import { ADD_PACK_CTA } from "@/lib/storefront-copy";
import { formatAud, packServesLabel } from "@/lib/order";

export default function StoreStickyBar() {
  const { quote } = useStackConfigContext();
  const [atOrder, setAtOrder] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const order = document.getElementById("order");
    if (!order) return;

    const observer = new IntersectionObserver(
      ([entry]) => setAtOrder(entry.isIntersecting),
      { rootMargin: "-15% 0px -25% 0px", threshold: 0 }
    );
    observer.observe(order);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!scrolled || atOrder) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-brown/15 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-bold uppercase tracking-wide text-ink/60">
            Black Forest Powerhouse · Athlete
          </p>
          <p className="font-display text-xl font-semibold tabular-nums text-terracotta-dark">
            {formatAud(quote.subtotalCents)}
          </p>
          <p className="truncate text-xs text-ink/60">
            {packServesLabel(quote.packs)} · before shipping
          </p>
        </div>
        <a
          href="#order"
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-lg bg-terracotta px-4 text-sm font-bold text-cream transition duration-300 ease-in-out hover:bg-terracotta-dark"
        >
          {ADD_PACK_CTA}
        </a>
      </div>
    </div>
  );
}
