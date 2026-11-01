import { AVAILABLE_FLAVOR } from "@/lib/flavors";

export const SERVES_PER_PACK = 6;
/** Pilot checkout guard. The product itself is sold as 1 or more packs. */
export const PACK_MIN = 1;
export const PACK_MAX = 20;

export const ORDER_SHIPPING_CENTS = 1450;
export const FREE_SHIPPING_THRESHOLD_CENTS = 10000;

export const COLLAGEN_GRAMS = 10;
export const COLLAGEN_CENTS_PER_SERVE = 100;
export const CREATINE_GRAMS = 3;

/** The only stack on sale for this pilot. */
export const ATHLETE_STACK = {
  id: "athlete",
  name: "Athlete",
  priceCents: 890,
  wpiGrams: 25,
} as const;

export const STACKS = [ATHLETE_STACK] as const;

export type Stack = (typeof STACKS)[number];
export type StackId = Stack["id"];

export type ShippingRule = "flat" | "free-over-100" | "toowoomba-earlybird";

export const SHIPPING_RULE_LABEL: Record<ShippingRule, string> = {
  flat: "Flat $14.50",
  "free-over-100": "Free over $100",
  "toowoomba-earlybird": "Toowoomba earlybird",
};

export const REPEAT_ORDER_OPTIONS = [
  { id: "none", label: "One-time order", description: "Deliver once" },
  {
    id: "fortnightly",
    label: "Every 2 weeks",
    description: "Same order, repeat fortnightly",
  },
  {
    id: "monthly",
    label: "Every 4 weeks",
    description: "Same order, repeat every 4 weeks",
  },
] as const;

export type RepeatOrderId = (typeof REPEAT_ORDER_OPTIONS)[number]["id"];
export const REPEAT_ORDER_DEFAULT: RepeatOrderId = "none";
export const REPEAT_ORDER_IDS = REPEAT_ORDER_OPTIONS.map((option) => option.id);

export type OrderQuote = {
  stack: Stack;
  collagen: boolean;
  packs: number;
  serves: number;
  creatineGrams: number;
  collagenGrams: number;
  wpiGrams: number;
  pricePerServeCents: number;
  packPriceCents: number;
  subtotalCents: number;
  shippingCents: number;
  shippingRule: ShippingRule;
  totalCents: number;
  /** Extra packs needed to reach free shipping. Null when shipping is already free. */
  extraPacksForFreeShipping: number | null;
  flavourName: string;
};

export type OrderRecord = {
  name: string;
  email: string;
  address: string;
  suburb: string;
  flavour: string;
  stack: string;
  wpiGrams: number;
  creatineGrams: number;
  collagen: string;
  packs: number;
  serves: number;
  pricePerServeCents: number;
  subtotalCents: number;
  shippingCents: number;
  shippingRule: string;
  orderTotalCents: number;
  repeatOrder: string;
};

export function formatAud(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function isStackId(value: string): value is StackId {
  return STACKS.some((stack) => stack.id === value);
}

export function getStack(id: StackId): Stack {
  const stack = STACKS.find((item) => item.id === id);
  if (!stack) {
    throw new Error(`Unknown stack: ${id}`);
  }
  return stack;
}

export function isValidPackCount(packs: number): boolean {
  return Number.isInteger(packs) && packs >= PACK_MIN && packs <= PACK_MAX;
}

export function isToowoombaLocality(suburb: string, address = ""): boolean {
  const text = `${suburb} ${address}`
    .toLowerCase()
    .replace(/[^a-z]+/g, " ");
  return /\btoowoomba\b/.test(text);
}

export function collagenLabel(collagen: boolean): string {
  return collagen ? `+${COLLAGEN_GRAMS}g collagen peptides` : "None";
}

export function isValidCollagenLabel(value: string): boolean {
  return value === "None" || value === `+${COLLAGEN_GRAMS}g collagen peptides`;
}

export function collagenFromLabel(value: string): boolean | null {
  if (value === "None") return false;
  if (value === `+${COLLAGEN_GRAMS}g collagen peptides`) return true;
  return null;
}

export function getRepeatOrderLabel(id: RepeatOrderId): string {
  return (
    REPEAT_ORDER_OPTIONS.find((option) => option.id === id)?.label ??
    "One-time order"
  );
}

export function isValidRepeatOrder(value: string): value is RepeatOrderId {
  return (REPEAT_ORDER_IDS as readonly string[]).includes(value);
}

export function shippingOfferCopy(): string {
  return `Shipping is ${formatAud(ORDER_SHIPPING_CENTS)} flat. It is free when the serve subtotal reaches ${formatAud(FREE_SHIPPING_THRESHOLD_CENTS)}, before shipping. Toowoomba earlybird: free shipping when your suburb or address includes Toowoomba.`;
}

export function freeShippingNudge(extraPacks: number | null): string | null {
  if (extraPacks == null) return null;
  const serves = extraPacks * SERVES_PER_PACK;
  if (serves === SERVES_PER_PACK) {
    return `Add ${SERVES_PER_PACK} more serves and shipping is free.`;
  }
  return `Add ${serves} more serves for free shipping.`;
}

function extraPacksForFreeShipping(
  packs: number,
  subtotalCents: number,
  pricePerServeCents: number,
  shippingIsFlat: boolean
): number | null {
  if (!shippingIsFlat) return null;
  const needed = FREE_SHIPPING_THRESHOLD_CENTS - subtotalCents;
  if (needed <= 0) return null;
  const packPrice = pricePerServeCents * SERVES_PER_PACK;
  const extra = Math.ceil(needed / packPrice);
  if (packs + extra > PACK_MAX) return null;
  return extra;
}

export function quoteOrder(input: {
  stackId: StackId;
  collagen: boolean;
  packs: number;
  suburb?: string;
  address?: string;
}): OrderQuote | null {
  if (!isValidPackCount(input.packs)) return null;

  const stack = getStack(input.stackId);
  const serves = input.packs * SERVES_PER_PACK;
  const pricePerServeCents =
    stack.priceCents + (input.collagen ? COLLAGEN_CENTS_PER_SERVE : 0);
  const subtotalCents = pricePerServeCents * serves;
  const toowoomba = isToowoombaLocality(
    input.suburb ?? "",
    input.address ?? ""
  );

  let shippingRule: ShippingRule;
  let shippingCents: number;
  if (toowoomba) {
    shippingRule = "toowoomba-earlybird";
    shippingCents = 0;
  } else if (subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS) {
    shippingRule = "free-over-100";
    shippingCents = 0;
  } else {
    shippingRule = "flat";
    shippingCents = ORDER_SHIPPING_CENTS;
  }

  return {
    stack,
    collagen: input.collagen,
    packs: input.packs,
    serves,
    creatineGrams: CREATINE_GRAMS,
    collagenGrams: input.collagen ? COLLAGEN_GRAMS : 0,
    wpiGrams: stack.wpiGrams,
    pricePerServeCents,
    packPriceCents: pricePerServeCents * SERVES_PER_PACK,
    subtotalCents,
    shippingCents,
    shippingRule,
    totalCents: subtotalCents + shippingCents,
    extraPacksForFreeShipping: extraPacksForFreeShipping(
      input.packs,
      subtotalCents,
      pricePerServeCents,
      shippingRule === "flat"
    ),
    flavourName: AVAILABLE_FLAVOR.name,
  };
}

export function buildOrderRecord(
  quote: OrderQuote,
  customer: {
    name: string;
    email: string;
    address: string;
    suburb: string;
    repeatOrder: RepeatOrderId;
  }
): OrderRecord {
  return {
    name: customer.name,
    email: customer.email,
    address: customer.address,
    suburb: customer.suburb,
    flavour: quote.flavourName,
    stack: quote.stack.name,
    wpiGrams: quote.wpiGrams,
    creatineGrams: quote.creatineGrams,
    collagen: collagenLabel(quote.collagen),
    packs: quote.packs,
    serves: quote.serves,
    pricePerServeCents: quote.pricePerServeCents,
    subtotalCents: quote.subtotalCents,
    shippingCents: quote.shippingCents,
    shippingRule: SHIPPING_RULE_LABEL[quote.shippingRule],
    orderTotalCents: quote.totalCents,
    repeatOrder: getRepeatOrderLabel(customer.repeatOrder),
  };
}
