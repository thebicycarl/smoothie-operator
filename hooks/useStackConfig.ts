"use client";

import { useMemo, useState } from "react";
import { FLAVOR_IDS } from "@/lib/flavors";
import {
  BASE_PRICE_PER_SERVE,
  BASE_PROTEIN_GRAMS,
  COLLAGEN_RECOMMENDED,
  COLLAGEN_STOPS,
  CREATINE_RECOMMENDED,
  CREATINE_STOPS,
  FLAVOR_QTY_MAX,
  FREE_SHIPPING_THRESHOLD,
  ORDER_MAX,
  ORDER_MIN,
  ORDER_SHIPPING,
  PROTEIN_RECOMMENDED,
  PROTEIN_STOPS,
  REPEAT_ORDER_DEFAULT,
  getOrderShipping,
  type RepeatOrderId,
} from "@/lib/stackConfig";

export {
  BASE_PRICE_PER_SERVE,
  BASE_PROTEIN_GRAMS,
  COLLAGEN_RECOMMENDED,
  COLLAGEN_STOPS,
  COLLAGEN_MAX,
  CREATINE_RECOMMENDED,
  CREATINE_STOPS,
  CREATINE_MAX,
  FLAVOR_QTY_MAX,
  FREE_SHIPPING_THRESHOLD,
  ORDER_MAX,
  ORDER_MIN,
  ORDER_SHIPPING,
  PROTEIN_RECOMMENDED,
  PROTEIN_STOPS,
  REPEAT_ORDER_DEFAULT,
  REPEAT_ORDER_OPTIONS,
  getOrderShipping,
  type RepeatOrderId,
} from "@/lib/stackConfig";

const PROTEIN_ADDONS: Record<(typeof PROTEIN_STOPS)[number], number> = {
  0: 0,
  15: 1.3,
  25: 2.1,
};

const CREATINE_ADDONS: Record<(typeof CREATINE_STOPS)[number], number> = {
  0: 0,
  5: 0.4,
  10: 0.8,
};

const COLLAGEN_ADDONS: Record<(typeof COLLAGEN_STOPS)[number], number> = {
  0: 0,
  5: 0.5,
  10: 1,
};

function stepStop<T extends readonly number[]>(
  stops: T,
  current: number,
  direction: 1 | -1
): T[number] {
  const index = stops.indexOf(current as T[number]);
  const safeIndex = index === -1 ? 0 : index;
  return stops[Math.max(0, Math.min(stops.length - 1, safeIndex + direction))];
}

function getProteinAddon(grams: number): number {
  return PROTEIN_ADDONS[grams as (typeof PROTEIN_STOPS)[number]] ?? 0;
}

function getCreatineAddon(grams: number): number {
  return CREATINE_ADDONS[grams as (typeof CREATINE_STOPS)[number]] ?? 0;
}

function getCollagenAddon(grams: number): number {
  return COLLAGEN_ADDONS[grams as (typeof COLLAGEN_STOPS)[number]] ?? 0;
}

function createEmptyFlavorQuantities(): Record<string, number> {
  return Object.fromEntries(FLAVOR_IDS.map((id) => [id, 0]));
}

export function useStackConfig() {
  const [proteinGrams, setProteinGrams] = useState<number>(PROTEIN_RECOMMENDED);
  const [creatineGrams, setCreatineGrams] =
    useState<number>(CREATINE_RECOMMENDED);
  const [collagenGrams, setCollagenGrams] =
    useState<number>(COLLAGEN_RECOMMENDED);
  const [customRequest, setCustomRequest] = useState("");
  const [flavorQuantities, setFlavorQuantities] = useState(
    createEmptyFlavorQuantities
  );
  const [repeatOrder, setRepeatOrder] =
    useState<RepeatOrderId>(REPEAT_ORDER_DEFAULT);

  const totalServes = useMemo(
    () =>
      Object.values(flavorQuantities).reduce((sum, qty) => sum + qty, 0),
    [flavorQuantities]
  );

  const incrementProtein = () =>
    setProteinGrams((g) => stepStop(PROTEIN_STOPS, g, 1));
  const decrementProtein = () =>
    setProteinGrams((g) => stepStop(PROTEIN_STOPS, g, -1));

  const incrementCreatine = () =>
    setCreatineGrams((g) => stepStop(CREATINE_STOPS, g, 1));
  const decrementCreatine = () =>
    setCreatineGrams((g) => stepStop(CREATINE_STOPS, g, -1));

  const incrementCollagen = () =>
    setCollagenGrams((g) => stepStop(COLLAGEN_STOPS, g, 1));
  const decrementCollagen = () =>
    setCollagenGrams((g) => stepStop(COLLAGEN_STOPS, g, -1));

  const setFlavorQuantity = (flavorId: string, quantity: number) => {
    setFlavorQuantities((prev) => {
      const currentTotal = Object.values(prev).reduce((sum, qty) => sum + qty, 0);
      const currentQty = prev[flavorId] ?? 0;
      const clamped = Math.max(0, Math.min(FLAVOR_QTY_MAX, quantity));
      const delta = clamped - currentQty;

      if (delta > 0 && currentTotal + delta > ORDER_MAX) {
        return prev;
      }

      return { ...prev, [flavorId]: clamped };
    });
  };

  const incrementFlavor = (flavorId: string) => {
    const current = flavorQuantities[flavorId] ?? 0;
    setFlavorQuantity(flavorId, current + 1);
  };

  const decrementFlavor = (flavorId: string) => {
    const current = flavorQuantities[flavorId] ?? 0;
    setFlavorQuantity(flavorId, current - 1);
  };

  const proteinAddon = getProteinAddon(proteinGrams);
  const creatineAddon = getCreatineAddon(creatineGrams);
  const collagenAddon = getCollagenAddon(collagenGrams);

  const pricePerServe =
    BASE_PRICE_PER_SERVE + proteinAddon + creatineAddon + collagenAddon;

  const subtotal = pricePerServe * totalServes;
  const shippingCost = getOrderShipping(subtotal, totalServes > 0);
  const qualifiesForFreeShipping =
    totalServes > 0 && subtotal >= FREE_SHIPPING_THRESHOLD;
  const orderTotal = subtotal + shippingCost;
  const meetsMinimumOrder = totalServes >= ORDER_MIN;
  const canAddMoreServes = totalServes < ORDER_MAX;

  return {
    proteinGrams,
    setProteinGrams,
    proteinAddon,
    incrementProtein,
    decrementProtein,

    creatineGrams,
    setCreatineGrams,
    creatineAddon,
    incrementCreatine,
    decrementCreatine,

    collagenGrams,
    setCollagenGrams,
    collagenAddon,
    incrementCollagen,
    decrementCollagen,

    customRequest,
    setCustomRequest,

    flavorQuantities,
    setFlavorQuantity,
    incrementFlavor,
    decrementFlavor,

    repeatOrder,
    setRepeatOrder,

    totalServes,
    pricePerServe,
    subtotal,
    shippingCost,
    qualifiesForFreeShipping,
    orderTotal,
    meetsMinimumOrder,
    canAddMoreServes,
  };
}
