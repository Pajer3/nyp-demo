"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const HOURS = [
  { day: "Maandag", label: "12:00 — 22:00" },
  { day: "Dinsdag", label: "12:00 — 22:00" },
  { day: "Woensdag", label: "12:00 — 22:00" },
  { day: "Donderdag", label: "12:00 — 23:00" },
  { day: "Vrijdag", label: "12:00 — 23:00", featured: true },
  { day: "Zaterdag", label: "12:00 — 23:00" },
  { day: "Zondag", label: "13:00 — 22:00" },
];

export default function StoreCityPage() {
  const params = useParams<{ city: string }>();
  const city = decodeURIComponent(params.city || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <section className="bg-cream py-10 md:py-14 min-h-[60vh]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <Link href="/winkels" className="caps-xs text-green-deep hover:underline font-bold mb-4 inline-block">
          ← Alle winkels
        </Link>

        <div className="caps-sm text-green-deep mb-2">Vestiging</div>
        <h1 className="display-bold text-ink text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.96] mb-3">
          New York Pizza{" "}
          <span className="text-green-deep">{city}</span>
        </h1>

        <div className="grid lg:grid-cols-12 gap-5 mt-8">
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-paper rounded-3xl border border-line p-7">
              <div className="caps-sm text-green-deep mb-3">Adres &amp; bereikbaarheid</div>
              <div className="display text-xl mb-1">Hoofdstraat 1, {city}</div>
              <div className="text-ink-mute text-sm mb-4">Vlakbij centrum · Gratis parkeren tot 200m</div>
              <div className="flex flex-wrap gap-2">
                <a className="bg-green hover:bg-green-deep text-cream rounded-full px-5 py-2.5 caps text-[0.62rem] font-bold transition">
                  Routebeschrijving →
                </a>
                <a className="bg-cream border border-line hover:border-green text-ink rounded-full px-5 py-2.5 caps text-[0.62rem] font-bold transition">
                  Bel: 020 1234567
                </a>
              </div>
            </div>

            <div className="bg-paper rounded-3xl border border-line p-7">
              <div className="caps-sm text-green-deep mb-3">Bezorggebied</div>
              <div className="text-ink-soft mb-4">
                Wij bezorgen in <span className="font-bold">{city}</span> en omliggende wijken.
                Gemiddelde bezorgtijd: <span className="text-green-deep font-bold">~28 min</span>.
              </div>
              <Link href="/menu" className="bg-green hover:bg-green-deep text-cream rounded-full px-6 py-3 caps text-[0.62rem] font-bold inline-block transition">
                Bestel hier →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-paper rounded-3xl border border-line p-7 sticky top-32">
              <div className="caps-sm text-green-deep mb-4">Openingstijden</div>
              <div className="space-y-2.5">
                {HOURS.map((h) => (
                  <div key={h.day} className={`flex justify-between pb-2 border-b border-line last:border-0 text-sm ${h.featured ? "text-green-deep font-bold" : ""}`}>
                    <span>{h.day}</span>
                    <span className="mono">{h.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-line caps-xs text-ink-mute">
                ✓ iDeal · Apple Pay · Cash &nbsp;·&nbsp; ✓ Member-deals beschikbaar
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
