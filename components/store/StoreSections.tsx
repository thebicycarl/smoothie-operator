import type { ReactNode } from "react";
import Image from "next/image";
import {
  Blender,
  Coffee,
  Dumbbell,
  Leaf,
  Milk,
  PackageOpen,
  ShieldCheck,
  Snowflake,
  Truck,
  type LucideIcon,
} from "lucide-react";
import RichText from "@/components/store/RichText";
import {
  ADD_PACK_CTA,
  BENEFITS,
  BENEFIT_NOTE,
  FAQ,
  FSSF_DIRECTIONS,
  frozenPouchLines,
  HOW_TO,
  INGREDIENTS,
  NUTRITION_PANEL,
  OPTIONAL_COLLAGEN_LINE,
  powderPouchLines,
  PUNCH,
  SEE_NUTRITION_CTA,
  STORE_EYEBROW,
  STORE_H1,
  STORE_MICRO,
  STORE_PRICE_LINE,
  STORE_SUBHEAD,
  STORE_TOP_BAR,
  STORY,
  WINS,
  type PouchLine,
} from "@/lib/storefront-copy";
import { ATHLETE_CREATINE_NOTE, SPORTS_FOOD_NOTICE, WHEY_COMPOSITION_NOTE } from "@/lib/nutrition";

const WIN_ICONS: Record<(typeof WINS)[number]["id"], LucideIcon> = {
  fresh: Snowflake,
  protein: Dumbbell,
  legal: ShieldCheck,
  cafe: Coffee,
  packs: Truck,
};

const STEP_ICONS: Record<(typeof HOW_TO.steps)[number]["id"], LucideIcon> = {
  rip: PackageOpen,
  pour: Milk,
  blend: Blender,
};

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-semibold tracking-tight ${className}`}>
      smoothie<span className="text-amber">operator</span>
    </span>
  );
}

function Accordion({
  items,
}: {
  items: readonly { id: string; title?: string; q?: string; body?: string; a?: string }[];
}) {
  return (
    <div className="divide-y divide-brown/15 rounded-3xl border border-brown/15 bg-cream-card px-5 sm:px-7">
      {items.map((item) => (
        <details key={item.id} className="group">
          <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-display text-lg font-semibold text-terracotta-dark [&::-webkit-details-marker]:hidden">
            <span>{item.title ?? item.q}</span>
            <span
              aria-hidden
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream-deep text-xl leading-none text-terracotta transition duration-300 ease-in-out group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="pb-5 text-sm leading-relaxed text-ink/80 sm:text-base">
            <RichText text={item.body ?? item.a ?? ""} />
          </p>
        </details>
      ))}
    </div>
  );
}

function GramList({ lines }: { lines: PouchLine[] }) {
  return (
    <ul className="mt-4 divide-y divide-brown/10">
      {lines.map((line) => (
        <li key={line.id} className="flex items-baseline justify-between gap-4 py-2 text-sm">
          <span className="text-ink/80">
            {line.optional ? "Optional · " : ""}
            {line.name}
          </span>
          <span className="shrink-0 font-semibold tabular-nums text-terracotta-dark">
            {line.optional ? "+" : ""}
            {line.grams} g
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function StoreSections({
  children,
}: {
  children: ReactNode;
}) {
  const frozen = frozenPouchLines();
  const powder = powderPouchLines();

  return (
    <>
      <div className="sticky top-0 z-40">
        <p className="bg-terracotta px-4 py-2 text-center text-[11px] font-semibold tracking-wide text-cream sm:text-xs">
          {STORE_TOP_BAR}
        </p>
        <header className="border-b border-brown/15 bg-cream/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-8">
            <a href="/store" className="text-xl text-terracotta-dark">
              <Wordmark />
            </a>
            <nav className="flex items-center gap-4 text-sm font-semibold text-terracotta-dark">
              <a href="#nutrition" className="hidden hover:text-terracotta sm:inline">
                Nutrition
              </a>
              <a href="#faq" className="hidden hover:text-terracotta sm:inline">
                FAQ
              </a>
              <a
                href="/"
                className="hidden text-xs font-semibold text-ink/50 hover:text-terracotta-dark sm:inline"
              >
                Pilot home
              </a>
              <a
                href="#order"
                className="inline-flex min-h-[44px] items-center rounded-lg bg-terracotta px-4 text-sm font-bold text-cream transition duration-300 ease-in-out hover:bg-terracotta-dark"
              >
                {ADD_PACK_CTA}
              </a>
            </nav>
          </div>
        </header>
      </div>

      <main>
        <section className="px-5 pb-12 pt-10 sm:px-8 sm:pt-14">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-terracotta">
                {STORE_EYEBROW}
              </p>
              <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight text-terracotta-dark sm:text-6xl">
                {STORE_H1}
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-ink/75 sm:text-lg">
                {STORE_SUBHEAD}
              </p>
              <p className="mt-6 font-display text-3xl font-semibold tabular-nums text-terracotta-dark">
                {STORE_PRICE_LINE}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#order"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-terracotta px-6 text-base font-bold text-cream transition duration-300 ease-in-out hover:bg-terracotta-dark"
                >
                  {ADD_PACK_CTA}
                </a>
                <a
                  href="#nutrition"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg border-2 border-terracotta-dark px-6 text-base font-bold text-terracotta-dark transition duration-300 ease-in-out hover:bg-terracotta-dark hover:text-cream"
                >
                  {SEE_NUTRITION_CTA}
                </a>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {STORE_MICRO.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-cream-deep px-3 py-1.5 text-xs font-semibold text-terracotta-dark"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(63,160,124,0.30)_0%,_transparent_70%)]" />
              <Image
                src="/images/product-hero2.png"
                alt="Black Forest Powerhouse in the Smoothie Operator lineup"
                width={1024}
                height={500}
                priority
                className="relative z-10 h-auto w-full"
              />
            </div>
          </div>
        </section>

        <section aria-label="Per serve" className="bg-terracotta-dark px-5 py-5 text-cream sm:px-8">
          <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-xs font-bold tracking-wide sm:text-sm">
            {PUNCH.map((item, index) => (
              <li key={item} className="flex items-center gap-3">
                <span>{item}</span>
                {index < PUNCH.length - 1 && (
                  <span aria-hidden className="text-cream/40">
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-cream-deep px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit) => (
              <article
                key={benefit.id}
                className="rounded-3xl border border-brown/15 bg-cream-card p-6"
              >
                <h2 className="font-display text-3xl font-semibold leading-tight text-terracotta-dark">
                  {benefit.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{benefit.body}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-ink/60">
            {BENEFIT_NOTE}{" "}
            <a href="#nutrition" className="font-semibold text-terracotta-dark underline">
              See the panel
            </a>
          </p>
        </section>

        <section id="how-to" className="section-anchor px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center font-display text-4xl font-semibold tracking-tight text-terracotta-dark sm:text-5xl">
              {HOW_TO.title}
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {HOW_TO.steps.map((step) => {
                const Icon = STEP_ICONS[step.id];
                return (
                  <article
                    key={step.id}
                    className="rounded-3xl border border-brown/15 bg-cream-card p-6"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-terracotta font-display text-xl font-semibold text-cream">
                        {step.step}
                      </span>
                      <Icon className="h-7 w-7 text-terracotta" strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-semibold text-terracotta-dark">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/75">
                      <RichText text={step.body} />
                    </p>
                  </article>
                );
              })}
            </div>
            <p className="mt-6 text-center text-sm text-ink/60">{HOW_TO.foot}</p>
          </div>
        </section>

        <section className="bg-cream-deep px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-4xl font-semibold tracking-tight text-terracotta-dark sm:text-5xl">
              Why this serve
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink/70">
              Café flavour, built as a formulated supplementary sports food for people who train.
            </p>
            <div className="mt-8">
              <Accordion items={STORY.map((item) => ({ id: item.id, title: item.title, body: item.body }))} />
            </div>
          </div>
        </section>

        <section id="nutrition" className="section-anchor px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-terracotta">
              {NUTRITION_PANEL.badge}
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-terracotta-dark sm:text-5xl">
              {NUTRITION_PANEL.heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">{NUTRITION_PANEL.sub}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{NUTRITION_PANEL.packClarity}</p>

            <table className="mt-6 w-full border-separate border-spacing-0 overflow-hidden rounded-2xl border border-brown/15 text-sm">
              <caption className="sr-only">
                Provisional nutrition information per serve, as sold
              </caption>
              <thead className="bg-cream-deep text-left text-xs font-bold uppercase tracking-wide text-terracotta-dark">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Average quantity
                  </th>
                  <th scope="col" className="px-4 py-3 text-right">
                    Per serve
                  </th>
                </tr>
              </thead>
              <tbody className="bg-cream-card">
                {NUTRITION_PANEL.rows.map((row) => (
                  <tr key={row.id} className="border-t border-brown/10">
                    <th
                      scope="row"
                      className={`px-4 py-2.5 text-left font-medium text-ink ${"sub" in row && row.sub ? "pl-8 font-normal text-ink/70" : ""}`}
                    >
                      {"sub" in row && row.sub ? `– ${row.label}` : row.label}
                    </th>
                    <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-terracotta-dark">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs leading-relaxed text-ink/55">{NUTRITION_PANEL.footnote}</p>

            <aside className="mt-5 rounded-2xl border border-dashed border-brown/30 bg-cream-deep px-4 py-4">
              <p className="text-xs font-bold uppercase tracking-widest text-ink/50">
                Not part of the panel
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">
                <RichText text={NUTRITION_PANEL.milkLine} />
              </p>
            </aside>

            <p
              role="note"
              className="mt-4 rounded-2xl bg-amber/25 px-4 py-3 text-sm leading-relaxed text-terracotta-dark"
            >
              {ATHLETE_CREATINE_NOTE}
            </p>
          </div>
        </section>

        <section id="ingredients" className="section-anchor bg-cream-deep px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h2 className="font-display text-4xl font-semibold tracking-tight text-terracotta-dark sm:text-5xl">
                  {INGREDIENTS.heading}
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/75">
                  {INGREDIENTS.intro}
                </p>
              </div>
              <Image
                src="/images/bf-ing.png"
                alt="Fruit, greens and powders used around the Black Forest blend. Ingredient weights are in the lists."
                width={1024}
                height={1024}
                className="mx-auto h-auto w-full max-w-md"
              />
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              <article className="rounded-3xl border border-brown/15 bg-cream-card p-6">
                <div className="flex items-center gap-2 text-terracotta">
                  <Leaf className="h-5 w-5" strokeWidth={1.75} />
                  <h3 className="font-display text-2xl font-semibold text-terracotta-dark">
                    {INGREDIENTS.frozenTitle}
                  </h3>
                </div>
                <GramList lines={frozen} />
                <p className="mt-4 text-sm leading-relaxed text-ink/70">
                  {INGREDIENTS.frozenDeclaration}
                </p>
              </article>
              <article className="rounded-3xl border border-brown/15 bg-cream-card p-6">
                <div className="flex items-center gap-2 text-sky-dark">
                  <PackageOpen className="h-5 w-5" strokeWidth={1.75} />
                  <h3 className="font-display text-2xl font-semibold text-terracotta-dark">
                    {INGREDIENTS.powderTitle}
                  </h3>
                </div>
                <GramList lines={[...powder, OPTIONAL_COLLAGEN_LINE]} />
                <p className="mt-4 text-sm leading-relaxed text-ink/70">
                  {INGREDIENTS.powderDeclaration}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-ink/55">{WHEY_COMPOSITION_NOTE}</p>
                <p className="mt-3 text-xs leading-relaxed text-ink/55">{INGREDIENTS.collagenNote}</p>
              </article>
            </div>

            <div className="mt-6 rounded-3xl border border-brown/15 bg-cream-card p-6 text-sm leading-relaxed text-ink/80">
              <p>
                <span className="font-semibold text-terracotta-dark">{INGREDIENTS.allergensLabel}: </span>
                {INGREDIENTS.allergens}
              </p>
              <p className="mt-2">{INGREDIENTS.caffeine}</p>
              <p className="mt-4 font-semibold text-terracotta-dark">{SPORTS_FOOD_NOTICE.name}.</p>
              <p className="mt-2 font-semibold">{SPORTS_FOOD_NOTICE.warning}</p>
              <p className="mt-2">{SPORTS_FOOD_NOTICE.diet}</p>
              <p className="mt-2">{SPORTS_FOOD_NOTICE.training}</p>
              <p className="mt-2">{FSSF_DIRECTIONS}</p>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-4xl font-semibold tracking-tight text-terracotta-dark sm:text-5xl">
              Why it wins
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {WINS.map((card) => {
                const Icon = WIN_ICONS[card.id];
                return (
                  <article
                    key={card.id}
                    className="rounded-3xl border border-brown/15 bg-cream-card p-6"
                  >
                    <Icon className="h-7 w-7 text-terracotta" strokeWidth={1.75} />
                    <h3 className="mt-4 font-display text-xl font-semibold text-terracotta-dark">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/75">{card.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="faq" className="section-anchor bg-cream-deep px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-4xl font-semibold tracking-tight text-terracotta-dark sm:text-5xl">
              FAQ
            </h2>
            <div className="mt-8">
              <Accordion items={FAQ.map((item) => ({ id: item.id, q: item.q, a: item.a }))} />
            </div>
          </div>
        </section>

        {children}
      </main>

      <footer className="bg-terracotta-dark px-5 pb-28 pt-10 text-cream sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <Wordmark className="text-xl text-cream" />
          <a href="/" className="text-xs font-semibold text-amber hover:text-cream">
            Athlete pilot
          </a>
          <span className="text-xs text-cream/70">© 2026 SMOOTHIE OPERATOR</span>
        </div>
      </footer>
    </>
  );
}
