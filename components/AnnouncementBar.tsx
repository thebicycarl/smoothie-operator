import {
  COLLAGEN_CENTS_PER_SERVE,
  formatAud,
  FREE_SHIPPING_THRESHOLD_CENTS,
  STACKS,
} from "@/lib/order";

const everyday = STACKS[0];
const athlete = STACKS[1];

const messages = [
  "Pilot flavour: Black Forest Powerhouse",
  `Everyday ${formatAud(everyday.priceCents)} · Athlete ${formatAud(athlete.priceCents)} per serve`,
  `Packs of 5 · collagen +${formatAud(COLLAGEN_CENTS_PER_SERVE)}`,
  `Free shipping over ${formatAud(FREE_SHIPPING_THRESHOLD_CENTS)}`,
  "Toowoomba earlybird: free shipping",
  "More flavours coming soon",
];

export default function AnnouncementBar() {
  const loop = [...messages, ...messages];

  return (
    <div className="overflow-hidden bg-terracotta text-cream">
      <div className="flex w-max animate-marquee whitespace-nowrap py-2 text-xs font-semibold tracking-wide sm:text-sm">
        {loop.map((msg, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6">{msg}</span>
            <span aria-hidden className="text-cream/50">
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
