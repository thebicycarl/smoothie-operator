"use client";

import { Minus, Plus } from "lucide-react";
import { useStackConfigContext } from "@/components/StackConfigProvider";
import SportsFoodNotice from "@/components/SportsFoodNotice";
import {
  CREATINE_GRAMS,
  COLLAGEN_CENTS_PER_SERVE,
  COLLAGEN_GRAMS,
  formatAud,
  freeShippingNudge,
  getStack,
  PACK_MAX,
  SERVES_PER_PACK,
  shippingOfferCopy,
  SHIPPING_RULE_LABEL,
  STACKS,
  type Stack,
} from "@/lib/order";
import {
  ATHLETE_CREATINE_NOTE,
  CREATINE_LABEL,
  EVERYDAY_CREATINE_LINE,
  NUTRITION,
  nutritionForStack,
  WPI_LABEL,
} from "@/lib/nutrition";

function StackCard({ stack }: { stack: Stack }) {
  const config = useStackConfigContext();
  const selected = config.stackId === stack.id;
  const nutrition = nutritionForStack(stack.id);
  const athlete = stack.id === "athlete";

  return (
    <label
      className={`flex h-full cursor-pointer flex-col rounded-3xl border bg-cream-card p-5 transition duration-300 ease-in-out ${
        selected
          ? "border-terracotta ring-2 ring-terracotta/30"
          : "border-brown/15 hover:border-terracotta/40"
      }`}
    >
      <span className="flex items-start justify-between gap-3">
        <span>
          <span className="flex items-center gap-2">
            <input
              type="radio"
              name="stack-choice"
              value={stack.id}
              checked={selected}
              onChange={() => config.setStackId(stack.id)}
              className="h-4 w-4 accent-terracotta"
            />
            <span className="font-display text-2xl font-semibold text-terracotta-dark">
              {stack.name}
            </span>
          </span>
          <span className="mt-2 block font-display text-3xl font-semibold tabular-nums text-terracotta">
            {formatAud(stack.priceCents)}
            <span className="text-base font-semibold text-ink/60"> / serve</span>
          </span>
          <span className="mt-1 block text-sm text-ink/60">
            {formatAud(stack.priceCents * SERVES_PER_PACK)} per pack of{" "}
            {SERVES_PER_PACK}
          </span>
        </span>
        {selected && (
          <span className="rounded-full bg-terracotta/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-terracotta-dark">
            Selected
          </span>
        )}
      </span>

      <ul className="mt-4 space-y-1.5 text-sm leading-relaxed text-ink/80">
        <li>
          {stack.wpiGrams}g {WPI_LABEL}
        </li>
        <li>
          {CREATINE_GRAMS}g {CREATINE_LABEL}
        </li>
        <li>Same Black Forest base in every pouch</li>
      </ul>

      <p className="mt-4 text-sm font-semibold leading-relaxed text-terracotta-dark">
        {nutrition.pouchLabel} protein in the pouch, and {nutrition.withMilkLabel}{" "}
        with {NUTRITION.milkMl} ml full cream milk.
      </p>

      {athlete ? (
        <p
          role="note"
          className="mt-4 rounded-xl bg-amber/25 px-3 py-3 text-sm leading-relaxed text-terracotta-dark"
        >
          {ATHLETE_CREATINE_NOTE}
        </p>
      ) : (
        <p className="mt-4 text-sm leading-relaxed text-ink/70">
          {EVERYDAY_CREATINE_LINE}
        </p>
      )}
    </label>
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
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-4xl font-semibold tracking-tight text-terracotta-dark sm:text-5xl">
          Choose your stack
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-ink/70">
          Two fixed stacks. Same Black Forest base, same {CREATINE_GRAMS}g
          creatine monohydrate. Athlete uses {getStack("athlete").wpiGrams}g of
          chocolate whey protein isolate and Everyday uses{" "}
          {getStack("everyday").wpiGrams}g. Sold in packs of {SERVES_PER_PACK}{" "}
          only.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-ink/60">
          {NUTRITION.milkAssumption}
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {STACKS.map((stack) => (
            <StackCard key={stack.id} stack={stack} />
          ))}
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
              on either stack. That is {NUTRITION.collagenProteinLabel} of extra
              protein. Collagen is not a complete protein, so it sits on top of
              the stack figure.
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
