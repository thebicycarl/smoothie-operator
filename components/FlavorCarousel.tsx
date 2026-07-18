"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Minus, Plus } from "lucide-react";
import { useStackConfigContext } from "@/components/StackConfigProvider";
import { FLAVORS, type Flavor } from "@/lib/flavors";
import { BASE_PRICE_PER_SERVE } from "@/lib/stackConfig";

function QuantityStepper({
  value,
  onIncrement,
  onDecrement,
  canIncrement,
}: {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  canIncrement: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={onDecrement}
        disabled={value <= 0}
        className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg border-2 border-terracotta-dark/30 bg-cream text-terracotta-dark transition duration-300 ease-in-out hover:border-terracotta-dark disabled:opacity-40"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="min-w-[32px] text-center font-display text-lg font-semibold tabular-nums text-terracotta-dark">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={onIncrement}
        disabled={!canIncrement}
        className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg border-2 border-terracotta-dark/30 bg-cream text-terracotta-dark transition duration-300 ease-in-out hover:border-terracotta-dark disabled:opacity-40"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

function FlavorCard({ flavor }: { flavor: Flavor }) {
  const config = useStackConfigContext();
  const quantity = config.flavorQuantities[flavor.id] ?? 0;

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-brown/15 bg-cream-card p-6">
      {flavor.backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${flavor.backgroundImage})` }}
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-cream-card/55 via-cream-card/80 to-cream-card/95"
            aria-hidden
          />
        </>
      )}

      <div className="relative z-10 flex h-full flex-col">
        <div>
          <span className="inline-block rounded-full bg-amber/25 px-2.5 py-1 text-xs font-bold text-terracotta-dark">
            from ${BASE_PRICE_PER_SERVE.toFixed(2)}/serve
          </span>
        </div>

        <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-terracotta-dark">
          {flavor.name}
        </h3>

        <div className="mt-4 space-y-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-terracotta">
              Frozen Chamber
            </p>
            <p className="mt-1 text-sm text-ink/70">{flavor.frozen.join(", ")}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-terracotta">
              Dry Chamber
            </p>
            <p className="mt-1 text-sm text-ink/70">{flavor.dry.join(", ")}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {flavor.nutrients.map((n) => (
            <span
              key={n}
              className="rounded-full bg-cream-deep px-2.5 py-1 text-xs font-semibold text-terracotta-dark"
            >
              {n}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink/60">
            Quantity
          </span>
          <QuantityStepper
            value={quantity}
            onIncrement={() => config.incrementFlavor(flavor.id)}
            onDecrement={() => config.decrementFlavor(flavor.id)}
            canIncrement={config.canAddMoreServes}
          />
        </div>
      </div>
    </div>
  );
}

export default function FlavorCarousel() {
  const [emblaRef] = useEmblaCarousel({ align: "start", loop: false });
  const config = useStackConfigContext();

  return (
    <section id="menu" className="section-anchor py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="font-display text-4xl font-semibold tracking-tight text-terracotta-dark sm:text-5xl">
          Pick your flavours.
        </h2>
        <p className="mt-4 max-w-lg text-base text-ink/70">
          Choose how many of each flavour you want. Minimum order is{" "}
          {config.totalServes > 0 && !config.meetsMinimumOrder ? (
            <span className="font-semibold text-terracotta">
              {config.totalServes} of 5 serves
            </span>
          ) : (
            "5 serves"
          )}
          .
          <span className="md:hidden"> Swipe to explore the line-up.</span>
        </p>
      </div>

      {/* Mobile: Embla carousel */}
      <div className="mt-10 overflow-hidden md:hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-4 px-5">
          {FLAVORS.map((flavor) => (
            <div key={flavor.id} className="min-w-0 flex-[0_0_85%]">
              <FlavorCard flavor={flavor} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: grid */}
      <div className="mx-auto mt-10 hidden max-w-6xl gap-6 px-5 sm:px-8 md:grid md:grid-cols-3">
        {FLAVORS.map((flavor) => (
          <FlavorCard key={flavor.id} flavor={flavor} />
        ))}
      </div>
    </section>
  );
}
