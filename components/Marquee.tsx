const ITEMS = [
  "Vrijdag = pizzapunten dubbel",
  "Members eten goedkoper",
  "Bezorgd in ~28 min",
  "Sinds 1993",
  "200+ vestigingen",
  "Onze eigen sauzen",
  "It's the dough.",
];

export default function Marquee() {
  const seq = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="bg-green text-cream py-3 overflow-hidden border-y-2 border-green-deep">
      <div className="flex gap-12 marquee whitespace-nowrap">
        {seq.map((it, i) => (
          <span key={i} className="display text-lg md:text-xl flex items-center gap-12 tracking-tight">
            {it}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-yellow">
              <path d="M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4L8 13.5 3 9l6.5-.5L12 2z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
