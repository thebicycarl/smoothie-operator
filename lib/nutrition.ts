import {
  COLLAGEN_GRAMS,
  CREATINE_GRAMS,
  getStack,
  type StackId,
} from "@/lib/order";

/**
 * Estimated nutrition for one Black Forest serve.
 *
 * Figures are calculated from supplier nutrition panels and reference
 * databases. They are not a laboratory analysis of the finished pouch
 * and they are not a nutrition information panel.
 *
 * Shared base per serve:
 * - 50g frozen cherries
 * - 80g frozen blueberries
 * - 8g Macro Wholefoods Market cacao powder
 * - 15g baby spinach (packed in the frozen chamber)
 * - 10g Macro Wholefoods Market hemp seed protein powder
 * - 10g Macro Wholefoods Market brown flaxseed meal
 *
 * The Athlete stack adds 25g Bulk Nutrients chocolate WPI and 3g creatine monohydrate.
 * Collagen, when selected, adds 10g collagen peptides.
 */

type MacroPer100g = {
  protein: number;
  fibre: number;
  fat: number;
};

type Ingredient = {
  id: string;
  name: string;
  grams: number;
  chamber: "frozen" | "dry";
  per100g: MacroPer100g;
};

export type RecipeLine = {
  id: string;
  name: string;
  grams: number;
  chamber: "frozen" | "dry";
  label: string;
};

const SHARED_INGREDIENTS: Ingredient[] = [
  {
    id: "cherries",
    name: "frozen cherries",
    grams: 50,
    chamber: "frozen",
    // USDA SR Legacy, sweet cherries, raw, per 100g. Unsweetened frozen fruit
    // is treated as equivalent for this estimate.
    per100g: { protein: 1.06, fibre: 2.1, fat: 0.2 },
  },
  {
    id: "blueberries",
    name: "frozen blueberries",
    grams: 80,
    chamber: "frozen",
    // USDA frozen unsweetened blueberries, per 100g.
    per100g: { protein: 0.42, fibre: 2.7, fat: 0.64 },
  },
  {
    id: "spinach",
    name: "baby spinach",
    grams: 15,
    chamber: "frozen",
    // USDA raw spinach, per 100g, used as a proxy for baby spinach.
    per100g: { protein: 2.86, fibre: 2.2, fat: 0.39 },
  },
  {
    id: "cacao",
    name: "Macro Wholefoods Market cacao powder",
    grams: 8,
    chamber: "dry",
    // Woolworths Macro Organic Cacao Powder NIP, per 100g.
    per100g: { protein: 22.1, fibre: 27.7, fat: 15.2 },
  },
  {
    id: "hemp",
    name: "Macro Wholefoods Market hemp seed protein powder",
    grams: 10,
    chamber: "dry",
    // Woolworths Macro Hemp Seed Protein Powder NIP, per 100g.
    per100g: { protein: 46.5, fibre: 18.5, fat: 13.2 },
  },
  {
    id: "flax",
    name: "Macro Wholefoods Market brown flaxseed meal",
    grams: 10,
    chamber: "dry",
    // Woolworths Macro Organic Brown Flaxseed Meal NIP, per 100g.
    per100g: { protein: 21.6, fibre: 32.9, fat: 32.6 },
  },
];

/** Bulk Nutrients chocolate WPI panel: 85.0g protein per 100g. Fibre is not declared. */
const WPI_PROTEIN_PER_100G = 85;

/**
 * USDA flaxseed (FDC 169414 / NDB 12012): 22.813g 18:3 n-3 per 100g and
 * 42.16g total lipid per 100g. Applied to the fat declared on the Macro
 * flaxseed meal panel. Literature commonly puts flax oil at about 50-60% ALA.
 */
const FLAX_ALA_FRACTION_POINT = 22.813 / 42.16;
const FLAX_ALA_FRACTION_LOW = 0.5;
const FLAX_ALA_FRACTION_HIGH = 0.6;

/**
 * Hemp oil is commonly about 15-25% alpha-linolenic acid. The Macro hemp
 * protein panel declares fat and not ALA. 0.18 is the point estimate.
 */
const HEMP_ALA_FRACTION_POINT = 0.18;
const HEMP_ALA_FRACTION_LOW = 0.15;
const HEMP_ALA_FRACTION_HIGH = 0.25;

/** Australian full cream milk is commonly about 3.3-3.5g protein per 100ml. */
export const MILK_ML = 300;
const MILK_PROTEIN_PER_100ML_LOW = 3.3;
const MILK_PROTEIN_PER_100ML_HIGH = 3.5;

/**
 * No collagen brand is locked for the pilot. Typical hydrolysed collagen
 * peptide powders are about 90% protein.
 */
const COLLAGEN_PROTEIN_PER_100G = 90;

function scaled(per100g: number, grams: number): number {
  return (per100g * grams) / 100;
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function format1(value: number): string {
  return round1(value).toFixed(1);
}

function format2(value: number): string {
  return (Math.round(value * 100) / 100).toFixed(2);
}

function aboutGrams(low: number, high = low): string {
  const start = Math.round(low);
  const end = Math.round(high);
  if (start === end) return `about ${start}g`;
  return `about ${start}–${end}g`;
}

function sumShared(key: keyof MacroPer100g): number {
  return SHARED_INGREDIENTS.reduce(
    (total, ingredient) => total + scaled(ingredient.per100g[key], ingredient.grams),
    0
  );
}

const sharedProteinGrams = sumShared("protein");
const sharedFibreGrams = sumShared("fibre");

const flax = SHARED_INGREDIENTS.find((item) => item.id === "flax");
const hemp = SHARED_INGREDIENTS.find((item) => item.id === "hemp");
if (!flax || !hemp) {
  throw new Error("Flaxseed meal and hemp protein are required for the ALA estimate");
}

const flaxFatGrams = scaled(flax.per100g.fat, flax.grams);
const hempFatGrams = scaled(hemp.per100g.fat, hemp.grams);

const alaPointGrams =
  flaxFatGrams * FLAX_ALA_FRACTION_POINT + hempFatGrams * HEMP_ALA_FRACTION_POINT;
const alaLowGrams =
  flaxFatGrams * FLAX_ALA_FRACTION_LOW + hempFatGrams * HEMP_ALA_FRACTION_LOW;
const alaHighGrams =
  flaxFatGrams * FLAX_ALA_FRACTION_HIGH + hempFatGrams * HEMP_ALA_FRACTION_HIGH;

const milkProteinLowGrams = scaled(MILK_PROTEIN_PER_100ML_LOW, MILK_ML);
const milkProteinHighGrams = scaled(MILK_PROTEIN_PER_100ML_HIGH, MILK_ML);

export type StackNutrition = {
  id: StackId;
  wpiGrams: number;
  pouchProteinGrams: number;
  withMilkLowGrams: number;
  withMilkHighGrams: number;
  pouchLabel: string;
  withMilkLabel: string;
  pouchDetail: string;
  withMilkDetail: string;
};

function stackNutrition(id: StackId): StackNutrition {
  const stack = getStack(id);
  const wpiProteinGrams = scaled(WPI_PROTEIN_PER_100G, stack.wpiGrams);
  const pouchProteinGrams = sharedProteinGrams + wpiProteinGrams;
  const withMilkLowGrams = pouchProteinGrams + milkProteinLowGrams;
  const withMilkHighGrams = pouchProteinGrams + milkProteinHighGrams;

  return {
    id,
    wpiGrams: stack.wpiGrams,
    pouchProteinGrams,
    withMilkLowGrams,
    withMilkHighGrams,
    pouchLabel: aboutGrams(pouchProteinGrams),
    withMilkLabel: aboutGrams(withMilkLowGrams, withMilkHighGrams),
    pouchDetail: `${format1(pouchProteinGrams)}g`,
    withMilkDetail: `${format1(withMilkLowGrams)}–${format1(withMilkHighGrams)}g`,
  };
}

export const ATHLETE_NUTRITION = stackNutrition("athlete");

export function nutritionForStack(id: StackId): StackNutrition {
  getStack(id);
  return ATHLETE_NUTRITION;
}

const collagenProteinGrams = scaled(COLLAGEN_PROTEIN_PER_100G, COLLAGEN_GRAMS);

export const NUTRITION = {
  fibreGrams: sharedFibreGrams,
  fibreLabel: aboutGrams(sharedFibreGrams),
  fibreDetail: `${format1(sharedFibreGrams)}g`,
  fibreHint: "Estimated from the ingredient list for each serve.",
  alaPointGrams,
  alaLowGrams,
  alaHighGrams,
  alaLabel: aboutGrams(alaPointGrams),
  alaRangeLabel: `about ${format1(alaLowGrams)}–${format1(alaHighGrams)}g`,
  alaHint:
    "Estimated range, mostly from brown flaxseed meal. Milk is not included.",
  collagenProteinGrams,
  collagenProteinLabel: aboutGrams(collagenProteinGrams),
  milkMl: MILK_ML,
  milkAssumption: `Protein with milk uses ${MILK_ML} ml of full cream milk at about ${format1(MILK_PROTEIN_PER_100ML_LOW)}–${format1(MILK_PROTEIN_PER_100ML_HIGH)}g protein per 100 ml. Creatine monohydrate is left out of the protein figures.`,
};

export const SHARED_RECIPE: RecipeLine[] = SHARED_INGREDIENTS.map((ingredient) => ({
  id: ingredient.id,
  name: ingredient.name,
  grams: ingredient.grams,
  chamber: ingredient.chamber,
  label: `${ingredient.grams}g ${ingredient.name}`,
}));

export const WPI_LABEL = "Bulk Nutrients chocolate whey protein isolate";
export const CREATINE_LABEL = "Bulk Nutrients creatine monohydrate";

export const ATHLETE_CREATINE_NOTE = `Creatine is capped at ${CREATINE_GRAMS}g because of Australian food regulations (Food Standards Code Standard 2.9.4 and Schedule 29). Added creatine in a formulated supplementary sports food is limited to ${CREATINE_GRAMS}g in a one-day quantity. Each serve contains ${CREATINE_GRAMS}g creatine monohydrate and ${ATHLETE_NUTRITION.wpiGrams}g chocolate whey protein isolate.`;

export const SPORTS_FOOD_NOTICE = {
  name: "Formulated supplementary sports food",
  diet: "This food is not a sole source of nutrition and should be consumed in conjunction with a nutritious diet.",
  training:
    "This food should be used in conjunction with an appropriate physical training or exercise program.",
  warning:
    "Not suitable for children under 15 years of age or pregnant women: Should only be used under medical or dietetic supervision.",
  directions: `Blend both pouches with about ${MILK_ML} ml of milk or another fluid. Recommended consumption is one serve per day. One serve is the one-day quantity, and it contains ${CREATINE_GRAMS}g of creatine monohydrate.`,
} as const;

export const ALLERGEN_NOTE =
  "Contains milk (whey protein isolate). The hemp seed protein may contain gluten, wheat, soy and cashew. Cacao contributes a small amount of naturally occurring caffeine.";

export const WHEY_COMPOSITION_NOTE =
  "The whey is Bulk Nutrients chocolate whey protein isolate, which includes cocoa, flavour and sucralose. Creatine is Bulk Nutrients creatine monohydrate.";

export const METHODOLOGY_PARAGRAPHS = [
  "These figures are estimates for one serve. They are not a laboratory test of the finished pouches, and they are not a nutrition information panel.",
  `The shared base is ${SHARED_RECIPE.map((line) => line.label).join(", ")}. Fruit values assume unsweetened fruit. Baby spinach uses raw spinach reference data. Cacao, hemp protein and brown flaxseed meal use the Macro Wholefoods Market panels sold at Woolworths.`,
  `Protein per serve adds Bulk Nutrients chocolate whey protein isolate at ${WPI_PROTEIN_PER_100G}g protein per 100g: ${ATHLETE_NUTRITION.wpiGrams}g on the Athlete stack. Calculated protein per serve is ${ATHLETE_NUTRITION.pouchDetail}. ${CREATINE_GRAMS}g creatine monohydrate is in the serve and is not protein, so it is not part of this protein figure.`,
  `Blended with ${MILK_ML} ml full cream milk (${format1(MILK_PROTEIN_PER_100ML_LOW)}–${format1(MILK_PROTEIN_PER_100ML_HIGH)}g protein per 100 ml, about ${format1(milkProteinLowGrams)}–${format1(milkProteinHighGrams)}g), the serve is ${ATHLETE_NUTRITION.withMilkDetail}.`,
  `Dietary fibre calculates to ${NUTRITION.fibreDetail} from the shared base. Milk, the whey isolate and creatine are not added to that figure. It is shown as ${NUTRITION.fibreLabel}.`,
  `ALA is not declared on the Macro flaxseed or hemp panels. Flaxseed meal fat (${format2(flaxFatGrams)}g in the 10g serve) is scaled by the USDA flaxseed ratio of alpha-linolenic acid to total fat (22.813g / 42.16g per 100g, about ${Math.round(FLAX_ALA_FRACTION_POINT * 100)}%), with a 50–60% range. Hemp protein fat (${format2(hempFatGrams)}g) is counted at 15–25% ALA. The point estimate is ${format2(alaPointGrams)}g, so the page says ${NUTRITION.alaLabel}, within an estimated range of ${NUTRITION.alaRangeLabel}. Most of that ALA is from the brown flaxseed meal.`,
  `Collagen, if selected, is ${COLLAGEN_GRAMS}g of collagen peptides. At a typical ${COLLAGEN_PROTEIN_PER_100G}g protein per 100g, that is ${NUTRITION.collagenProteinLabel} of extra protein. Collagen is not a complete protein, and it is not included in the Athlete protein figure above.`,
];
