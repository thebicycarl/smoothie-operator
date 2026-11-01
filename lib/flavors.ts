export type Flavor = {
  id: string;
  name: string;
  available: boolean;
  /** Ingredient teaser for flavours that are not on sale. */
  teaser?: string;
};

export const AVAILABLE_FLAVOR: Flavor = {
  id: "black-forest-powerhouse",
  name: "Black Forest Powerhouse",
  available: true,
};

export const COMING_SOON_FLAVORS: Flavor[] = [
  {
    id: "ultimate-green-fuel",
    name: "Ultimate Green Fuel",
    available: false,
    teaser: "Pineapple, banana, spinach",
  },
  {
    id: "pb-j-antioxidant-bomb",
    name: "PB & J Antioxidant Bomb",
    available: false,
    teaser: "Blueberries, raspberries, banana",
  },
  {
    id: "salted-caramel-energiser",
    name: "Salted Caramel Energiser",
    available: false,
    teaser: "Banana, dates",
  },
  {
    id: "sunrise-flame",
    name: "Sunrise Flame",
    available: false,
    teaser: "Peach, mango, ginger",
  },
];

export const FLAVORS: Flavor[] = [AVAILABLE_FLAVOR, ...COMING_SOON_FLAVORS];

export function getFlavorById(id: string): Flavor | undefined {
  return FLAVORS.find((flavor) => flavor.id === id);
}
