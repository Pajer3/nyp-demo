"use client";

import Image from "next/image";
import Link from "next/link";
import { DEAL_BANNERS } from "@/lib/data";

const MORE_DEALS = [
  { title: "Vrijdag = pizzapunten dubbel", desc: "Iedere vrijdag krijg je 2× punten op je hele bestelling.", badge: "Members", image: "/assets/products/large_Member_pizza_frisdrank_locked_dda1cb88a8.jpg" },
  { title: "Gratis cookie bij 1e bestelling", desc: "Speciaal voor nieuwe klanten — meld je aan en ontvang een gratis cookie.", badge: "Welkom", image: "/assets/products/gratiscookie1_726bf1b19a.jpg" },
  { title: "Old Amsterdam pizza", desc: "Ontdek onze nieuwste topping samen met Old Amsterdam.", badge: "Nieuw", image: "/assets/products/large_Brandbox_O_Co_Desktop_1718_x_480_old_amsterdam_7a973b0cb5.png" },
  { title: "Ham & Kaas combo", desc: "Iconische combo voor nostalgische pizza-liefhebbers.", badge: "Comeback", image: "/assets/products/large_Brandbox_O_Co_Desktop_1718_x_480_ham_kaas_0a89571eef.png" },
];

export default function ActiesPage() {
  return (
    <section className="bg-cream py-10 md:py-14 min-h-[60vh]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="caps-sm text-green-deep mb-2">Acties &amp; deals</div>
        <h1 className="display-bold text-ink text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.96] mb-7">
          Iedere week een{" "}
          <span className="text-green-deep">reden om te bestellen.</span>
        </h1>

        {/* Coupon-style deals */}
        <div className="grid md:grid-cols-3 gap-3 md:gap-4 mb-10">
          {DEAL_BANNERS.map((d, i) => (
            <article key={i} className="bg-paper rounded-2xl overflow-hidden border border-line lift">
              <div className="relative aspect-[5/4]" style={{ background: "linear-gradient(135deg, #0e1628 0%, #1a2741 100%)" }}>
                <Image src={d.image} alt={d.title} fill loading="lazy" sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-85" />
                <div className="absolute inset-0 bg-gradient-to-tr from-ink/55 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-yellow text-ink rounded-full w-[68px] h-[68px] flex items-center justify-center font-black" style={{ fontFamily: "var(--font-display-family)" }}>
                  {d.big.includes(".") ? <span className="text-2xl flex items-baseline">€{d.big.split(".")[0]}<span className="text-base align-super">.{d.big.split(".")[1]}</span></span> : <span className="text-2xl">{d.big}</span>}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="display-bold text-cream text-xl leading-[0.94] mb-2">{d.label}</div>
                  <div className="inline-block bg-rood text-cream caps-sm px-3 py-1.5 text-[0.6rem] font-bold">{d.badge}</div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-ink mb-1 text-sm">{d.title}</h3>
                <p className="text-ink-mute text-xs mb-3">{d.sub}</p>
                <Link href="/menu" className="block w-full bg-green hover:bg-green-deep text-cream rounded-lg py-2.5 caps text-[0.66rem] font-bold transition text-center">
                  Redeem →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* More deals */}
        <h2 className="display text-3xl md:text-4xl mb-5">Nog meer acties</h2>
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {MORE_DEALS.map((d, i) => (
            <article key={i} className="group bg-paper rounded-2xl border border-line hover:border-green overflow-hidden flex">
              <div className="relative w-24 sm:w-32 md:w-40 shrink-0 bg-green-soft">
                <Image src={d.image} alt={d.title} fill loading="lazy" sizes="160px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 sm:p-5 flex-1 min-w-0">
                <span className="caps-xs bg-green-mist text-green-deep px-2 py-1 rounded-full font-bold">{d.badge}</span>
                <div className="display text-base sm:text-lg leading-tight mt-2 mb-1">{d.title}</div>
                <p className="text-ink-mute text-xs leading-relaxed line-clamp-3">{d.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
