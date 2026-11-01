import { SPORTS_FOOD_NOTICE } from "@/lib/nutrition";

export default function SportsFoodNotice({
  tone = "ink",
}: {
  tone?: "ink" | "cream";
}) {
  const cream = tone === "cream";
  const text = cream ? "text-cream/90" : "text-ink/80";
  const heading = cream ? "text-cream" : "text-terracotta-dark";
  const border = cream ? "border-cream/30 bg-cream/10" : "border-brown/20 bg-cream-card";

  return (
    <aside
      aria-label="Sports food advisory"
      className={`rounded-2xl border px-4 py-4 text-sm leading-relaxed ${border} ${text}`}
    >
      <p className={`text-xs font-bold uppercase tracking-widest ${heading}`}>
        {SPORTS_FOOD_NOTICE.name}
      </p>
      <p className="mt-2">{SPORTS_FOOD_NOTICE.diet}</p>
      <p className="mt-2">{SPORTS_FOOD_NOTICE.training}</p>
      <p className={`mt-3 font-semibold ${heading}`}>
        {SPORTS_FOOD_NOTICE.warning}
      </p>
      <p className="mt-3">{SPORTS_FOOD_NOTICE.directions}</p>
    </aside>
  );
}
