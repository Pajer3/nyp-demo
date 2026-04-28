"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { PIZZAS } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { priceToNumber } from "@/lib/format";

const FILTERS = [
  { slug: "all", label: "Alles" },
  { slug: "new", label: "Nieuw" },
  { slug: "popular", label: "Populair" },
  { slug: "veggie", label: "Veggie" },
];

export default function PizzaGrid() {
  const ref = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<string>("all");
  const { add } = useCart();

  const filtered = filter === "all"
    ? PIZZAS
    : PIZZAS.filter((p) =>
        filter === "new" ? p.tag === "Nieuw"
        : filter === "popular" ? p.tag === "Populair"
        : filter === "veggie" ? ["margherita","caprese","4-cheese","hawaii"].includes(p.slug)
        : true,
      );

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-pizza-card]",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        },
      );
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="bg-cream py-14 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7 md:mb-9">
          <div>
            <div className="caps-sm text-green-deep mb-2">Onze pizza&apos;s · sinds 1993</div>
            <h2 className="display-bold text-ink text-[clamp(2rem,4.5vw,4rem)] leading-[0.96]">
              Vers gemaakt. <span className="text-green-deep">Bij jou bezorgd.</span>
            </h2>
          </div>
          <Link href="/menu" className="caps text-[0.66rem] inline-flex items-center gap-2 text-green-deep hover:text-ink transition self-start md:self-end">
            Hele menu →
          </Link>
        </div>

        {/* Filter pills */}
        <LayoutGroup id="pizza-filter">
          <div className="flex gap-2 mb-7 overflow-x-auto pb-1 scrollbar-thin">
            {FILTERS.map((f) => {
              const active = filter === f.slug;
              return (
                <button
                  key={f.slug}
                  onClick={() => setFilter(f.slug)}
                  className={`relative caps text-[0.66rem] px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    active ? "text-cream" : "text-ink-soft hover:text-ink bg-paper border border-line"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="pizza-filter-pill"
                      className="absolute inset-0 bg-green rounded-full"
                      transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{f.label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
          >
            {filtered.map((p) => (
              <article
                key={p.slug}
                data-pizza-card
                className="group bg-paper rounded-2xl border border-line hover:border-green hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <Link href={`/menu#${p.slug}`} className="block">
                  <div className="relative aspect-square bg-green-soft overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-contain p-3 md:p-4 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-500"
                    />
                    {p.tag && (
                      <span className="absolute top-2 left-2 caps-xs bg-green text-cream px-2 py-1 rounded-full text-[0.55rem] font-bold">
                        {p.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="display text-base md:text-lg leading-tight tracking-tight mb-1.5 line-clamp-1 text-ink">{p.name}</h3>
                    <div className="flex items-baseline justify-between gap-2 mb-3">
                      <span className="text-ink-mute text-[0.7rem] line-clamp-1">{p.desc.split(",")[0]}</span>
                      <span className="mono text-green-deep font-bold whitespace-nowrap text-sm">{p.price}</span>
                    </div>
                  </div>
                </Link>
                <div className="px-4 pb-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      add({ id: p.slug, name: p.name, image: p.image, price: priceToNumber(p.price) });
                    }}
                    className="w-full bg-green hover:bg-green-deep text-cream rounded-full py-2 caps text-[0.6rem] tracking-[0.16em] font-bold transition flex items-center justify-center gap-1.5"
                  >
                    + Toevoegen
                  </button>
                </div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
