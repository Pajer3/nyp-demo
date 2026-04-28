"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { eur } from "@/lib/format";

const STAGES = [
  { key: "received", label: "Ontvangen", icon: "📩" },
  { key: "making", label: "We rollen je pizza", icon: "👨‍🍳" },
  { key: "oven", label: "In de oven", icon: "🔥" },
  { key: "delivery", label: "Onderweg", icon: "🛵" },
  { key: "delivered", label: "Geleverd", icon: "✓" },
];

export default function OrderPage() {
  const params = useParams<{ id: string }>();
  const { getOrder } = useCart();
  const [order, setOrder] = useState<ReturnType<typeof getOrder>>();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (params.id) setOrder(getOrder(params.id));
  }, [params.id, getOrder]);

  // Simulate progress
  useEffect(() => {
    if (!order) return;
    const stages = order.type === "bezorgen" ? 5 : 4;
    const interval = setInterval(() => {
      setStage((s) => Math.min(stages - 1, s + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [order]);

  if (!order) {
    return (
      <section className="bg-cream py-20 min-h-[60vh] flex items-center">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="text-4xl mb-3">🤔</div>
          <h1 className="display text-3xl mb-2">Bestelling niet gevonden</h1>
          <p className="text-ink-mute mb-6">Misschien is de link verlopen.</p>
          <Link href="/menu" className="bg-green hover:bg-green-deep text-cream rounded-full px-6 py-3 caps text-[0.66rem] font-bold inline-block transition">
            Naar het menu
          </Link>
        </div>
      </section>
    );
  }

  const visibleStages = order.type === "bezorgen" ? STAGES : STAGES.filter((s) => s.key !== "delivery");

  return (
    <section className="bg-cream py-10 md:py-14 min-h-[60vh]">
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">

        {/* Hero */}
        <div className="bg-green text-cream rounded-3xl p-8 md:p-10 mb-6 lift-green">
          <div className="caps-xs opacity-80 mb-2">Bestelling #{order.id}</div>
          <h1 className="display-bold text-[clamp(2rem,4vw,3.6rem)] leading-[0.96] mb-3">
            Bedankt voor je bestelling!
          </h1>
          <p className="text-cream/85 text-base md:text-lg">
            Je {order.type === "bezorgen" ? "krijgt 'm bezorgd" : "kan 'm afhalen"} over ongeveer{" "}
            <span className="bg-yellow text-ink px-2 rounded font-bold">{order.estMinutes} min</span>.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-5">

          {/* TRACKING */}
          <div className="lg:col-span-7 bg-paper rounded-3xl border border-line p-7">
            <div className="caps-sm text-green-deep mb-4">Live status</div>
            <div className="space-y-3">
              {visibleStages.map((s, i) => {
                const done = i < stage;
                const active = i === stage;
                return (
                  <div key={s.key} className={`flex items-center gap-4 p-3 rounded-2xl transition ${
                    active ? "bg-green-mist border border-green" : done ? "opacity-70" : "opacity-40"
                  }`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                      active ? "bg-green text-cream animate-pulse" : done ? "bg-green-soft text-green-deep" : "bg-bone text-ink-mute"
                    }`}>
                      {done ? "✓" : s.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`display text-lg ${active ? "text-green-deep" : ""}`}>{s.label}</div>
                      {active && (
                        <div className="text-xs text-ink-mute">Bezig...</div>
                      )}
                    </div>
                    {done && <span className="caps-xs text-green-deep font-bold">Klaar</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* SUMMARY */}
          <div className="lg:col-span-5 bg-paper rounded-3xl border border-line p-7">
            <div className="caps-sm text-green-deep mb-4">Overzicht</div>
            <div className="space-y-2 mb-4">
              {order.items.map((it) => (
                <div key={it.id} className="flex items-center gap-3 text-sm">
                  <div className="relative w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-green-soft">
                    <Image src={it.image} alt="" fill sizes="48px" className="object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold truncate">{it.name}</div>
                    <div className="text-ink-mute text-xs">{it.qty}×</div>
                  </div>
                  <div className="mono font-bold text-sm">{eur(it.price * it.qty)}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2 pt-3 border-t border-line">
              <div className="flex justify-between text-sm">
                <span className="text-ink-mute">Subtotaal</span>
                <span className="mono font-bold">{eur(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink-mute">Bezorging</span>
                <span className={`mono font-bold ${order.delivery === 0 ? "text-green-deep" : ""}`}>
                  {order.delivery === 0 ? "Gratis" : eur(order.delivery)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-line">
                <span className="display text-lg">Betaald</span>
                <span className="display text-lg text-green-deep">{eur(order.total)}</span>
              </div>
            </div>

            <div className="mt-6 grid gap-2">
              <Link href="/menu" className="bg-green hover:bg-green-deep text-cream rounded-full py-3 caps text-[0.62rem] font-bold text-center transition">
                Bestel weer →
              </Link>
              <Link href="/account" className="bg-cream hover:bg-green-mist text-ink rounded-full py-3 caps text-[0.62rem] font-bold text-center border border-line hover:border-green transition">
                Mijn account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
