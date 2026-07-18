"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitOrder, type OrderState } from "@/app/actions";
import { useStackConfigContext } from "@/components/StackConfigProvider";
import { BASE_PROTEIN_GRAMS, REPEAT_ORDER_OPTIONS } from "@/hooks/useStackConfig";
import { FLAVORS } from "@/lib/flavors";
import { scrollToSection } from "@/lib/scroll";

const initialState: OrderState = { success: false };

function OrderSummary() {
  const config = useStackConfigContext();

  const selectedFlavors = FLAVORS.filter(
    (f) => (config.flavorQuantities[f.id] ?? 0) > 0
  );

  const totalProtein = BASE_PROTEIN_GRAMS + config.proteinGrams;

  const nutrients = [
    {
      label: "Protein",
      detail: `${BASE_PROTEIN_GRAMS}g base + ${config.proteinGrams}g added per serve`,
      display: `${totalProtein}g total per serve`,
    },
    {
      label: "Creatine",
      detail: null,
      display: `${config.creatineGrams}g per serve`,
    },
    {
      label: "Collagen",
      detail: null,
      display: `${config.collagenGrams}g per serve`,
    },
  ];

  return (
    <div className="mx-auto mb-10 max-w-md rounded-2xl border border-cream/25 bg-cream/10 p-5 text-left">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">Your order</h3>
        <button
          type="button"
          onClick={() => scrollToSection("menu")}
          className="text-xs font-semibold text-cream/70 underline underline-offset-2 transition duration-300 ease-in-out hover:text-cream"
        >
          Edit
        </button>
      </div>

      <dl className="mt-4 text-sm">
        <div className="rounded-xl border border-cream/20 bg-cream/5 p-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-cream/70">
            Flavours:
          </p>
          <div className="mt-2 space-y-2">
            {selectedFlavors.length > 0 ? (
              selectedFlavors.map((flavor) => (
                <div
                  key={flavor.id}
                  className="flex items-center justify-between"
                >
                  <dt className="text-cream/80">{flavor.name}</dt>
                  <dd className="font-semibold tabular-nums">
                    ×{config.flavorQuantities[flavor.id]}
                  </dd>
                </div>
              ))
            ) : (
              <p className="text-cream/80">No flavours selected yet</p>
            )}
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-cream/20 bg-cream/5 p-3">
          <div className="flex items-center justify-between">
            <dt className="text-cream/80">Repeat order</dt>
            <dd className="font-semibold">
              {
                REPEAT_ORDER_OPTIONS.find(
                  (option) => option.id === config.repeatOrder
                )?.label
              }
            </dd>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-cream/20 bg-cream/5 p-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-cream/70">
            Per serve:
          </p>
          <div className="mt-2 space-y-2">
            {nutrients.map((n) => (
              <div
                key={n.label}
                className="flex items-start justify-between gap-4"
              >
                <dt className="text-cream/80">
                  {n.label}
                  {n.detail && (
                    <span className="mt-0.5 block text-[11px] text-cream/60">
                      {n.detail}
                    </span>
                  )}
                </dt>
                <dd className="font-semibold tabular-nums">{n.display}</dd>
              </div>
            ))}

            {config.customRequest.trim() && (
              <div className="flex items-start justify-between gap-4 border-t border-cream/15 pt-2">
                <dt className="text-cream/80">Special request</dt>
                <dd className="text-right font-semibold">
                  {config.customRequest}
                </dd>
              </div>
            )}
          </div>
        </div>
      </dl>

      <dl className="mt-4 space-y-1.5 border-t border-cream/20 pt-4 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-cream/80">
            Smoothies (${config.pricePerServe.toFixed(2)}/serve ×{" "}
            {config.totalServes})
          </dt>
          <dd className="font-semibold tabular-nums">
            ${config.subtotal.toFixed(2)}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-cream/80">Shipping</dt>
          <dd className="font-semibold tabular-nums">
            {config.qualifiesForFreeShipping
              ? "Free"
              : `$${config.shippingCost.toFixed(2)}`}
          </dd>
        </div>
      </dl>

      <div className="mt-3 flex items-end justify-between border-t border-cream/20 pt-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-cream/80">
            Order total
          </span>
          <p className="text-[11px] leading-tight text-cream/70">
            {config.repeatOrder === "none"
              ? "One-time purchase · cold-chain delivery"
              : `${REPEAT_ORDER_OPTIONS.find((option) => option.id === config.repeatOrder)?.label ?? "Repeat order"} · cold-chain delivery`}
          </p>
        </div>
        <span className="font-display text-3xl font-semibold leading-none tabular-nums">
          ${config.orderTotal.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className="flex min-h-[44px] w-full items-center justify-center rounded-lg bg-terracotta-dark px-6 text-base font-bold text-cream transition duration-300 ease-in-out hover:brightness-110 disabled:opacity-60"
    >
      {pending ? "Placing order..." : "Place Order"}
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

  const flavorPayload = FLAVORS.map((f) => ({
    id: f.id,
    qty: config.flavorQuantities[f.id] ?? 0,
  }));

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="flavors" value={JSON.stringify(flavorPayload)} />
      <input type="hidden" name="protein" value={config.proteinGrams} />
      <input type="hidden" name="creatine" value={config.creatineGrams} />
      <input type="hidden" name="collagen" value={config.collagenGrams} />
      <input type="hidden" name="suggestions" value={config.customRequest} />
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
        className="min-h-[44px] w-full rounded-lg border border-cream/30 bg-cream/10 px-4 text-cream placeholder:text-cream/50 focus:border-cream focus:outline-none"
      />
      <input
        type="text"
        name="suburb"
        required
        placeholder="Suburb"
        aria-label="Suburb"
        autoComplete="address-level2"
        className="min-h-[44px] w-full rounded-lg border border-cream/30 bg-cream/10 px-4 text-cream placeholder:text-cream/50 focus:border-cream focus:outline-none"
      />
      <RepeatOrderSelector />
      <SubmitButton disabled={!config.meetsMinimumOrder} />
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
            Review your custom smoothie order below, enter your delivery
            details, and we&apos;ll get your cold-chain box on its way.
          </p>

          <div className="mt-10">
            <OrderSummary />
          </div>

          <div>
            {state.success ? (
              <p className="rounded-2xl border-2 border-cream/40 bg-cream/10 px-6 py-5 font-display text-xl font-semibold">
                Order received! We&apos;ll be in touch shortly to confirm
                delivery.
              </p>
            ) : (
              <CheckoutForm formAction={formAction} error={state.error} />
            )}
          </div>

          <p className="mt-4 text-xs text-cream/70">
            Secure checkout coming soon. No payment required for pilot orders.
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
