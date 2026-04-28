"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/lib/cart";
import { eur } from "@/lib/format";

export default function CartDrawer() {
  const { items, count, open, setOpen, subtotal, delivery, total, setQty, remove } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-ink/50 z-[60]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-paper z-[61] flex flex-col"
          >
            {/* Header */}
            <div className="bg-green text-cream px-5 py-4 flex items-center justify-between">
              <div>
                <div className="caps-xs opacity-80">Jouw bestelling</div>
                <div className="display text-xl">{count} {count === 1 ? "item" : "items"}</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Sluiten"
                className="w-9 h-9 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center transition"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
              </button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-3">
                <div className="w-20 h-20 rounded-full bg-green-soft flex items-center justify-center text-green-deep text-3xl">🍕</div>
                <div className="display text-2xl">Nog leeg</div>
                <p className="text-ink-mute text-sm max-w-[28ch]">
                  Voeg een pizza of side toe om te beginnen — bezorgen kost niets vanaf €20.
                </p>
                <Link
                  href="/menu"
                  onClick={() => setOpen(false)}
                  className="mt-3 bg-green hover:bg-green-deep text-cream rounded-full px-6 py-3 caps text-[0.66rem] font-bold transition"
                >
                  Naar het menu →
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-2.5">
                  {items.map((it) => (
                    <article key={it.id} className="bg-cream rounded-2xl p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 border border-line">
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-lg overflow-hidden bg-green-soft">
                        <Image src={it.image} alt={it.name} fill sizes="64px" className="object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-ink text-sm leading-tight line-clamp-1">{it.name}</div>
                        <div className="mono text-green-deep font-bold text-sm mt-0.5">{eur(it.price)}</div>
                        <div className="flex items-center gap-1.5 bg-paper border border-line rounded-full p-1 mt-1.5 w-fit">
                          <button
                            onClick={() => setQty(it.id, it.qty - 1)}
                            className="w-6 h-6 rounded-full hover:bg-green-soft text-ink-soft hover:text-green-deep transition flex items-center justify-center"
                            aria-label="Min"
                          >−</button>
                          <span className="mono w-5 text-center text-xs font-bold">{it.qty}</span>
                          <button
                            onClick={() => setQty(it.id, it.qty + 1)}
                            className="w-6 h-6 rounded-full bg-green text-cream hover:bg-green-deep transition flex items-center justify-center"
                            aria-label="Plus"
                          >+</button>
                        </div>
                      </div>
                      <button
                        onClick={() => remove(it.id)}
                        className="text-ink-mute hover:text-rood transition shrink-0 w-9 h-9 flex items-center justify-center"
                        aria-label="Verwijder"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </button>
                    </article>
                  ))}
                </div>

                <div className="border-t border-line bg-paper p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-ink-mute">Subtotaal</span>
                    <span className="mono font-bold">{eur(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-ink-mute">Bezorgkosten</span>
                    <span className={`mono font-bold ${delivery === 0 ? "text-green-deep" : ""}`}>
                      {delivery === 0 ? "Gratis" : eur(delivery)}
                    </span>
                  </div>
                  {delivery > 0 && (
                    <div className="text-xs text-green-deep bg-green-mist rounded-lg px-3 py-2">
                      Nog {eur(20 - subtotal)} en de bezorging is gratis
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-line">
                    <span className="display text-lg">Totaal</span>
                    <span className="display text-lg text-green-deep">{eur(total)}</span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={() => setOpen(false)}
                    className="w-full bg-green hover:bg-green-deep text-cream rounded-full py-3.5 caps text-[0.66rem] tracking-[0.16em] font-bold transition flex items-center justify-center gap-2 lift-green"
                  >
                    Naar afrekenen →
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
