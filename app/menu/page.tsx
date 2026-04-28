"use client";

import Image from "next/image";
import { Suspense, useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { PIZZAS } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { priceToNumber, eur } from "@/lib/format";
import { CatIcon } from "@/components/CatIcon";

const CATEGORIES = [
  { slug: "all", label: "Alles", svg: "all" },
  { slug: "pizza", label: "Pizza", svg: "pizza" },
  { slug: "fingerfood", label: "Fingerfood", svg: "drumstick" },
  { slug: "desserts", label: "Desserts", svg: "cookie" },
  { slug: "drinks", label: "Drinks", svg: "drink" },
];

const SIDES = [
  { slug: "dough-dippers", name: "Dough Dippers", desc: "Krokante deeg-strips met saus", price: 5.49, image: "/assets/products/large_Advertisement_card_1134x754_dough_dippers_571680cfda.png", cat: "fingerfood" },
  { slug: "chicken-fingers", name: "Chicken Fingers", desc: "Knapperige kipreepjes", price: 5.99, image: "/assets/products/large_Advertisement_card_1134x754_4_member_chickenfingers_locked_8ff6b1e38a.jpg", cat: "fingerfood" },
  { slug: "garlic-bread", name: "Garlic Bread", desc: "Vers gebakken knoflookbrood", price: 4.49, image: "/assets/products/Coupon_201_Gratis_Garlic_Bread_bij_bestelling_201_30_0016a99fd6.png", cat: "fingerfood" },
  { slug: "hotdog", name: "VAPA Hotdog", desc: "Knapperige hotdog, eigen recept", price: 6.49, image: "/assets/products/large_30184_VAPA_v1_Hotdog_2_1134_x_754_35bcf67c1f.png", cat: "fingerfood" },
  { slug: "dessert-breads", name: "Dessert Breads", desc: "Zoete deeg-rolletjes met chocolade", price: 5.99, image: "/assets/products/large_31024_Dessert_breads_v4_1134_x_1402_32548944d1.png", cat: "desserts" },
  { slug: "cookie", name: "Cookie", desc: "Warme chocolade-cookie", price: 2.99, image: "/assets/products/gratiscookie1_726bf1b19a.jpg", cat: "desserts" },
];

export default function MenuPage() {
  return (
    <Suspense fallback={<section className="bg-cream py-20 text-center text-ink-mute">Even laden...</section>}>
      <MenuInner />
    </Suspense>
  );
}

const VALID_CATS = ["all", "pizza", "fingerfood", "desserts", "drinks"];

function MenuInner() {
  const sp = useSearchParams();
  const initial = sp.get("cat");
  const [active, setActive] = useState(initial && VALID_CATS.includes(initial) ? initial : "all");
  const { add } = useCart();

  useEffect(() => {
    const cat = sp.get("cat");
    if (cat && VALID_CATS.includes(cat)) setActive(cat);
  }, [sp]);

  const items = useMemo(() => {
    const allItems = [
      ...PIZZAS.map((p) => ({ ...p, cat: "pizza", price: priceToNumber(p.price) })),
      ...SIDES,
    ];
    return active === "all" ? allItems : allItems.filter((i) => i.cat === active);
  }, [active]);

  const total = PIZZAS.length + SIDES.length;

  return (
    <section className="bg-cream pt-8 pb-20 min-h-[calc(100vh-var(--nav-h,72px))]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="mb-8">
          <div className="caps-sm text-green-deep mb-2">Het hele menu</div>
          <h1 className="display-bold text-ink text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.96] tracking-tight">
            {active === "all" ? `${total} producten.` : `${items.length} ${items.length === 1 ? "product" : "producten"}.`}{" "}
            <span className="text-green-deep">Eén tap = in winkelmand.</span>
          </h1>
        </div>

        <LayoutGroup id="menu-cats">
          <div className="flex gap-2 mb-8 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-thin">
            {CATEGORIES.map((c) => {
              const a = active === c.slug;
              return (
                <button
                  key={c.slug}
                  onClick={() => setActive(c.slug)}
                  className={`relative inline-flex items-center gap-2 transition rounded-full pl-1.5 pr-5 py-1.5 border whitespace-nowrap shrink-0 active:scale-[0.97] ${
                    a ? "border-green" : "bg-paper border-line hover:border-green"
                  }`}
                >
                  {a && (
                    <motion.span
                      layoutId="menu-cat-pill"
                      className="absolute inset-0 bg-green rounded-full"
                      transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                    />
                  )}
                  <span className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center transition ${
                    a ? "bg-green-deep text-cream" : "bg-green-soft text-green-deep"
                  }`}>
                    <CatIcon name={c.svg} />
                  </span>
                  <span className={`relative z-10 caps text-[0.66rem] tracking-[0.12em] font-bold ${a ? "text-cream" : "text-ink"}`}>
                    {c.label}
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <AnimatePresence mode="wait">
          {items.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-paper border border-line rounded-3xl p-10 md:p-16 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-green-soft text-green-deep flex items-center justify-center mb-5">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M21 21l-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div className="display text-2xl md:text-3xl mb-2">Niks in deze categorie — nog.</div>
              <p className="text-ink-mute text-sm md:text-base max-w-md mx-auto mb-6">
                We werken er nog aan. Check ondertussen onze pizza&apos;s of fingerfood — daar zit het hart van de menukaart.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setActive("pizza")}
                  className="bg-green hover:bg-green-deep text-cream rounded-full px-6 py-3 caps text-[0.62rem] font-bold transition"
                >
                  Bekijk pizza&apos;s →
                </button>
                <button
                  onClick={() => setActive("all")}
                  className="bg-cream border border-line hover:border-green text-ink rounded-full px-6 py-3 caps text-[0.62rem] font-bold transition"
                >
                  Toon hele menu
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
            >
              {items.map((p) => (
                <article
                  key={p.slug}
                  id={p.slug}
                  className="group bg-paper rounded-2xl border border-line hover:border-green hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="relative aspect-square bg-green-soft overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-contain p-3 md:p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                    {"tag" in p && typeof p.tag === "string" && (
                      <span className="absolute top-2 left-2 caps-xs bg-green text-cream px-2 py-1 rounded-full text-[0.55rem] font-bold">
                        {p.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="display text-base md:text-lg leading-tight tracking-tight mb-1 line-clamp-1 text-ink">{p.name}</h3>
                    <div className="text-ink-mute text-[0.7rem] line-clamp-2 leading-snug mb-3">
                      {"desc" in p && typeof p.desc === "string" ? p.desc : ""}
                    </div>
                    <div className="flex items-baseline justify-between gap-2 mb-3">
                      <span className="mono text-green-deep font-bold text-sm">{eur(p.price)}</span>
                    </div>
                    <button
                      onClick={() => add({ id: p.slug, name: p.name, image: p.image, price: p.price })}
                      className="w-full bg-green hover:bg-green-deep text-cream rounded-full py-2 caps text-[0.6rem] tracking-[0.16em] font-bold transition"
                    >
                      + Toevoegen
                    </button>
                  </div>
                </article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
