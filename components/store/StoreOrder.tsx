"use client";

import { Minus, Plus } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { submitOrder, type OrderState } from "@/app/actions";
import { useStackConfigContext } from "@/components/StackConfigProvider";
import SportsFoodNotice from "@/components/SportsFoodNotice";
import { ADD_TO_BOX_CTA, ORDER_COPY } from "@/lib/storefront-copy";
import {
  COLLAGEN_GRAMS,
  formatAud,
  freeShippingNudge,
  PACK_MAX,
  packServesLabel,
  REPEAT_ORDER_OPTIONS,
  shippingOfferCopy,
  SHIPPING_RULE_LABEL,
} from "@/lib/order";

const initialState: OrderState = { success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex min-h-[48px] w-full items-center justify-center rounded-lg bg-terracotta px-6 text-base font-bold text-cream transition duration-300 ease-in-out hover:bg-terracotta-dark disabled:opacity-60"
    >
      {pending ? "Placing order..." : ADD_TO_BOX_CTA}
    </button>
  );
}

export default function StoreOrder() {
  const config = useStackConfigContext();
  const { quote } = config;
  const [state, formAction] = useFormState(submitOrder, initialState);
  const nudge = freeShippingNudge(quote.extraPacksForFreeShipping);
  const toowoomba = quote.shippingRule === "toowoomba-earlybird";
  const repeatLabel = REPEAT_ORDER_OPTIONS.find(
    (option) => option.id === config.repeatOrder
  )?.label;

  return (
    <section id="order" className="section-anchor px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-widest text-terracotta">
          Order
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-terracotta-dark sm:text-5xl">
          {ORDER_COPY.title}
        </h2>
        <p className="mt-3 text-base text-ink/70">{ORDER_COPY.sub}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-3xl border border-brown/15 bg-cream-card p-5 sm:p-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-terracotta-dark">
                    {packServesLabel(quote.packs)}
                  </h3>
                  <p className="mt-1 text-sm text-ink/60">
                    {formatAud(quote.pricePerServeCents)} / serve
                    {quote.collagen ? ` · +${COLLAGEN_GRAMS} g collagen` : ""}
                    {" · "}
                    {quote.serves} serves
                  </p>
                </div>
                <p className="font-display text-4xl font-semibold tabular-nums text-terracotta">
                  {formatAud(quote.subtotalCents)}
                </p>
              </div>
              <div className="mt-5 flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Fewer packs"
                  onClick={config.decrementPacks}
                  disabled={!config.canDecrementPacks}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border-2 border-terracotta-dark/30 text-terracotta-dark transition duration-300 ease-in-out hover:border-terracotta-dark disabled:opacity-40"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[2.5rem] text-center font-display text-2xl font-semibold tabular-nums">
                  {quote.packs}
                </span>
                <button
                  type="button"
                  aria-label="More packs"
                  onClick={config.incrementPacks}
                  disabled={!config.canIncrementPacks}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border-2 border-terracotta-dark/30 text-terracotta-dark transition duration-300 ease-in-out hover:border-terracotta-dark disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <span className="text-sm text-ink/60">
                  {quote.packs === 1 ? "pack" : "packs"}
                </span>
              </div>
              {!config.canIncrementPacks && (
                <p className="mt-3 text-xs text-ink/55">
                  {PACK_MAX} packs is the most one pilot order can include.
                </p>
              )}
            </div>

            <label
              className={`flex cursor-pointer items-start gap-3 rounded-3xl border bg-cream-card p-5 ${
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
              <span>
                <span className="block font-display text-xl font-semibold text-terracotta-dark">
                  {ORDER_COPY.collagen}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-ink/70">
                  Optional. Added to the powder pouch of each serve. Collagen is
                  not a complete protein and is not in the nutrition panel.
                </span>
              </span>
            </label>

            <div className="rounded-3xl border border-brown/15 bg-cream-card p-5 text-sm">
              <dl className="space-y-2">
                <div className="flex justify-between gap-4">
                  <dt className="text-ink/70">
                    {quote.serves} serves · {formatAud(quote.pricePerServeCents)}/serve
                  </dt>
                  <dd className="font-semibold tabular-nums">
                    {formatAud(quote.subtotalCents)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink/70">
                    Shipping
                    <span className="mt-0.5 block text-xs text-ink/50">
                      {SHIPPING_RULE_LABEL[quote.shippingRule]}
                    </span>
                  </dt>
                  <dd className="font-semibold tabular-nums">
                    {quote.shippingCents === 0 ? "Free" : formatAud(quote.shippingCents)}
                  </dd>
                </div>
                <div className="flex items-end justify-between gap-4 border-t border-brown/15 pt-3">
                  <dt className="text-xs font-bold uppercase tracking-wide text-ink/60">
                    Total incl. shipping
                  </dt>
                  <dd className="font-display text-3xl font-semibold tabular-nums text-terracotta-dark">
                    {formatAud(quote.totalCents)}
                  </dd>
                </div>
              </dl>
              {nudge && (
                <p className="mt-3 text-sm font-semibold text-terracotta-dark">{nudge}</p>
              )}
              <p className="mt-3 text-xs leading-relaxed text-ink/60">{shippingOfferCopy()}</p>
              <p className="mt-3 text-xs leading-relaxed text-ink/55">
                Each serve is blended from both pouches. Repeat: {repeatLabel}.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-brown/15 bg-cream-card p-5 sm:p-6">
            {state.success ? (
              <p className="rounded-2xl border-2 border-terracotta/40 bg-cream-deep px-5 py-6 font-display text-2xl font-semibold text-terracotta-dark">
                {ORDER_COPY.success}
              </p>
            ) : (
              <form action={formAction} className="space-y-3">
                <input type="hidden" name="stack" value={config.stackId} />
                <input type="hidden" name="collagen" value={config.collagen ? "yes" : "no"} />
                <input type="hidden" name="packs" value={config.packs} />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full name"
                  aria-label="Full name"
                  autoComplete="name"
                  className="min-h-[44px] w-full rounded-lg border border-brown/20 bg-cream px-4 text-ink placeholder:text-ink/40 focus:border-terracotta focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  aria-label="Email address"
                  autoComplete="email"
                  className="min-h-[44px] w-full rounded-lg border border-brown/20 bg-cream px-4 text-ink placeholder:text-ink/40 focus:border-terracotta focus:outline-none"
                />
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Delivery address"
                  aria-label="Delivery address"
                  autoComplete="street-address"
                  value={config.address}
                  onChange={(event) => config.setAddress(event.target.value)}
                  className="min-h-[44px] w-full rounded-lg border border-brown/20 bg-cream px-4 text-ink placeholder:text-ink/40 focus:border-terracotta focus:outline-none"
                />
                <div>
                  <input
                    type="text"
                    name="suburb"
                    required
                    placeholder="Suburb or city"
                    aria-label="Suburb or city"
                    aria-describedby="store-suburb-hint"
                    autoComplete="address-level2"
                    value={config.suburb}
                    onChange={(event) => config.setSuburb(event.target.value)}
                    className="min-h-[44px] w-full rounded-lg border border-brown/20 bg-cream px-4 text-ink placeholder:text-ink/40 focus:border-terracotta focus:outline-none"
                  />
                  <p
                    id="store-suburb-hint"
                    aria-live="polite"
                    className="mt-1.5 text-xs leading-relaxed text-ink/60"
                  >
                    Toowoomba earlybird: free shipping when the suburb or address
                    includes Toowoomba.
                    {toowoomba
                      ? ` Earlybird rate applied. Shipping is free, and the order total is ${formatAud(quote.totalCents)}.`
                      : ` Shipping on this order is ${
                          quote.shippingCents === 0
                            ? "free"
                            : formatAud(quote.shippingCents)
                        }.`}
                  </p>
                </div>

                <fieldset className="rounded-2xl border border-brown/15 p-4">
                  <legend className="px-1 text-xs font-bold uppercase tracking-widest text-ink/50">
                    Repeat this order?
                  </legend>
                  <div className="mt-3 space-y-2">
                    {REPEAT_ORDER_OPTIONS.map((option) => {
                      const selected = config.repeatOrder === option.id;
                      return (
                        <label
                          key={option.id}
                          className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 ${
                            selected
                              ? "border-terracotta bg-cream-deep"
                              : "border-brown/15"
                          }`}
                        >
                          <input
                            type="radio"
                            name="repeatOrder"
                            value={option.id}
                            checked={selected}
                            onChange={() => config.setRepeatOrder(option.id)}
                            className="mt-1 h-4 w-4 accent-terracotta"
                          />
                          <span>
                            <span className="block text-sm font-semibold text-ink">
                              {option.label}
                            </span>
                            <span className="mt-0.5 block text-xs text-ink/60">
                              {option.description}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <SubmitButton />
                {state.error && (
                  <p className="text-sm text-terracotta-dark">{state.error}</p>
                )}
                <p className="text-xs leading-relaxed text-ink/55">{ORDER_COPY.noPayment}</p>
                <p className="text-xs leading-relaxed text-ink/55">{ORDER_COPY.legal}</p>
              </form>
            )}
          </div>
        </div>

        <div className="mt-6">
          <SportsFoodNotice />
        </div>
      </div>
    </section>
  );
}
