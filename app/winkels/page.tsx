"use client";

import Link from "next/link";
import { useState } from "react";
import { STORES_PREVIEW } from "@/lib/data";

const ALL_STORES = [
  ...STORES_PREVIEW,
  "Haarlem", "Leiden", "Zwolle", "Maastricht", "Hilversum", "Amstelveen",
  "Zaandam", "Alkmaar", "Hoorn", "Heerhugowaard", "Purmerend", "Lelystad",
  "Dordrecht", "Gouda", "Delft", "Rijswijk", "Capelle aan den IJssel",
];

export default function WinkelsPage() {
  const [q, setQ] = useState("");
  const filtered = ALL_STORES.filter((s) => s.toLowerCase().includes(q.toLowerCase()));

  return (
    <section className="bg-cream py-10 md:py-14 min-h-[60vh]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="caps-sm text-green-deep mb-2">Vestigingen</div>
        <h1 className="display-bold text-ink text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.96] mb-3">
          200+ vestigingen.{" "}
          <span className="text-green-deep">Vind ééntje bij jou.</span>
        </h1>
        <p className="text-ink-mute mb-7 max-w-xl">
          Type een plaats of postcode — we tonen direct de dichtstbijzijnde NYP.
        </p>

        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Zoek plaats of postcode"
          className="w-full max-w-xl px-5 py-4 rounded-full border border-line bg-paper focus:border-green outline-none mb-8 text-base"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((s) => (
            <Link
              key={s}
              href={`/winkels/${s.toLowerCase().replace(/\s+/g, "-")}`}
              className="group bg-paper rounded-2xl border border-line hover:border-green hover:-translate-y-0.5 transition-all p-5"
            >
              <div className="caps-xs text-green-deep mb-1">Vestiging</div>
              <div className="display text-xl group-hover:text-green-deep transition">{s}</div>
              <div className="text-xs text-ink-mute mt-2">Open · ~28 min bezorging →</div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-ink-mute">Geen vestigingen gevonden voor &ldquo;{q}&rdquo;.</div>
        )}
      </div>
    </section>
  );
}
