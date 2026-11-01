import { Leaf, Package, Timer, type LucideIcon } from "lucide-react";
import {
  COLLAGEN_CENTS_PER_SERVE,
  COLLAGEN_GRAMS,
  CREATINE_GRAMS,
  formatAud,
  SERVES_PER_PACK,
  STACKS,
} from "@/lib/order";
import { MILK_ML } from "@/lib/nutrition";

const everyday = STACKS[0];
const athlete = STACKS[1];

type Step = {
  number: string;
  icon: LucideIcon;
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    number: "1",
    icon: Leaf,
    title: "Choose your stack",
    body: `Black Forest Powerhouse only. Everyday is ${everyday.wpiGrams}g of chocolate whey protein isolate. Athlete is ${athlete.wpiGrams}g. Both include ${CREATINE_GRAMS}g of creatine monohydrate.`,
  },
  {
    number: "2",
    icon: Package,
    title: "Add packs of five",
    body: `Each pack is ${SERVES_PER_PACK} serves. Order one pack or more. Collagen peptides are optional: +${COLLAGEN_GRAMS}g and +${formatAud(COLLAGEN_CENTS_PER_SERVE)} per serve.`,
  },
  {
    number: "3",
    icon: Timer,
    title: "Blend in 30 seconds",
    body: `Tear the twin-compartment pouch, tip the frozen chamber and the dry powders into a blender, add about ${MILK_ML} ml of milk or the fluid you like, and blend.`,
  },
];

export default function Blueprint() {
  return (
    <section className="bg-cream-deep px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-4xl font-semibold tracking-tight text-terracotta-dark sm:text-5xl">
          How to order
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-base text-ink/70">
          One flavour, two stacks, packs of five.
        </p>

        <div className="mt-14 flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-6">
          {steps.map(({ number, icon: Icon, title, body }) => (
            <div
              key={number}
              className="relative rounded-3xl border border-brown/15 bg-cream-card p-7 pt-10 transition duration-300 ease-in-out hover:-translate-y-1"
            >
              <span className="absolute -top-5 left-7 flex h-12 w-12 items-center justify-center rounded-full bg-terracotta font-display text-2xl font-semibold text-cream shadow-md">
                {number}
              </span>
              <Icon className="h-9 w-9 text-terracotta" strokeWidth={1.75} />
              <h3 className="mt-4 font-display text-2xl font-semibold text-terracotta-dark">
                {title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
