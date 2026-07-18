/**
 * Smoothie Operator — order webhook
 *
 * 1. Open your Google Sheet (headers in row 1):
 *    Name | Email | Address | Suburb | Total Serves | Flavours | Protein | Creatine | Collagen | Suggestions | Repeat Order
 * 2. Extensions → Apps Script → paste this file → Save
 * 3. Deploy → New deployment → Web app
 *    Execute as: Me · Who has access: Anyone
 * 4. Copy the /exec URL into .env.local as GOOGLE_SHEETS_WEBHOOK_URL
 */

var SECRET = ""; // optional — must match GOOGLE_SHEETS_WEBHOOK_SECRET in .env.local

var PROTEIN_STOPS = [0, 15, 25];
var CREATINE_STOPS = [0, 5, 10];
var COLLAGEN_STOPS = [0, 5, 10];
var ORDER_MIN = 5;
var ORDER_MAX = 20;
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
    var flavors = String(data.flavors || "").trim();
    var suggestions = String(data.suggestions || "").trim();
    var repeatOrder = String(data.repeatOrder || "One-time order").trim();

    if (!name) {
      return jsonResponse({ ok: false, error: "missing name" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ ok: false, error: "invalid email" });
    }

    if (!address) {
      return jsonResponse({ ok: false, error: "missing address" });
    }

    if (!suburb) {
      return jsonResponse({ ok: false, error: "missing suburb" });
    }

    if (!flavors) {
      return jsonResponse({ ok: false, error: "missing flavors" });
    }

    var totalServes = toNumber(data.totalServes);
    var protein = toNumber(data.protein);
    var creatine = toNumber(data.creatine);
    var collagen = toNumber(data.collagen);

    if (totalServes < ORDER_MIN || totalServes > ORDER_MAX) {
      return jsonResponse({ ok: false, error: "invalid total serves" });
    }

    if (PROTEIN_STOPS.indexOf(protein) === -1) {
      return jsonResponse({ ok: false, error: "invalid protein" });
    }

    if (CREATINE_STOPS.indexOf(creatine) === -1) {
      return jsonResponse({ ok: false, error: "invalid creatine" });
    }

    if (COLLAGEN_STOPS.indexOf(collagen) === -1) {
      return jsonResponse({ ok: false, error: "invalid collagen" });
    }

    if (REPEAT_ORDER_OPTIONS.indexOf(repeatOrder) === -1) {
      return jsonResponse({ ok: false, error: "invalid repeat order" });
    }

    SpreadsheetApp.getActiveSpreadsheet()
      .getActiveSheet()
      .appendRow([
        name,
        email,
        address,
        suburb,
        totalServes,
        flavors,
        protein,
        creatine,
        collagen,
        suggestions,
        repeatOrder,
      ]);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
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
