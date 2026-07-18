const messages = [
  "Order online · cold-chain delivery to your door",
  "Free shipping on orders over $150",
  "Pick your flavours · customise your stack",
  "Now shipping across Sydney",
];

export default function AnnouncementBar() {
  // Duplicate the list so the marquee can loop seamlessly (-50% = one full set).
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
