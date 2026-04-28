"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { DEAL_BANNERS } from "@/lib/data";

const CATEGORIES = [
  { slug: "deals", label: "Deals", svg: "percent" },
  { slug: "pizza", label: "Pizza", svg: "pizza", primary: true },
  { slug: "fingerfood", label: "Fingerfood", svg: "drumstick" },
  { slug: "desserts", label: "Desserts", svg: "cookie" },
  { slug: "pasta", label: "Pasta", svg: "bowl" },
  { slug: "drinks", label: "Drinks", svg: "drink" },
  { slug: "funny-meal", label: "Funny meal", svg: "gift" },
];

function CatIcon({ name }: { name: string }) {
  // Green-stroke line icons matching brand
  switch (name) {
    case "percent":
      return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="6.5" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="17.5" r="2.5" stroke="currentColor" strokeWidth="2" /><path d="M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
    case "pizza":
      return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3a9 9 0 019 9l-9 9-9-9a9 9 0 019-9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="9" cy="10" r="1.2" fill="currentColor" /><circle cx="14" cy="9" r="1.2" fill="currentColor" /><circle cx="11" cy="14" r="1.2" fill="currentColor" /></svg>;
    case "drumstick":
      return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M16 4a5 5 0 015 5c0 4-5 5-5 5l-1 4-3 1-1-3-3-1 1-3s1-5 5-5a5 5 0 011-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>;
    case "cookie":
      return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3a9 9 0 109 9c0-1-3 1-4-2s-4-1-4-3-1-4 2-4-2-1-3 0z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="9" cy="13" r="1" fill="currentColor" /><circle cx="14" cy="15" r="1" fill="currentColor" /><circle cx="13" cy="10" r="1" fill="currentColor" /></svg>;
    case "bowl":
      return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 11h18a8 8 0 01-8 8h-2a8 8 0 01-8-8z" stroke="currentColor" strokeWidth="1.8" /><path d="M7 8c1-2 3-2 4 0M13 8c1-2 3-2 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
    case "drink":
      return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 4h12l-1 17H7L6 4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M7 9h10" stroke="currentColor" strokeWidth="1.8" /></svg>;
    case "gift":
      return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>;
    default: return null;
  }
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo("[data-cat-pill]", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.04, delay: 0.05 });
      gsap.fromTo("[data-deal-card]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, ease: "expo.out", stagger: 0.08, delay: 0.25 });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="bg-cream pt-6 md:pt-8 pb-10 md:pb-14">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">

        {/* CATEGORY PILLS */}
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 pb-2 scrollbar-thin">
          <div className="flex gap-2.5 md:gap-3 min-w-max md:flex-wrap md:justify-start">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/menu#${c.slug}`}
                data-cat-pill
                className={`group inline-flex items-center gap-2.5 transition rounded-full pl-1.5 pr-5 py-1.5 border ${
                  c.primary
                    ? "bg-green text-cream border-green hover:bg-green-deep"
                    : "bg-paper text-ink hover:bg-green-mist hover:border-green border-line"
                }`}
              >
                <span className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                  c.primary ? "bg-green-deep text-cream" : "bg-green-soft text-green-deep group-hover:bg-paper"
                }`}>
                  <CatIcon name={c.svg} />
                </span>
                <span className="caps text-[0.7rem] tracking-[0.12em] font-bold">{c.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* GREETING */}
        <div className="mt-8 md:mt-10 mb-5 md:mb-6">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="caps-sm text-green-deep mb-2"
          >
            Hi pizzalover
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="display-bold text-ink text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.96] tracking-tight"
          >
            Craving Pizza?
          </motion.h1>
        </div>

        {/* DEAL CARDS */}
        <div className="grid md:grid-cols-3 gap-3 md:gap-4">
          {DEAL_BANNERS.map((d, i) => (
            <article
              key={i}
              data-deal-card
              className="group bg-paper rounded-2xl overflow-hidden border border-line hover:border-green hover:-translate-y-1 transition-all duration-300 lift"
            >
              <div className="relative aspect-[5/4] overflow-hidden" style={{ background: "linear-gradient(135deg, #0e1628 0%, #1a2741 100%)" }}>
                <Image
                  src={d.image}
                  alt={d.title}
                  fill
                  priority={i === 0}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-ink/55 via-transparent to-transparent" />

                <div className="absolute top-4 right-4 bg-yellow text-ink rounded-full w-[68px] h-[68px] md:w-[78px] md:h-[78px] flex items-center justify-center font-black shadow-lg" style={{ fontFamily: "var(--font-display-family)" }}>
                  {d.big.includes(".") ? (
                    <span className="text-2xl md:text-[1.6rem] leading-none flex items-baseline">
                      €{d.big.split(".")[0]}
                      <span className="text-base align-super">.{d.big.split(".")[1]}</span>
                    </span>
                  ) : (
                    <span className="text-2xl md:text-[1.7rem] leading-none">{d.big}</span>
                  )}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <div className="display-bold text-cream text-[clamp(1.4rem,3vw,2.2rem)] leading-[0.94] tracking-tight max-w-[80%]">
                    {d.label}
                  </div>
                  <div className="mt-3 inline-block bg-rood text-cream caps-sm tracking-[0.16em] font-bold px-3 py-1.5 text-[0.65rem]">
                    {d.badge}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-ink font-bold leading-tight text-[0.96rem] mb-1.5">{d.title}</h3>
                <p className="text-ink-mute text-xs leading-relaxed mb-2">{d.sub}</p>
                <div className="flex items-center gap-1.5 caps-xs text-green-deep mb-4 font-bold">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {d.valid}
                </div>
                <button className="w-full bg-green hover:bg-green-deep text-cream rounded-lg py-3 caps text-[0.7rem] tracking-[0.18em] font-bold transition flex items-center justify-center gap-1.5">
                  Redeem
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* TRUST STRIP — green checkmarks */}
        <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-ink-soft text-xs">
          {[
            "Bezorgd in ~28 min",
            "200+ vestigingen",
            "Sinds 1993",
            "iDeal · Apple Pay · Cash",
          ].map((t, i, arr) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-green">
                <circle cx="12" cy="12" r="10" fill="currentColor" />
                <path d="M7 12.5l3.5 3.5L17 9" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-medium">{t}</span>
              {i < arr.length - 1 && <span className="opacity-30 ml-3">·</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
