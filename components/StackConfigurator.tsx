"use client";

import { Minus, Plus } from "lucide-react";
import { useStackConfigContext } from "@/components/StackConfigProvider";
import SportsFoodNotice from "@/components/SportsFoodNotice";
import {
  ATHLETE_STACK,
  CREATINE_GRAMS,
  COLLAGEN_CENTS_PER_SERVE,
  COLLAGEN_GRAMS,
  formatAud,
  freeShippingNudge,
  PACK_MAX,
  SERVES_PER_PACK,
  shippingOfferCopy,
  SHIPPING_RULE_LABEL,
} from "@/lib/order";
import {
  ATHLETE_CREATINE_NOTE,
  ATHLETE_NUTRITION,
  CREATINE_LABEL,
  NUTRITION,
  WPI_LABEL,
} from "@/lib/nutrition";

function AthletePanel() {
  return (
    <article className="rounded-3xl border border-brown/15 bg-cream-card p-5 sm:p-6">
      <h3 className="font-display text-2xl font-semibold text-terracotta-dark">
        {ATHLETE_STACK.name}
      </h3>
      <p className="mt-2 font-display text-3xl font-semibold tabular-nums text-terracotta">
        {formatAud(ATHLETE_STACK.priceCents)}
        <span className="text-base font-semibold text-ink/60"> / serve</span>
      </p>
      <p className="mt-1 text-sm text-ink/60">
        {formatAud(ATHLETE_STACK.priceCents * SERVES_PER_PACK)} per pack of{" "}
        {SERVES_PER_PACK}
      </p>
      <ul className="mt-4 space-y-1.5 text-sm leading-relaxed text-ink/80">
        <li>
          {ATHLETE_STACK.wpiGrams}g {WPI_LABEL}
        </li>
        <li>
          {CREATINE_GRAMS}g {CREATINE_LABEL}
        </li>
        <li>Black Forest Powerhouse base in every pouch</li>
      </ul>
      <p className="mt-4 text-sm font-semibold leading-relaxed text-terracotta-dark">
        {ATHLETE_NUTRITION.pouchLabel} protein in the pouch, and{" "}
        {ATHLETE_NUTRITION.withMilkLabel} with {NUTRITION.milkMl} ml full cream
        milk.
      </p>
      <p
        role="note"
        className="mt-4 rounded-xl bg-amber/25 px-3 py-3 text-sm leading-relaxed text-terracotta-dark"
      >
        {ATHLETE_CREATINE_NOTE}
      </p>
    </article>
  );
}

export default function StackConfigurator() {
  const config = useStackConfigContext();
  const { quote } = config;
  const nudge = freeShippingNudge(quote.extraPacksForFreeShipping);
  const shippingFree = quote.shippingCents === 0;

  return (
    <section
      id="configurator"
      className="section-anchor bg-cream-deep px-5 py-20 sm:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-display text-4xl font-semibold tracking-tight text-terracotta-dark sm:text-5xl">
          The Athlete stack
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-ink/70">
          The only stack in this pilot. {ATHLETE_STACK.wpiGrams}g chocolate whey
          protein isolate and {CREATINE_GRAMS}g creatine monohydrate on the
          Black Forest base. Sold in packs of {SERVES_PER_PACK} only.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-ink/60">
          {NUTRITION.milkAssumption}
        </p>

        <div className="mt-10">
          <AthletePanel />
        </div>

        <label
          className={`mt-4 flex cursor-pointer items-start gap-3 rounded-3xl border bg-cream-card p-5 transition duration-300 ease-in-out ${
            config.collagen
              ? "border-terracotta ring-2 ring-terracotta/30"
              : "border-brown/15"
          }`}
        >
          <input
            type="checkbox"
            checked={config.collagen}
            onChange={(event) => config.setCollagen(event.target.checked)}
            className="mt-1 h-4 w-4 accent-terracotta"
          />
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-display text-xl font-semibold text-terracotta-dark">
                Collagen peptides
              </span>
              <span className="text-sm font-semibold tabular-nums text-terracotta">
                +{formatAud(COLLAGEN_CENTS_PER_SERVE)} / serve
              </span>
            </span>
            <span className="mt-1 block text-sm leading-relaxed text-ink/70">
              Optional. +{COLLAGEN_GRAMS}g collagen peptides in the dry chamber
              of each serve. That is {NUTRITION.collagenProteinLabel} of extra
              protein. Collagen is not a complete protein, so it sits on top of
              the Athlete figure.
            </span>
          </span>
        </label>

        <div className="mt-4 rounded-3xl border border-brown/15 bg-cream-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-semibold text-terracotta-dark">
                Packs of {SERVES_PER_PACK}
              </h3>
              <p className="mt-1 text-sm text-ink/70">
                {quote.packs} {quote.packs === 1 ? "pack" : "packs"} ·{" "}
                {quote.serves} serves · {formatAud(quote.pricePerServeCents)} per
                serve
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Fewer packs"
                onClick={config.decrementPacks}
                disabled={!config.canDecrementPacks}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border-2 border-terracotta-dark/30 bg-cream text-terracotta-dark transition duration-300 ease-in-out hover:border-terracotta-dark disabled:opacity-40"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[40px] text-center font-display text-2xl font-semibold tabular-nums text-terracotta-dark">
                {quote.packs}
              </span>
              <button
                type="button"
                aria-label="More packs"
                onClick={config.incrementPacks}
                disabled={!config.canIncrementPacks}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border-2 border-terracotta-dark/30 bg-cream text-terracotta-dark transition duration-300 ease-in-out hover:border-terracotta-dark disabled:opacity-40"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          {!config.canIncrementPacks && (
            <p className="mt-3 text-xs text-ink/60">
              {PACK_MAX} packs is the most one pilot order can include.
            </p>
          )}
        </div>

        <p className="mt-4 rounded-2xl bg-amber/20 px-4 py-3 text-sm leading-relaxed text-terracotta-dark">
          {shippingOfferCopy()}
        </p>

        <div className="mt-4">
          <SportsFoodNotice />
        </div>

        <div className="sticky bottom-4 z-20 mt-8 rounded-2xl border-2 border-terracotta-dark/20 bg-terracotta px-4 py-3.5 text-cream shadow-xl">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold">
              {quote.flavourName} · {quote.stack.name}
            </span>
            <span className="text-sm tabular-nums text-cream/80">
              {quote.packs} × {SERVES_PER_PACK} serves
            </span>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-cream/75">
            {quote.wpiGrams}g chocolate WPI · {quote.creatineGrams}g creatine
            monohydrate
            {quote.collagen
              ? ` · +${COLLAGEN_GRAMS}g collagen`
              : " · no collagen"}
          </p>
          <div className="mt-3 flex items-end justify-between gap-3 border-t border-cream/20 pt-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-cream/70">
                Total incl. shipping
              </p>
              <p className="text-[11px] text-cream/70">
                {shippingFree
                  ? SHIPPING_RULE_LABEL[quote.shippingRule]
                  : `Shipping ${formatAud(quote.shippingCents)}`}
                {nudge ? ` · ${nudge}` : ""}
              </p>
            </div>
            <span className="font-display text-3xl font-semibold leading-none tabular-nums">
              {formatAud(quote.totalCents)}
            </span>
          </div>
          <a
            href="#checkout"
            className="mt-3 flex min-h-[44px] w-full items-center justify-center rounded-lg bg-cream px-6 text-sm font-bold text-terracotta-dark transition duration-300 ease-in-out hover:bg-cream-deep"
          >
            Proceed to checkout
          </a>
        </div>
      </div>
    </section>
  );
}
