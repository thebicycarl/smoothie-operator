import { FLAVORS } from "@/lib/flavors";

export const BASE_PRICE_PER_SERVE = 6.9;

// Flat shipping fee per order (cold-chain courier).
export const ORDER_SHIPPING = 14.5;
export const FREE_SHIPPING_THRESHOLD = 150;

export function getOrderShipping(subtotal: number, hasItems: boolean): number {
  if (!hasItems || subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return ORDER_SHIPPING;
}

// Order quantity limits (total serves across all flavours).
export const ORDER_MIN = 5;
export const ORDER_MAX = 20;
export const FLAVOR_QTY_MAX = 20;

// Protein already present from whole-food ingredients (before any whey add-on).
export const BASE_PROTEIN_GRAMS = 7;

export const PROTEIN_STOPS = [0, 15, 25] as const;
export const CREATINE_STOPS = [0, 5, 10] as const;
export const COLLAGEN_STOPS = [0, 5, 10] as const;

// Recommended daily serving for each nutrient (protein = grams of whey added).
export const PROTEIN_RECOMMENDED = 15;
export const CREATINE_RECOMMENDED = 5;
export const COLLAGEN_RECOMMENDED = 5;

export const CREATINE_MAX = CREATINE_STOPS[CREATINE_STOPS.length - 1];
export const COLLAGEN_MAX = COLLAGEN_STOPS[COLLAGEN_STOPS.length - 1];

export const FLAVOR_IDS = FLAVORS.map((f) => f.id);

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

export function getRepeatOrderLabel(id: RepeatOrderId): string {
  return (
    REPEAT_ORDER_OPTIONS.find((option) => option.id === id)?.label ??
    "One-time order"
  );
}

export function isValidRepeatOrder(value: string): value is RepeatOrderId {
  return (REPEAT_ORDER_IDS as readonly string[]).includes(value);
}

export function isValidStop(grams: number, stops: readonly number[]): boolean {
  for (let i = 0; i < stops.length; i++) {
    if (stops[i] === grams) return true;
  }
  return false;
}
