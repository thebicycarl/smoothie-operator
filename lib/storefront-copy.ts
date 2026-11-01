import {
  ATHLETE_STACK,
  COLLAGEN_CENTS_PER_SERVE,
  COLLAGEN_GRAMS,
  CREATINE_GRAMS,
  formatAud,
  FREE_SHIPPING_THRESHOLD_CENTS,
  ORDER_SHIPPING_CENTS,
  SERVES_PER_PACK,
} from "@/lib/order";
import {
  CREATINE_LABEL,
  MILK_ML,
  SHARED_RECIPE,
  type RecipeLine,
  WPI_LABEL,
} from "@/lib/nutrition";

/**
 * Alternate /store copy. Swap strings here.
 * Pack counts and dollar amounts are composed from lib/order.ts
 * so a price change does not leave a stale "$53.40" in the page.
 */

export const STORE_EYEBROW = "Athlete stack · Black Forest Powerhouse";
export const STORE_H1 = "Easy nutrition, café flavour.";
export const STORE_SUBHEAD =
  "Two pouches. One serve. Real cherries & blueberries, greens and seeds — plus 25 g chocolate whey and 3 g creatine. Rip, pour, blend. Ready in 30 seconds.";

export const STORE_PRICE_LINE = `${formatAud(ATHLETE_STACK.priceCents)} / serve · Packs of ${SERVES_PER_PACK} serves · ${formatAud(ATHLETE_STACK.priceCents * SERVES_PER_PACK)}`;

export const ADD_PACK_CTA = `Add pack of ${SERVES_PER_PACK} serves`;
export const SEE_NUTRITION_CTA = "See nutrition";
export const ADD_TO_BOX_CTA = "Add to box";

export const STORE_MICRO = [
  "Cold-chain delivery",
  `Optional +${COLLAGEN_GRAMS} g collagen (+${formatAud(COLLAGEN_CENTS_PER_SERVE)} / serve)`,
  `Free shipping over ${formatAud(FREE_SHIPPING_THRESHOLD_CENTS)}`,
] as const;

export const STORE_TOP_BAR = `Cold-chain delivery · Packs of ${SERVES_PER_PACK} serves · Free shipping over ${formatAud(FREE_SHIPPING_THRESHOLD_CENTS)}`;

export const PUNCH = [
  "31 g protein",
  "3 g creatine",
  "282 Cal",
  "Blend both pouches in 30 seconds",
] as const;

export const BENEFITS = [
  {
    id: "protein",
    title: "31 g protein",
    body: "Athlete stack with 25 g chocolate WPI on a whole-food base",
  },
  {
    id: "creatine",
    title: "3 g creatine",
    body: "Within the Australian sports-food daily cap",
  },
  {
    id: "whole",
    title: "Whole foods first",
    body: "Cherries, blueberries, spinach, cacao, hemp & flax",
  },
  {
    id: "blend",
    title: "30-second blend",
    body: "Frozen pouch + powder pouch → blender → done",
  },
] as const;

export const BENEFIT_NOTE =
  "Provisional figures. Per serve as sold: 31 g protein, 3 g creatine and 282 Cal. The panel below lists 31.2 g protein, 10.8 g fibre and 1180 kJ (282 Cal).";

export const HOW_TO = {
  title: "Two pouches. Thirty seconds.",
  foot: "One serve per day is the one-day quantity.",
  steps: [
    {
      id: "rip",
      step: "1",
      title: "Rip",
      body: "Open the frozen fruit & greens pouch and the powder pouch.",
    },
    {
      id: "pour",
      step: "2",
      title: "Pour",
      body: "Tip **both pouches** into your blender.",
    },
    {
      id: "blend",
      step: "3",
      title: "Blend",
      body: `Add ~${MILK_ML} mL milk or fluid. Blend until smooth.`,
    },
  ],
} as const;

export const STORY = [
  {
    id: "different",
    title: "Built different: café flavour, training macros",
    body: "Most “healthy” smoothies are either a juice bar treat or a chalky shake. Black Forest Powerhouse is built as a **formulated supplementary sports food**: whole-food fruit and greens in the frozen pouch, Athlete powder stack in the powder pouch. About **31 g protein**, **3 g creatine** and **282 Cal** per serve as sold — café flavour without the café queue.",
  },
  {
    id: "whole",
    title: "Whole foods, not candy flavouring",
    body: "Frozen cherries and blueberries, baby spinach, cacao, hemp seed protein and brown flaxseed meal. The chocolate whey carries the café finish; the base stays recognisable food. Broad nutrients from whole ingredients — not a vitamin spray-on story.",
  },
  {
    id: "stack",
    title: "The Athlete stack",
    body: `**${ATHLETE_STACK.wpiGrams} g** ${WPI_LABEL} + **${CREATINE_GRAMS} g** creatine monohydrate on every serve. Creatine is capped at ${CREATINE_GRAMS} g under Food Standards Code Standard 2.9.4 / Schedule 29. Athlete is the higher-protein stack — not a higher creatine dose. Optional **+${COLLAGEN_GRAMS} g collagen peptides** (+${formatAud(COLLAGEN_CENTS_PER_SERVE)} / serve) if you want it.`,
  },
  {
    id: "days",
    title: "Fuel that fits real days",
    body: `Keep a pack in the freezer. When you need a fast serve: both pouches, milk, blend. Pre-training, post-training, or a no-prep breakfast — same 30-second move. Cold-shipped in packs of ${SERVES_PER_PACK} serves.`,
  },
] as const;

export const PROVISIONAL_SERVE_GRAMS = 201;

const recipeServeGrams =
  SHARED_RECIPE.reduce((sum, line) => sum + line.grams, 0) +
  ATHLETE_STACK.wpiGrams +
  CREATINE_GRAMS;

if (recipeServeGrams !== PROVISIONAL_SERVE_GRAMS) {
  throw new Error(
    `Provisional NIP serving size is ${PROVISIONAL_SERVE_GRAMS} g but the Athlete recipe sums to ${recipeServeGrams} g`
  );
}

export const NUTRITION_PANEL = {
  heading: "Nutrition per serve (as sold)",
  sub: `Serving size ${PROVISIONAL_SERVE_GRAMS} g (both pouches) · 1 serve per package`,
  packClarity: `Sold as a pack of ${SERVES_PER_PACK} serves. This panel is one serve — both pouches — not the whole pack. Optional collagen is not in these figures.`,
  badge: "Provisional · calculated, not a laboratory analysis",
  footnote:
    "Figures are calculated from ingredient panels and reference data. Not a laboratory analysis of the finished pouches. Confirm before relying on pack claims.",
  milkLine: `Blended with ${MILK_ML} mL full cream milk ≈ 41 g protein (milk not included in the panel above).`,
  rows: [
    { id: "energy", label: "Energy", value: "1180 kJ (282 Cal)" },
    { id: "protein", label: "Protein", value: "31.2 g" },
    { id: "fat", label: "Fat, total", value: "6.2 g" },
    { id: "sat", label: "saturated", value: "1.2 g", sub: true },
    { id: "carb", label: "Carbohydrate", value: "20.3 g" },
    { id: "sugars", label: "sugars", value: "17.0 g", sub: true },
    { id: "fibre", label: "Dietary fibre", value: "10.8 g" },
    { id: "sodium", label: "Sodium", value: "82 mg" },
    { id: "creatine", label: "Creatine", value: `${CREATINE_GRAMS} g` },
  ],
} as const;

export type PouchLine = {
  id: string;
  name: string;
  grams: number;
  optional?: boolean;
};

const FROZEN_NAMES: { id: string; name: string }[] = [
  { id: "cherries", name: "Cherries (pitted, frozen)" },
  { id: "blueberries", name: "Blueberries (frozen)" },
  { id: "spinach", name: "Baby spinach" },
];

const POWDER_SHARED_NAMES: { id: string; name: string }[] = [
  { id: "hemp", name: "Macro hemp seed protein powder" },
  { id: "flax", name: "Macro organic brown flaxseed meal" },
  { id: "cacao", name: "Macro organic cacao powder" },
];

function recipeLine(id: string): RecipeLine {
  const line = SHARED_RECIPE.find((item) => item.id === id);
  if (!line) {
    throw new Error(`Missing recipe line: ${id}`);
  }
  return line;
}

export function frozenPouchLines(): PouchLine[] {
  return FROZEN_NAMES.map(({ id, name }) => {
    const line = recipeLine(id);
    if (line.chamber !== "frozen") {
      throw new Error(`${id} is not in the frozen pouch`);
    }
    return { id, name, grams: line.grams };
  });
}

export function powderPouchLines(): PouchLine[] {
  const shared = POWDER_SHARED_NAMES.map(({ id, name }) => {
    const line = recipeLine(id);
    if (line.chamber !== "dry") {
      throw new Error(`${id} is not in the powder pouch`);
    }
    return { id, name, grams: line.grams };
  });

  const hemp = shared.find((line) => line.id === "hemp");
  const flax = shared.find((line) => line.id === "flax");
  const cacao = shared.find((line) => line.id === "cacao");
  if (!hemp || !flax || !cacao) {
    throw new Error("Powder pouch is missing hemp, flax or cacao");
  }

  return [
    { id: "wpi", name: WPI_LABEL, grams: ATHLETE_STACK.wpiGrams },
    hemp,
    flax,
    cacao,
    { id: "creatine", name: CREATINE_LABEL, grams: CREATINE_GRAMS },
  ];
}

export const OPTIONAL_COLLAGEN_LINE: PouchLine = {
  id: "collagen",
  name: "Collagen peptides",
  grams: COLLAGEN_GRAMS,
  optional: true,
};

export const INGREDIENTS = {
  heading: "Ingredients",
  intro:
    "Each serve is two pouches: frozen fruit and greens in the frozen pouch, Athlete powders in the powder pouch. You combine them when you blend.",
  frozenTitle: "Frozen fruit & greens pouch",
  frozenDeclaration: "Cherries, blueberries, baby spinach.",
  powderTitle: "Powder pouch (Athlete)",
  powderDeclaration:
    "Chocolate whey protein isolate (milk) [whey protein isolate, emulsifier (sunflower lecithin), flavouring (contains cocoa), sweetener (sucralose)], hemp seed protein powder, organic brown flaxseed meal, organic cacao powder, creatine monohydrate.",
  allergensLabel: "Allergens",
  allergens: "Contains milk. May contain gluten, wheat, soy, cashew.",
  caffeine:
    "Cacao contributes a small amount of naturally occurring caffeine (approx. 12 mg per serve, estimate).",
  collagenNote: `Optional +${COLLAGEN_GRAMS} g collagen peptides in the powder pouch. Not included in the ${PROVISIONAL_SERVE_GRAMS} g serve or the panel above.`,
} as const;

export const FSSF_DIRECTIONS = `Blend both pouches with approx. ${MILK_ML} mL milk or fluid. 1 serve per day (one-day quantity). Contains ${CREATINE_GRAMS} g creatine per serve.`;

export const WINS = [
  {
    id: "fresh",
    title: "Two-pouch freshness",
    body: "Frozen produce stays separate from powders until you blend.",
  },
  {
    id: "protein",
    title: "31 g protein / serve",
    body: "Athlete whey on a real-food base.",
  },
  {
    id: "legal",
    title: "Creatine done legally",
    body: "3 g monohydrate, sports-food compliant.",
  },
  {
    id: "cafe",
    title: "Café flavour at home",
    body: "Black Forest profile without the café markup or wait.",
  },
  {
    id: "packs",
    title: `Packs of ${SERVES_PER_PACK} serves, cold chain`,
    body: `Stock the freezer; free shipping over ${formatAud(FREE_SHIPPING_THRESHOLD_CENTS)}.`,
  },
] as const;

export const FAQ = [
  {
    id: "serve",
    q: "What’s in a serve?",
    a: `Two pouches: one frozen fruit & greens, one Athlete powder. Blend both with ~${MILK_ML} mL milk or fluid.`,
  },
  {
    id: "protein",
    q: "How much protein?",
    a: `About **31 g** per serve as sold (provisional). With ${MILK_ML} mL full cream milk, about **41 g** (milk not on the pouch NIP).`,
  },
  {
    id: "why-two",
    q: "Why two pouches?",
    a: "Frozen fruit and greens stay frozen; powders stay dry. You combine them when you blend — better texture, clearer ingredients.",
  },
  {
    id: "creatine",
    q: "Is there creatine?",
    a: `Yes — **${CREATINE_GRAMS} g** creatine monohydrate per serve, within the Australian formulated supplementary sports food daily limit. One serve per day is the one-day quantity.`,
  },
  {
    id: "milk",
    q: "Does it contain milk?",
    a: "Yes. The Athlete powder includes chocolate whey protein isolate. See allergens on the ingredients section.",
  },
  {
    id: "kids",
    q: "Can kids have it?",
    a: "No. Not suitable for children under 15 or pregnant women; use only under medical or dietetic supervision.",
  },
  {
    id: "shake",
    q: "What’s the difference vs a protein shake?",
    a: "You’re blending whole cherries, blueberries, spinach and seeds with the whey and creatine — café-style thickness and flavour, not just powder and water.",
  },
  {
    id: "store",
    q: "How do I store it?",
    a: "Keep frozen.",
  },
  {
    id: "shipping",
    q: "Shipping?",
    a: `Cold-chain. ${formatAud(ORDER_SHIPPING_CENTS)} flat under ${formatAud(FREE_SHIPPING_THRESHOLD_CENTS)} subtotal; free over ${formatAud(FREE_SHIPPING_THRESHOLD_CENTS)}. Toowoomba earlybird free shipping where that rule applies.`,
  },
] as const;

export const ORDER_COPY = {
  title: "Black Forest Powerhouse · Athlete",
  sub: "Easy nutrition, café flavour.",
  collagen: `Collagen +${COLLAGEN_GRAMS} g (+${formatAud(COLLAGEN_CENTS_PER_SERVE)} / serve)`,
  legal:
    "Formulated supplementary sports food · See full nutrition & warnings above",
  noPayment:
    "This places a pilot order. No payment is taken. We will confirm delivery with you.",
  success:
    "Order received. We will be in touch shortly to confirm delivery. No payment was taken.",
} as const;
