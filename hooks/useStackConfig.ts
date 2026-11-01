"use client";

import { useMemo, useState } from "react";
import {
  ATHLETE_STACK,
  PACK_MAX,
  PACK_MIN,
  REPEAT_ORDER_DEFAULT,
  quoteOrder,
  type RepeatOrderId,
} from "@/lib/order";

export function useStackConfig() {
  const stackId = ATHLETE_STACK.id;
  const [collagen, setCollagen] = useState(false);
  const [packs, setPacks] = useState(PACK_MIN);
  const [repeatOrder, setRepeatOrder] =
    useState<RepeatOrderId>(REPEAT_ORDER_DEFAULT);
  const [suburb, setSuburb] = useState("");
  const [address, setAddress] = useState("");

  const quote = useMemo(() => {
    const next = quoteOrder({ stackId, collagen, packs, suburb, address });
    if (!next) {
      throw new Error("Order state is outside the pilot rules");
    }
    return next;
  }, [stackId, collagen, packs, suburb, address]);

  const updatePacks = (next: number) => {
    setPacks(Math.max(PACK_MIN, Math.min(PACK_MAX, Math.round(next))));
  };

  return {
    stackId,
    collagen,
    setCollagen,
    packs,
    incrementPacks: () => updatePacks(packs + 1),
    decrementPacks: () => updatePacks(packs - 1),
    canIncrementPacks: packs < PACK_MAX,
    canDecrementPacks: packs > PACK_MIN,
    repeatOrder,
    setRepeatOrder,
    suburb,
    setSuburb,
    address,
    setAddress,
    quote,
  };
}
