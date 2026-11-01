/**
 * Smoothie Operator — pilot order webhook
 *
 * Replace row 1 with these headers before redeploying. Old configurator
 * columns will not line up; use a new tab if you still need those rows.
 *
 * Name | Email | Address | Suburb | Flavour | Stack | Chocolate WPI (g) |
 * Creatine (g) | Collagen | Packs (×5) | Serves | Price per serve |
 * Subtotal | Shipping | Shipping rule | Order total | Repeat order
 *
 * Prices are recomputed here from stack, collagen, packs and locality.
 * Keep the cents table in step with lib/order.ts.
 *
 * 1. Extensions → Apps Script → paste this file → Save
 * 2. Deploy → New deployment → Web app
 *    Execute as: Me · Who has access: Anyone
 * 3. Copy the /exec URL into GOOGLE_SHEETS_WEBHOOK_URL
 */

var SECRET = ""; // optional — must match GOOGLE_SHEETS_WEBHOOK_SECRET

var STACKS = {
  Everyday: { priceCents: 790, wpi: 15 },
  Athlete: { priceCents: 890, wpi: 25 },
};
var CREATINE_GRAMS = 3;
var COLLAGEN_GRAMS = 10;
var COLLAGEN_CENTS = 100;
var COLLAGEN_ON = "+" + COLLAGEN_GRAMS + "g collagen peptides";
var SERVES_PER_PACK = 5;
var PACK_MIN = 1;
var PACK_MAX = 20;
var SHIPPING_CENTS = 1450;
var FREE_SHIPPING_CENTS = 10000;
var FLAVOUR = "Black Forest Powerhouse";
var REPEAT_ORDER_OPTIONS = ["One-time order", "Every 2 weeks", "Every 4 weeks"];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (SECRET && data.secret !== SECRET) {
      return jsonResponse({ ok: false, error: "unauthorized" });
    }

    var name = String(data.name || "").trim();
    var email = String(data.email || "").trim();
    var address = String(data.address || "").trim();
    var suburb = String(data.suburb || "").trim();
    var flavour = String(data.flavour || "").trim();
    var stackName = String(data.stack || "").trim();
    var collagen = String(data.collagen || "").trim();
    var repeatOrder = String(data.repeatOrder || "").trim();
    var packs = toNumber(data.packs);
    var creatineGrams = toNumber(data.creatineGrams);
    var wpiGrams = toNumber(data.wpiGrams);

    if (!name) return jsonResponse({ ok: false, error: "missing name" });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ ok: false, error: "invalid email" });
    }
    if (!address) return jsonResponse({ ok: false, error: "missing address" });
    if (!suburb) return jsonResponse({ ok: false, error: "missing suburb" });
    if (flavour !== FLAVOUR) {
      return jsonResponse({ ok: false, error: "invalid flavour" });
    }
    if (!STACKS[stackName]) {
      return jsonResponse({ ok: false, error: "invalid stack" });
    }
    if (collagen !== "None" && collagen !== COLLAGEN_ON) {
      return jsonResponse({ ok: false, error: "invalid collagen" });
    }
    if (creatineGrams !== CREATINE_GRAMS) {
      return jsonResponse({ ok: false, error: "invalid creatine" });
    }
    if (wpiGrams !== STACKS[stackName].wpi) {
      return jsonResponse({ ok: false, error: "invalid wpi" });
    }
    if (
      packs !== Math.round(packs) ||
      packs < PACK_MIN ||
      packs > PACK_MAX
    ) {
      return jsonResponse({ ok: false, error: "invalid packs" });
    }
    if (REPEAT_ORDER_OPTIONS.indexOf(repeatOrder) === -1) {
      return jsonResponse({ ok: false, error: "invalid repeat order" });
    }

    var quoted = quoteOrder(stackName, collagen === COLLAGEN_ON, packs, suburb, address);
    if (
      quoted.serves !== toNumber(data.serves) ||
      quoted.pricePerServeCents !== toNumber(data.pricePerServeCents) ||
      quoted.subtotalCents !== toNumber(data.subtotalCents) ||
      quoted.shippingCents !== toNumber(data.shippingCents) ||
      quoted.orderTotalCents !== toNumber(data.orderTotalCents) ||
      quoted.shippingRule !== String(data.shippingRule || "")
    ) {
      return jsonResponse({ ok: false, error: "price mismatch" });
    }

    SpreadsheetApp.getActiveSpreadsheet()
      .getActiveSheet()
      .appendRow([
        name,
        email,
        address,
        suburb,
        flavour,
        stackName,
        quoted.wpiGrams,
        CREATINE_GRAMS,
        collagen,
        packs,
        quoted.serves,
        quoted.pricePerServeCents / 100,
        quoted.subtotalCents / 100,
        quoted.shippingCents / 100,
        quoted.shippingRule,
        quoted.orderTotalCents / 100,
        repeatOrder,
      ]);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function quoteOrder(stackName, collagenOn, packs, suburb, address) {
  var stack = STACKS[stackName];
  var serves = packs * SERVES_PER_PACK;
  var pricePerServeCents = stack.priceCents + (collagenOn ? COLLAGEN_CENTS : 0);
  var subtotalCents = pricePerServeCents * serves;
  var shippingRule;
  var shippingCents;

  if (isToowoomba(suburb, address)) {
    shippingRule = "Toowoomba earlybird";
    shippingCents = 0;
  } else if (subtotalCents >= FREE_SHIPPING_CENTS) {
    shippingRule = "Free over $100";
    shippingCents = 0;
  } else {
    shippingRule = "Flat $14.50";
    shippingCents = SHIPPING_CENTS;
  }

  return {
    wpiGrams: stack.wpi,
    serves: serves,
    pricePerServeCents: pricePerServeCents,
    subtotalCents: subtotalCents,
    shippingCents: shippingCents,
    shippingRule: shippingRule,
    orderTotalCents: subtotalCents + shippingCents,
  };
}

function isToowoomba(suburb, address) {
  var text = (String(suburb || "") + " " + String(address || ""))
    .toLowerCase()
    .replace(/[^a-z]+/g, " ");
  return /\btoowoomba\b/.test(text);
}

function toNumber(value) {
  var n = Number(value);
  return isNaN(n) ? -1 : n;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
