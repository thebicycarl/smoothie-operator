"use client";

import { Minus, Plus } from "lucide-react";
import {
  PROTEIN_STOPS,
  CREATINE_STOPS,
  COLLAGEN_STOPS,
  PROTEIN_RECOMMENDED,
  CREATINE_RECOMMENDED,
  COLLAGEN_RECOMMENDED,
  BASE_PROTEIN_GRAMS,
  ORDER_MIN,
} from "@/hooks/useStackConfig";
import { useStackConfigContext } from "@/components/StackConfigProvider";
import { scrollToSection } from "@/lib/scroll";

const PROTEIN_MIN = PROTEIN_STOPS[0];
const PROTEIN_MAX = PROTEIN_STOPS[PROTEIN_STOPS.length - 1];
const CREATINE_MIN = CREATINE_STOPS[0];
const CREATINE_MAX = CREATINE_STOPS[CREATINE_STOPS.length - 1];
const COLLAGEN_MIN = COLLAGEN_STOPS[0];
const COLLAGEN_MAX = COLLAGEN_STOPS[COLLAGEN_STOPS.length - 1];

function Stepper({
  value,
  unit,
  min,
  max,
  valuePrefix = "",
  onIncrement,
  onDecrement,
}: {
  value: number;
  unit: string;
  min: number;
  max: number;
  valuePrefix?: string;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        aria-label="Decrease dose"
        onClick={onDecrement}
        disabled={value <= min}
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border-2 border-terracotta-dark/30 bg-cream text-terracotta-dark transition duration-300 ease-in-out hover:border-terracotta-dark disabled:opacity-40"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="min-w-[56px] text-center font-display text-lg font-semibold tabular-nums text-terracotta-dark">
        {valuePrefix}
        {value}
        {unit}
      </span>
      <button
        type="button"
        aria-label="Increase dose"
        onClick={onIncrement}
        disabled={value >= max}
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border-2 border-terracotta-dark/30 bg-cream text-terracotta-dark transition duration-300 ease-in-out hover:border-terracotta-dark disabled:opacity-40"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

function NutrientCard({
  title,
  description,
  value,
  unit,
  addon,
  min,
  max,
  recommended,
  valuePrefix,
  recommendedLabel,
  totalNote,
  warning,
  onIncrement,
  onDecrement,
  onSelectRecommended,
}: {
  title: string;
  description: string;
  value: number;
  unit: string;
  addon: number;
  min: number;
  max: number;
  recommended: number;
  valuePrefix?: string;
  recommendedLabel?: string;
  totalNote?: string;
  warning?: string;
  onIncrement: () => void;
  onDecrement: () => void;
  onSelectRecommended: () => void;
}) {
  const meetsRecommended = value >= recommended;

  return (
    <div
      className={`rounded-2xl border bg-cream-card px-4 py-2.5 transition duration-300 ease-in-out ${
        warning
          ? "border-amber/50 ring-1 ring-amber/30"
          : meetsRecommended
            ? "border-terracotta/40 ring-1 ring-terracotta/20"
            : "border-brown/15"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-semibold leading-tight text-terracotta-dark">
              {title}
            </h3>
            {meetsRecommended && (
              <span className="rounded-full bg-terracotta/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-terracotta-dark">
                Recommended
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs leading-tight text-ink/60">{description}</p>
          {totalNote && (
            <p className="mt-1 text-xs font-semibold tabular-nums text-terracotta-dark">
              {totalNote}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1">
          <Stepper
            value={value}
            unit={unit}
            min={min}
            max={max}
            valuePrefix={value > 0 ? valuePrefix : undefined}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
          <span
            className={`whitespace-nowrap text-xs font-semibold tabular-nums transition-all duration-300 ease-in-out ${
              addon > 0 ? "text-terracotta" : "text-ink/40"
            }`}
          >
            +${addon.toFixed(2)}
            <span className="font-medium text-ink/40"> /serve</span>
          </span>
        </div>
      </div>

      {warning && (
        <p className="mt-2 rounded-lg bg-amber/20 px-3 py-2 text-xs leading-snug text-terracotta-dark">
          {warning}
        </p>
      )}

      {value < recommended && (
        <button
          type="button"
          onClick={onSelectRecommended}
          className="mt-2 text-xs font-semibold text-terracotta underline underline-offset-2 transition duration-300 ease-in-out hover:text-terracotta-dark"
        >
          Use recommended (
          {recommendedLabel ?? `${valuePrefix ?? ""}${recommended}${unit}`})
        </button>
      )}
    </div>
  );
}

export default function StackConfigurator() {
  const config = useStackConfigContext();
  const totalProtein = BASE_PROTEIN_GRAMS + config.proteinGrams;

  return (
    <section
      id="configurator"
      className="section-anchor bg-cream-deep px-5 py-20 sm:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-display text-4xl font-semibold tracking-tight text-terracotta-dark sm:text-5xl">
          Build your stack
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-base text-ink/70">
          Dial in your macros — or stick with our recommended amounts. The same
          nutrient stack applies to every smoothie in your order.
        </p>
        <p className="mx-auto mt-3 max-w-md text-center text-sm text-ink/60">
          Recommended add-ons: Protein +{PROTEIN_RECOMMENDED}g · Creatine{" "}
          {CREATINE_RECOMMENDED}g · Collagen {COLLAGEN_RECOMMENDED}g
        </p>

        <div className="mt-10 pb-40">
          <div className="mb-3 rounded-2xl border border-terracotta/25 bg-amber/15 px-4 py-3 text-center">
            <p className="text-sm font-semibold text-terracotta-dark">
              Every smoothie already includes at least {BASE_PROTEIN_GRAMS}g of
              protein
            </p>
            <p className="mt-0.5 text-xs text-ink/65">
              From whole-food ingredients — before you add any whey below.
            </p>
          </div>

          <div className="space-y-3">
            <NutrientCard
              title="Add Protein"
              description="Extra whey protein isolate on top of the base"
              value={config.proteinGrams}
              unit="g"
              valuePrefix="+"
              recommendedLabel={`+${PROTEIN_RECOMMENDED}g`}
              totalNote={`${BASE_PROTEIN_GRAMS}g base + ${config.proteinGrams}g added = ${totalProtein}g total`}
              warning={
                config.proteinGrams === 0
                  ? "Heads up: part of the smoothie flavour comes from the whey. Leaving it at 0g may change the taste."
                  : undefined
              }
              addon={config.proteinAddon}
              min={PROTEIN_MIN}
              max={PROTEIN_MAX}
              recommended={PROTEIN_RECOMMENDED}
              onIncrement={config.incrementProtein}
              onDecrement={config.decrementProtein}
              onSelectRecommended={() =>
                config.setProteinGrams(PROTEIN_RECOMMENDED)
              }
            />

            <NutrientCard
              title="Creatine Monohydrate"
              description="Power output & recovery · suggested 5g/day"
              value={config.creatineGrams}
              unit="g"
              addon={config.creatineAddon}
              min={CREATINE_MIN}
              max={CREATINE_MAX}
              recommended={CREATINE_RECOMMENDED}
              onIncrement={config.incrementCreatine}
              onDecrement={config.decrementCreatine}
              onSelectRecommended={() =>
                config.setCreatineGrams(CREATINE_RECOMMENDED)
              }
            />

            <NutrientCard
              title="Hydrolysed Collagen"
              description="Joint, skin & connective tissue · suggested 5g/day"
              value={config.collagenGrams}
              unit="g"
              addon={config.collagenAddon}
              min={COLLAGEN_MIN}
              max={COLLAGEN_MAX}
              recommended={COLLAGEN_RECOMMENDED}
              onIncrement={config.incrementCollagen}
              onDecrement={config.decrementCollagen}
              onSelectRecommended={() =>
                config.setCollagenGrams(COLLAGEN_RECOMMENDED)
              }
            />

            <div className="rounded-2xl border border-brown/15 bg-cream-card px-4 py-2">
              <label
                htmlFor="custom-request"
                className="block text-xs font-semibold leading-tight text-terracotta-dark"
              >
                Prefer a supplement not listed here? Let us know:
              </label>
              <input
                id="custom-request"
                type="text"
                value={config.customRequest}
                onChange={(e) => config.setCustomRequest(e.target.value)}
                placeholder="e.g., L-Glutamine, L-Citrulline..."
                className="mt-1 min-h-[44px] w-full rounded-lg border border-brown/25 bg-cream px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-terracotta focus:outline-none"
              />
            </div>
          </div>

          <div className="sticky bottom-4 z-20 mt-8 rounded-2xl border-2 border-terracotta-dark/20 bg-terracotta px-4 py-3.5 text-cream shadow-xl">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-cream/80">
                Order total
              </span>
              <span className="font-display text-lg font-semibold tabular-nums">
                {config.totalServes} serve{config.totalServes === 1 ? "" : "s"}
              </span>
            </div>

            <div className="mt-3 border-t border-cream/20 pt-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-cream/80">
                Your order
              </span>
              <p className="mt-1 text-[11px] leading-tight text-cream/70">
                ${config.pricePerServe.toFixed(2)}/serve · one-time purchase
              </p>
              <dl className="mt-2 space-y-2 text-[11px] leading-snug text-cream/70">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <dt className="font-semibold text-cream/85">Protein per serve</dt>
                    <dd className="mt-0.5 tabular-nums text-cream/60">
                      {BASE_PROTEIN_GRAMS}g base + {config.proteinGrams}g added
                    </dd>
                  </div>
                  <dd className="shrink-0 tabular-nums">{totalProtein}g</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-semibold text-cream/85">Creatine per serve</dt>
                  <dd className="tabular-nums">{config.creatineGrams}g</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-semibold text-cream/85">Collagen per serve</dt>
                  <dd className="tabular-nums">{config.collagenGrams}g</dd>
                </div>
              </dl>
              <div className="mt-3 flex items-end justify-between gap-3">
                <span className="text-[11px] leading-tight text-cream/70">
                  Subtotal
                </span>
                <span className="font-display text-3xl font-semibold leading-none tabular-nums transition-all duration-300 ease-in-out">
                  ${config.subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollToSection("checkout")}
              disabled={!config.meetsMinimumOrder}
              className="mt-3 flex min-h-[44px] w-full items-center justify-center rounded-lg bg-cream px-6 text-sm font-bold text-terracotta-dark transition duration-300 ease-in-out hover:bg-cream-deep disabled:cursor-not-allowed disabled:opacity-50"
            >
              {config.meetsMinimumOrder
                ? "Proceed to Checkout"
                : `Select at least ${ORDER_MIN} serves`}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
