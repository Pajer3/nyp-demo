"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { eur } from "@/lib/format";

export default function WinkelmandPage() {
  const { items, subtotal, delivery, total, setQty, remove } = useCart();

  return (
    <section className="bg-cream py-10 md:py-14 min-h-[60vh]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="caps-sm text-green-deep mb-2">Winkelmand</div>
        <h1 className="display-bold text-ink text-[clamp(2.2rem,4vw,4rem)] leading-[0.96] mb-8">
          Jouw bestelling
        </h1>

        {items.length === 0 ? (
          <div className="bg-paper rounded-3xl border border-line p-10 text-center">
            <div className="text-4xl mb-3">🍕</div>
            <div className="display text-2xl mb-2">Je winkelmand is leeg</div>
            <p className="text-ink-mute mb-7">Voeg een pizza toe om verder te gaan.</p>
            <Link href="/menu" className="inline-block bg-green hover:bg-green-deep text-cream rounded-full px-7 py-3.5 caps text-[0.66rem] font-bold transition">
              Naar het menu →
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-5">
            <div className="lg:col-span-8 space-y-3">
              {items.map((it) => (
                <article key={it.id} className="bg-paper rounded-2xl border border-line p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden bg-green-soft">
                    <Image src={it.image} alt={it.name} fill loading="lazy" sizes="80px" className="object-contain p-1.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="display text-base sm:text-lg leading-tight line-clamp-1">{it.name}</div>
                    <div className="mono text-green-deep font-bold text-sm mt-0.5">{eur(it.price)}</div>
                    <div className="flex items-center gap-1.5 bg-cream border border-line rounded-full p-1 mt-2 w-fit sm:hidden">
                      <button onClick={() => setQty(it.id, it.qty - 1)} className="w-7 h-7 rounded-full hover:bg-green-soft transition">−</button>
                      <span className="mono w-6 text-center text-sm font-bold">{it.qty}</span>
                      <button onClick={() => setQty(it.id, it.qty + 1)} className="w-7 h-7 rounded-full bg-green text-cream hover:bg-green-deep transition">+</button>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 bg-cream border border-line rounded-full p-1">
                    <button onClick={() => setQty(it.id, it.qty - 1)} className="w-8 h-8 rounded-full hover:bg-green-soft transition">−</button>
                    <span className="mono w-6 text-center font-bold">{it.qty}</span>
                    <button onClick={() => setQty(it.id, it.qty + 1)} className="w-8 h-8 rounded-full bg-green text-cream hover:bg-green-deep transition">+</button>
                  </div>
                  <button onClick={() => remove(it.id)} className="text-ink-mute hover:text-rood transition shrink-0 w-9 h-9 flex items-center justify-center" aria-label="Verwijder">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </article>
              ))}
              <Link href="/menu" className="caps-xs text-green-deep hover:underline font-bold inline-block mt-3">
                + Meer toevoegen
              </Link>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-paper rounded-3xl border border-line p-6 sticky top-32">
                <div className="caps-sm text-green-deep mb-4">Overzicht</div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-ink-mute">Subtotaal</span>
                    <span className="mono font-bold">{eur(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-ink-mute">Bezorging</span>
                    <span className={`mono font-bold ${delivery === 0 ? "text-green-deep" : ""}`}>
                      {delivery === 0 ? "Gratis" : eur(delivery)}
                    </span>
                  </div>
                </div>
                {delivery > 0 && (
                  <div className="text-xs bg-green-mist text-green-deep rounded-lg px-3 py-2 mb-4">
                    Nog {eur(20 - subtotal)} voor gratis bezorging
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-line mb-5">
                  <span className="display text-lg">Totaal</span>
                  <span className="display text-lg text-green-deep">{eur(total)}</span>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full bg-green hover:bg-green-deep text-cream rounded-full py-3.5 caps text-[0.66rem] font-bold tracking-[0.16em] text-center transition lift-green"
                >
                  Naar afrekenen →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
