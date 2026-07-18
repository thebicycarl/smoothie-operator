export type Flavor = {
  id: string;
  name: string;
  frozen: string[];
  dry: string[];
  nutrients: string[];
  backgroundImage?: string;
};

export const FLAVORS: Flavor[] = [
  {
    id: "ultimate-green-fuel",
    name: "Ultimate Green Fuel",
    frozen: ["Pineapple", "Banana", "Spinach"],
    dry: ["Spirulina", "Hemp Seeds"],
    nutrients: [
      "Iron",
      "Potassium",
      "Complete Amino Acids",
      "Vitamin A",
      "Vitamin K",
      "Omega-3 & 6",
    ],
  },
  {
    id: "pb-j-antioxidant-bomb",
    name: "PB & J Antioxidant Bomb",
    frozen: ["Blueberries", "Raspberries", "Banana"],
    dry: ["Chia", "Linseeds", "Powdered Peanut Butter"],
    nutrients: [
      "Antioxidants",
      "Protein",
      "Calcium",
      "Manganese",
      "Vitamin C",
      "Omega-3",
    ],
  },
  {
    id: "salted-caramel-energiser",
    name: "Salted Caramel Energiser",
    frozen: ["Banana", "Medjool Dates"],
    dry: ["Maca", "Linseeds", "Almond Butter", "Sea Salt"],
    nutrients: ["Fibre", "Protein", "Electrolytes", "Potassium", "Zinc"],
  },
  {
    id: "sunrise-flame",
    name: "Sunrise Flame",
    frozen: ["Peaches", "Mango", "Fresh Ginger"],
    dry: ["Turmeric", "Black Pepper", "Hemp", "Chia"],
    nutrients: [
      "High Vitamin C",
      "Curcumin",
      "Anti-Inflammatory",
      "Beta-Carotene",
    ],
  },
  {
    id: "black-forest-powerhouse",
    name: "Black Forest Powerhouse",
    frozen: ["Blackberries", "Blueberries", "Spinach"],
    dry: ["Cacao Powder", "Linseeds", "Hemp"],
    nutrients: ["Anthocyanins", "High Fibre", "Magnesium", "Iron", "Nitrates"],
  },
];

export const FLAVOR_IDS = FLAVORS.map((f) => f.id);

export function getFlavorById(id: string): Flavor | undefined {
  return FLAVORS.find((f) => f.id === id);
}
