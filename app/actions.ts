"use server";

import {
  COLLAGEN_STOPS,
  CREATINE_STOPS,
  FLAVOR_IDS,
  FLAVOR_QTY_MAX,
  ORDER_MAX,
  ORDER_MIN,
  PROTEIN_STOPS,
  getRepeatOrderLabel,
  isValidRepeatOrder,
  isValidStop,
} from "@/lib/stackConfig";
import { FLAVORS } from "@/lib/flavors";

export type OrderState = {
  success: boolean;
  error?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseStop(
  value: FormDataEntryValue | null,
  stops: readonly number[]
): number {
  const grams = Number(String(value ?? "").trim());
  return isValidStop(grams, stops) ? grams : -1;
}

type FlavorLine = { id: string; qty: number };

function parseFlavors(raw: string): FlavorLine[] | null {
  try {
    const parsed = JSON.parse(raw) as FlavorLine[];
    if (!Array.isArray(parsed)) return null;

    const validIds = new Set(FLAVOR_IDS);
    const lines: FlavorLine[] = [];

    for (const item of parsed) {
      if (typeof item.id !== "string" || !validIds.has(item.id)) return null;
      const qty = Number(item.qty);
      if (!Number.isInteger(qty) || qty < 0 || qty > FLAVOR_QTY_MAX) return null;
      if (qty > 0) lines.push({ id: item.id, qty });
    }

    return lines;
  } catch {
    return null;
  }
}

export async function submitOrder(
  _prevState: OrderState,
  formData: FormData
): Promise<OrderState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const suburb = String(formData.get("suburb") ?? "").trim();
  const suggestions = String(formData.get("suggestions") ?? "").trim();
  const protein = parseStop(formData.get("protein"), PROTEIN_STOPS);
  const creatine = parseStop(formData.get("creatine"), CREATINE_STOPS);
  const collagen = parseStop(formData.get("collagen"), COLLAGEN_STOPS);
  const repeatOrderRaw = String(formData.get("repeatOrder") ?? "").trim();

  const flavors = parseFlavors(String(formData.get("flavors") ?? ""));

  if (!isValidRepeatOrder(repeatOrderRaw)) {
    return {
      success: false,
      error: "Please select a valid repeat order option.",
    };
  }

  const repeatOrder = repeatOrderRaw;

  if (!name) {
    return { success: false, error: "Please enter your full name." };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (!address) {
    return { success: false, error: "Please enter your delivery address." };
  }

  if (!suburb) {
    return { success: false, error: "Please enter your suburb." };
  }

  if (!flavors || flavors.length === 0) {
    return {
      success: false,
      error: "Please select at least one flavour.",
    };
  }

  const totalServes = flavors.reduce((sum, f) => sum + f.qty, 0);

  if (totalServes < ORDER_MIN || totalServes > ORDER_MAX) {
    return {
      success: false,
      error: `Orders must be between ${ORDER_MIN} and ${ORDER_MAX} serves.`,
    };
  }

  if (protein < 0 || creatine < 0 || collagen < 0) {
    return {
      success: false,
      error: "Invalid smoothie configuration. Please try again.",
    };
  }

  const flavorSummary = flavors
    .map((f) => {
      const flavor = FLAVORS.find((item) => item.id === f.id);
      return `${flavor?.name ?? f.id} ×${f.qty}`;
    })
    .join(", ");

  const payload = {
    name,
    email,
    address,
    suburb,
    totalServes,
    flavors: flavorSummary,
    protein,
    creatine,
    collagen,
    suggestions,
    repeatOrder: getRepeatOrderLabel(repeatOrder),
    secret: process.env.GOOGLE_SHEETS_WEBHOOK_SECRET ?? "",
  };

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn(
      "GOOGLE_SHEETS_WEBHOOK_URL is not set — order accepted but not recorded:",
      payload
    );
    return { success: true };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const raw = await res.text();
    let body: { ok?: boolean; error?: string } | null = null;
    try {
      body = JSON.parse(raw) as { ok?: boolean; error?: string };
    } catch {
      console.error("Google Sheets webhook returned non-JSON:", raw.slice(0, 500));
    }

    if (!res.ok || !body?.ok) {
      return {
        success: false,
        error:
          raw.includes("doPost") || raw.includes("Script function not found")
            ? "Order service is not configured yet. Please try again shortly."
            : "Something went wrong. Please try again.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("Google Sheets webhook failed:", err);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}
