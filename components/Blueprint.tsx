import { SlidersHorizontal, Truck, Timer, LucideIcon } from "lucide-react";

type Step = {
  number: string;
  icon: LucideIcon;
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    number: "1",
    icon: SlidersHorizontal,
    title: "Pick Your Flavours",
    body: "Browse our five whole-food formulations and choose how many of each you want. Mix and match to build your perfect box.",
  },
  {
    number: "2",
    icon: Truck,
    title: "Configure Your Stack",
    body: "Dial in your Protein, Creatine, Collagen, and more — the same nutrient stack applies to every smoothie in your order.",
  },
  {
    number: "3",
    icon: Timer,
    title: "30-Second Execution",
    body: "Tear the twin-compartment pouch (keeping frozen ingredients and dry powders separated). Dump into your blender, add your fluid, and blend. Zero waste, zero prep.",
  },
];

export default function Blueprint() {
  return (
    <section className="bg-cream-deep px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-4xl font-semibold tracking-tight text-terracotta-dark sm:text-5xl">
          How to order:
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-base text-ink/70">
          Three steps between you and the easiest nutrition of your life.
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
