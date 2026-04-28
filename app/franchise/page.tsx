"use client";

import { useState } from "react";

const PERKS = [
  { title: "Bewezen formule", text: "33 jaar groei, 200+ vestigingen, kant-en-klaar systeem." },
  { title: "Franchise-support", text: "Van locatie-keuze tot crew-training — wij ondersteunen elke stap." },
  { title: "Marketing-engine", text: "Landelijke campagnes, app-aanwas, member-database." },
  { title: "Levenslang deeg-recept", text: "Onze signature 24u-gerust deeg — alleen voor franchisenemers." },
];

export default function FranchisePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="bg-green text-cream py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="caps-sm text-yellow mb-2">Franchise</div>
            <h1 className="display-bold text-[clamp(2.4rem,6vw,6rem)] leading-[0.94]">
              Word ondernemer.{" "}
              <span className="text-yellow">Met onze formule.</span>
            </h1>
            <p className="mt-6 text-cream/85 text-base md:text-lg leading-relaxed max-w-xl">
              33 jaar pizza-knowhow, een sterk merk en een trouwe member-database — vanaf
              €120k investering. We zoeken altijd nieuwe locaties.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <h2 className="display text-3xl md:text-5xl mb-7 max-w-xl">
              Wat krijg je?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {PERKS.map((p, i) => (
                <article key={p.title} className="bg-paper border border-line rounded-2xl p-6">
                  <div className="mono text-green-deep text-sm mb-3">0{i + 1}</div>
                  <div className="display text-xl mb-2">{p.title}</div>
                  <p className="text-ink-soft text-sm leading-relaxed">{p.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-paper rounded-3xl border border-line p-7 sticky top-32">
              <div className="caps-sm text-green-deep mb-3">Doe een aanvraag</div>
              <h3 className="display text-2xl mb-5">Laat ons weten wie je bent.</h3>

              {submitted ? (
                <div className="bg-green-mist border border-green text-green-deep rounded-2xl p-5 text-center">
                  <div className="text-3xl mb-2">✓</div>
                  <div className="display text-xl mb-1">Bedankt!</div>
                  <div className="text-sm">We bellen je binnen 2 werkdagen.</div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="space-y-3"
                >
                  <Field label="Naam" value={name} onChange={setName} required />
                  <Field label="E-mail" type="email" value={email} onChange={setEmail} required />
                  <Field label="Telefoon" type="tel" value={phone} onChange={setPhone} required />
                  <Field label="Voorkeursstad" value={city} onChange={setCity} placeholder="Bijv. Utrecht" required />

                  <button
                    type="submit"
                    className="w-full bg-green hover:bg-green-deep text-cream rounded-full py-3.5 caps text-[0.66rem] tracking-[0.16em] font-bold transition lift-green"
                  >
                    Aanvraag versturen →
                  </button>
                  <p className="caps-xs text-ink-mute text-center mt-2">🔒 We bellen je binnen 2 werkdagen</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, value, onChange, type = "text", required, placeholder }:
  { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <label className="block">
      <span className="caps-xs text-ink-mute mb-1.5 block">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-line bg-cream focus:border-green outline-none text-sm"
      />
    </label>
  );
}
