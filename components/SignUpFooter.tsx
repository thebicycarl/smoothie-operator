"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitOrder, type OrderState } from "@/app/actions";
import { useStackConfigContext } from "@/components/StackConfigProvider";
import SportsFoodNotice from "@/components/SportsFoodNotice";
import {
  COLLAGEN_GRAMS,
  formatAud,
  freeShippingNudge,
  REPEAT_ORDER_OPTIONS,
  SERVES_PER_PACK,
  SHIPPING_RULE_LABEL,
} from "@/lib/order";
import { MILK_ML, nutritionForStack } from "@/lib/nutrition";

const initialState: OrderState = { success: false };

function OrderSummary() {
  const config = useStackConfigContext();
  const { quote } = config;
  const nutrition = nutritionForStack(quote.stack.id);
  const nudge = freeShippingNudge(quote.extraPacksForFreeShipping);
  const repeatLabel = REPEAT_ORDER_OPTIONS.find(
    (option) => option.id === config.repeatOrder
  )?.label;

  return (
    <div className="mx-auto mb-10 max-w-md rounded-2xl border border-cream/25 bg-cream/10 p-5 text-left">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">Your order</h3>
        <a
          href="#configurator"
          className="text-xs font-semibold text-cream/70 underline underline-offset-2 transition duration-300 ease-in-out hover:text-cream"
        >
          Edit order
        </a>
      </div>

      <dl className="mt-4 space-y-4 text-sm">
        <div className="rounded-xl border border-cream/20 bg-cream/5 p-3">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-cream/80">{quote.flavourName}</dt>
            <dd className="font-semibold">{quote.stack.name}</dd>
          </div>
          <div className="mt-2 flex items-start justify-between gap-4">
            <dt className="text-cream/80">Chocolate whey protein isolate</dt>
            <dd className="font-semibold tabular-nums">{quote.wpiGrams}g</dd>
          </div>
          <div className="mt-2 flex items-start justify-between gap-4">
            <dt className="text-cream/80">Creatine monohydrate</dt>
            <dd className="text-right font-semibold tabular-nums">
              {quote.creatineGrams}g / serve
            </dd>
          </div>
          <div className="mt-2 flex items-start justify-between gap-4">
            <dt className="text-cream/80">Collagen peptides</dt>
            <dd className="text-right font-semibold">
              {quote.collagen ? `+${COLLAGEN_GRAMS}g / serve` : "None"}
            </dd>
          </div>
          <div className="mt-2 flex items-center justify-between gap-4">
            <dt className="text-cream/80">
              Packs
            </dt>
            <dd className="font-semibold tabular-nums">
              {quote.packs} × {SERVES_PER_PACK} ({quote.serves} serves)
            </dd>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-cream/65">
            {nutrition.pouchLabel} protein in the pouch, {nutrition.withMilkLabel}{" "}
            with {MILK_ML} ml full cream milk.
          </p>
        </div>

        <div className="rounded-xl border border-cream/20 bg-cream/5 p-3">
          <div className="flex items-center justify-between">
            <dt className="text-cream/80">Repeat order</dt>
            <dd className="font-semibold">{repeatLabel}</dd>
          </div>
        </div>
      </dl>

      <dl className="mt-4 space-y-1.5 border-t border-cream/20 pt-4 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-cream/80">
            Packs ({formatAud(quote.pricePerServeCents)}/serve × {quote.serves})
          </dt>
          <dd className="font-semibold tabular-nums">
            {formatAud(quote.subtotalCents)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-cream/80">
            Shipping
            <span className="mt-0.5 block text-[11px] text-cream/60">
              {SHIPPING_RULE_LABEL[quote.shippingRule]}
            </span>
          </dt>
          <dd className="font-semibold tabular-nums">
            {quote.shippingCents === 0
              ? "Free"
              : formatAud(quote.shippingCents)}
          </dd>
        </div>
      </dl>
      {nudge && (
        <p className="mt-2 text-xs text-cream/75">{nudge}</p>
      )}
      {quote.shippingRule === "toowoomba-earlybird" && (
        <p className="mt-2 text-xs text-cream/80">
          Toowoomba earlybird applied. Shipping is free.
        </p>
      )}

      <div className="mt-3 flex items-end justify-between border-t border-cream/20 pt-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-cream/80">
            Order total
          </span>
          <p className="text-[11px] leading-tight text-cream/70">
            {config.repeatOrder === "none"
              ? "One-time purchase · cold-chain delivery"
              : `${repeatLabel} · cold-chain delivery`}
          </p>
        </div>
        <span className="font-display text-3xl font-semibold leading-none tabular-nums">
          {formatAud(quote.totalCents)}
        </span>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex min-h-[44px] w-full items-center justify-center rounded-lg bg-terracotta-dark px-6 text-base font-bold text-cream transition duration-300 ease-in-out hover:brightness-110 disabled:opacity-60"
    >
      {pending ? "Placing order..." : "Place order"}
    </button>
  );
}

function RepeatOrderSelector() {
  const config = useStackConfigContext();

  return (
    <fieldset className="rounded-xl border border-cream/25 bg-cream/10 p-4 text-left">
      <legend className="px-1 text-xs font-bold uppercase tracking-widest text-cream/70">
        Repeat this order?
      </legend>
      <div className="mt-3 space-y-2">
        {REPEAT_ORDER_OPTIONS.map((option) => {
          const selected = config.repeatOrder === option.id;

          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 transition duration-300 ease-in-out ${
                selected
                  ? "border-cream bg-cream/15"
                  : "border-cream/20 bg-cream/5 hover:border-cream/35"
              }`}
            >
              <input
                type="radio"
                name="repeatOrder"
                value={option.id}
                checked={selected}
                onChange={() => config.setRepeatOrder(option.id)}
                className="mt-1 h-4 w-4 accent-cream"
              />
              <span>
                <span className="block text-sm font-semibold text-cream">
                  {option.label}
                </span>
                <span className="mt-0.5 block text-xs text-cream/70">
                  {option.description}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function CheckoutForm({
  formAction,
  error,
}: {
  formAction: (payload: FormData) => void;
  error?: string;
}) {
  const config = useStackConfigContext();
  const toowoomba = config.quote.shippingRule === "toowoomba-earlybird";

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="stack" value={config.stackId} />
      <input
        type="hidden"
        name="collagen"
        value={config.collagen ? "yes" : "no"}
      />
      <input type="hidden" name="packs" value={config.packs} />
      <input
        type="text"
        name="name"
        required
        placeholder="Full name"
        aria-label="Full name"
        autoComplete="name"
        className="min-h-[44px] w-full rounded-lg border border-cream/30 bg-cream/10 px-4 text-cream placeholder:text-cream/50 focus:border-cream focus:outline-none"
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Email"
        aria-label="Email address"
        autoComplete="email"
        className="min-h-[44px] w-full rounded-lg border border-cream/30 bg-cream/10 px-4 text-cream placeholder:text-cream/50 focus:border-cream focus:outline-none"
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
        className="min-h-[44px] w-full rounded-lg border border-cream/30 bg-cream/10 px-4 text-cream placeholder:text-cream/50 focus:border-cream focus:outline-none"
      />
      <div className="text-left">
        <input
          type="text"
          name="suburb"
          required
          placeholder="Suburb or city"
          aria-label="Suburb or city"
          aria-describedby="suburb-hint"
          autoComplete="address-level2"
          value={config.suburb}
          onChange={(event) => config.setSuburb(event.target.value)}
          className="min-h-[44px] w-full rounded-lg border border-cream/30 bg-cream/10 px-4 text-cream placeholder:text-cream/50 focus:border-cream focus:outline-none"
        />
        <p
          id="suburb-hint"
          aria-live="polite"
          className="mt-1.5 text-xs leading-relaxed text-cream/75"
        >
          Toowoomba earlybird: free shipping when the suburb or address includes
          Toowoomba, including North, East, South or West Toowoomba.
          {toowoomba
            ? ` Earlybird rate applied. Shipping is free, and the order total is ${formatAud(config.quote.totalCents)}.`
            : ` Shipping on this order is ${
                config.quote.shippingCents === 0
                  ? "free"
                  : formatAud(config.quote.shippingCents)
              }.`}
        </p>
      </div>
      <RepeatOrderSelector />
      <SubmitButton />
      {error && <p className="text-sm text-cream/85">{error}</p>}
    </form>
  );
}

export default function SignUpFooter() {
  const [state, formAction] = useFormState(submitOrder, initialState);

  return (
    <>
      <section
        id="checkout"
        className="section-anchor bg-terracotta px-5 py-20 text-cream sm:px-8"
      >
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Ready to order?
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-cream/85">
            Check the stack, the packs of five, and where it is going. This
            pilot order does not take payment. We will confirm delivery with
            you.
          </p>

          <div className="mt-10">
            <OrderSummary />
          </div>

          <div className="mb-6 text-left">
            <SportsFoodNotice tone="cream" />
          </div>

          <div>
            {state.success ? (
              <p className="rounded-2xl border-2 border-cream/40 bg-cream/10 px-6 py-5 font-display text-xl font-semibold">
                Order received. We will be in touch shortly to confirm delivery.
              </p>
            ) : (
              <CheckoutForm formAction={formAction} error={state.error} />
            )}
          </div>

          <p className="mt-4 text-xs text-cream/70">
            Secure checkout coming soon. No payment is taken for pilot orders.
          </p>
        </div>
      </section>

      <footer className="bg-terracotta-dark px-5 py-10 text-cream sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <span className="font-display text-xl font-semibold">
            smoothie<span className="text-amber">operator</span>
          </span>
          <span className="text-xs text-cream/70">
            © 2026 SMOOTHIE OPERATOR
          </span>
          <a
            href="#"
            className="text-xs text-cream/70 transition duration-300 ease-in-out hover:text-cream"
          >
            Privacy Policy
          </a>
        </div>
      </footer>
    </>
  );
}
