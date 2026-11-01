import { COMING_SOON_FLAVORS, AVAILABLE_FLAVOR } from "@/lib/flavors";
import {
  ATHLETE_STACK,
  CREATINE_GRAMS,
  formatAud,
  SERVES_PER_PACK,
} from "@/lib/order";
import {
  ALLERGEN_NOTE,
  METHODOLOGY_PARAGRAPHS,
  NUTRITION,
  SHARED_RECIPE,
  WHEY_COMPOSITION_NOTE,
} from "@/lib/nutrition";

function RecipeColumn({
  title,
  chamber,
}: {
  title: string;
  chamber: "frozen" | "dry";
}) {
  const lines = SHARED_RECIPE.filter((line) => line.chamber === chamber);

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-terracotta">
        {title}
      </p>
      <ul className="mt-2 space-y-1 text-sm text-ink/80">
        {lines.map((line) => (
          <li key={line.id}>{line.label}</li>
        ))}
      </ul>
    </div>
  );
}

export default function FlavorMenu() {
  return (
    <section id="menu" className="section-anchor py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="font-display text-4xl font-semibold tracking-tight text-terracotta-dark sm:text-5xl">
          {AVAILABLE_FLAVOR.name}.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70">
          The only flavour on sale for the pilot. Cherries, blueberries, cacao,
          baby spinach, hemp seed protein and brown flaxseed meal, finished as
          the Athlete stack. More flavours are on the way, and they are not for
          sale yet.
        </p>

        <article className="mt-10 rounded-3xl border border-brown/15 bg-cream-card p-6 sm:p-8">
          <span className="inline-block rounded-full bg-amber/25 px-2.5 py-1 text-xs font-bold text-terracotta-dark">
            On sale · {formatAud(ATHLETE_STACK.priceCents)}/serve · packs of{" "}
            {SERVES_PER_PACK} · {formatAud(ATHLETE_STACK.priceCents * SERVES_PER_PACK)}
          </span>
          <h3 className="mt-4 font-display text-3xl font-semibold text-terracotta-dark">
            {AVAILABLE_FLAVOR.name}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70">
            A whole-food base with chocolate whey and creatine on top. The
            fibre and the ALA come from the fruit, spinach, cacao, hemp and
            flaxseed meal.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <RecipeColumn title="Frozen chamber" chamber="frozen" />
            <RecipeColumn title="Dry chamber" chamber="dry" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink/70">
            {WHEY_COMPOSITION_NOTE} Each serve adds {ATHLETE_STACK.wpiGrams}g of
            that whey and {CREATINE_GRAMS}g creatine monohydrate.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-cream-deep px-4 py-3">
              <p className="font-display text-2xl font-semibold text-terracotta-dark">
                {NUTRITION.fibreLabel}
              </p>
              <p className="text-sm font-semibold text-ink">Fibre per serve</p>
              <p className="mt-1 text-xs leading-relaxed text-ink/60">
                {NUTRITION.fibreHint}
              </p>
            </div>
            <div className="rounded-2xl bg-cream-deep px-4 py-3">
              <p className="font-display text-2xl font-semibold text-terracotta-dark">
                {NUTRITION.alaLabel}
              </p>
              <p className="text-sm font-semibold text-ink">
                ALA per serve
              </p>
              <p className="mt-1 text-xs leading-relaxed text-ink/60">
                {NUTRITION.alaHint} Shown range: {NUTRITION.alaRangeLabel}.
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink/70">
            {ALLERGEN_NOTE}
          </p>

          <details className="mt-4 rounded-2xl border border-brown/15 bg-cream px-4 py-3">
            <summary className="cursor-pointer text-sm font-semibold text-terracotta-dark">
              How these numbers were estimated
            </summary>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink/70">
              {METHODOLOGY_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </details>

          <a
            href="#configurator"
            className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-terracotta px-6 text-sm font-bold text-cream transition duration-300 ease-in-out hover:bg-terracotta-dark"
          >
            Order Athlete
          </a>
        </article>

        <div className="mt-14">
          <h3 className="font-display text-3xl font-semibold text-terracotta-dark">
            More flavours coming soon
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/70">
            These blends are not available to order. Black Forest Powerhouse is
            the only flavour in this pilot.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COMING_SOON_FLAVORS.map((flavor) => (
              <div
                key={flavor.id}
                className="rounded-3xl border border-dashed border-brown/25 bg-cream-card/70 p-5"
              >
                <span className="inline-block rounded-full bg-cream-deep px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink/60">
                  Coming soon
                </span>
                <h4 className="mt-3 font-display text-xl font-semibold text-terracotta-dark">
                  {flavor.name}
                </h4>
                {flavor.teaser && (
                  <p className="mt-2 text-sm text-ink/60">{flavor.teaser}</p>
                )}
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink/50">
                  Not for sale
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
