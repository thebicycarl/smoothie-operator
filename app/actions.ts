"use server";

import {
  PACK_MAX,
  PACK_MIN,
  buildOrderRecord,
  isStackId,
  isValidPackCount,
  isValidRepeatOrder,
  quoteOrder,
} from "@/lib/order";

export type OrderState = {
  success: boolean;
  error?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseYesNo(value: string): boolean | null {
  if (value === "yes") return true;
  if (value === "no") return false;
  return null;
}

export async function submitOrder(
  _prevState: OrderState,
  formData: FormData
): Promise<OrderState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const suburb = String(formData.get("suburb") ?? "").trim();
  const stackRaw = String(formData.get("stack") ?? "").trim();
  const collagenRaw = String(formData.get("collagen") ?? "").trim();
  const packs = Number(String(formData.get("packs") ?? "").trim());
  const repeatOrderRaw = String(formData.get("repeatOrder") ?? "").trim();

  if (!isValidRepeatOrder(repeatOrderRaw)) {
    return {
      success: false,
      error: "Please select a valid repeat order option.",
    };
  }

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
    return { success: false, error: "Please enter your suburb or city." };
  }

  if (!isStackId(stackRaw)) {
    return { success: false, error: "Please choose Everyday or Athlete." };
  }

  const collagen = parseYesNo(collagenRaw);
  if (collagen === null) {
    return { success: false, error: "Please choose whether to add collagen." };
  }

  if (!isValidPackCount(packs)) {
    return {
      success: false,
      error: `Orders are packs of 5, from ${PACK_MIN} to ${PACK_MAX} packs.`,
    };
  }

  const quote = quoteOrder({
    stackId: stackRaw,
    collagen,
    packs,
    suburb,
    address,
  });

  if (!quote) {
    return {
      success: false,
      error: "Invalid order. Please choose a stack and at least one pack of 5.",
    };
  }

  const record = buildOrderRecord(quote, {
    name,
    email,
    address,
    suburb,
    repeatOrder: repeatOrderRaw,
  });

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn(
      "GOOGLE_SHEETS_WEBHOOK_URL is not set — order accepted but not recorded:",
      record
    );
    return { success: true };
  }

  const payload = {
    ...record,
    secret: process.env.GOOGLE_SHEETS_WEBHOOK_SECRET ?? "",
  };

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
      console.error(
        "Google Sheets webhook rejected the order:",
        body?.error ?? raw.slice(0, 500)
      );
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
