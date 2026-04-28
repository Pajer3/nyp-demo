"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { eur } from "@/lib/format";
import { REWARDS } from "@/lib/data";
import Image from "next/image";

export default function AccountPage() {
  return (
    <Suspense fallback={<section className="bg-cream py-20 text-center text-ink-mute">Even laden...</section>}>
      <AccountInner />
    </Suspense>
  );
}

function AccountInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const welcome = sp.get("welcome") === "1";
  const { user, loading, logout } = useAuth();
  const { getOrder } = useCart();
  const [orders, setOrders] = useState<ReturnType<typeof getOrder>[]>([]);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (user) setOrders(user.orders.map((id) => getOrder(id)).filter(Boolean));
  }, [user, getOrder]);

  if (loading || !user) return (
    <section className="bg-cream py-20 text-center text-ink-mute">Even laden...</section>
  );

  const tier = user.points >= 500 ? "Gold" : user.points >= 200 ? "Silver" : "Green";
  const nextReward = REWARDS.find((r) => r.points > user.points) ?? REWARDS[REWARDS.length - 1];
  const progress = nextReward ? Math.min(100, Math.round((user.points / nextReward.points) * 100)) : 100;

  return (
    <section className="bg-cream py-10 md:py-14 min-h-[60vh]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {welcome && (
          <div className="bg-green text-cream rounded-2xl p-5 mb-6 flex items-center gap-4 lift-green">
            <span className="text-3xl">🎉</span>
            <div>
              <div className="display text-xl">Welkom, {user.name}!</div>
              <div className="text-sm text-cream/85">Je 100 welkomspunten staan al klaar.</div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-6">
          {/* PROFILE CARD */}
          <div className="lg:col-span-5 bg-green text-cream rounded-3xl p-7 lift-green">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-cream text-green-deep flex items-center justify-center display text-3xl">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="display text-2xl">{user.name}</div>
                <div className="caps-xs opacity-80">{user.email}</div>
              </div>
            </div>

            <div className="bg-cream/10 rounded-2xl p-5 backdrop-blur-sm border border-cream/15">
              <div className="flex items-baseline justify-between mb-3">
                <div>
                  <div className="caps-xs opacity-70">Pizzapunten</div>
                  <div className="display text-4xl mt-0.5">{user.points}</div>
                </div>
                <div className="bg-yellow text-ink caps-xs px-3 py-1 rounded-full font-bold">
                  {tier} member
                </div>
              </div>

              {nextReward && nextReward.points > user.points && (
                <>
                  <div className="text-xs text-cream/85 mb-2">
                    Nog {nextReward.points - user.points} punten voor: <span className="font-bold">{nextReward.name}</span>
                  </div>
                  <div className="h-2 bg-cream/15 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <Link href="/menu" className="bg-cream text-green-deep rounded-xl py-3 text-center caps text-[0.62rem] font-bold hover:bg-yellow transition">
                Bestel weer
              </Link>
              <button onClick={() => { logout(); router.push("/"); }} className="border border-cream/30 rounded-xl py-3 caps text-[0.62rem] font-bold hover:bg-cream/10 transition">
                Uitloggen
              </button>
            </div>
          </div>

          {/* REWARD LADDER */}
          <div className="lg:col-span-7 bg-paper rounded-3xl border border-line p-7">
            <div className="caps-sm text-green-deep mb-3">Verzilver punten</div>
            <h2 className="display text-2xl md:text-3xl mb-5">Wat kan je krijgen?</h2>
            <div className="grid grid-cols-2 gap-3">
              {REWARDS.map((r) => {
                const can = user.points >= r.points;
                return (
                  <div key={r.points} className={`relative rounded-2xl p-3 border transition ${can ? "border-green bg-green-mist" : "border-line bg-cream"}`}>
                    <div className="relative aspect-[5/4] rounded-lg overflow-hidden bg-paper mb-3">
                      <Image src={r.image} alt={r.name} fill sizes="50vw" className={`object-contain p-2 ${can ? "" : "grayscale opacity-60"}`} />
                    </div>
                    <div className="display text-base">{r.name}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`caps-xs px-2 py-0.5 rounded-full ${can ? "bg-green text-cream" : "bg-bone text-ink-mute"}`}>{r.points}p</span>
                      {can ? (
                        <button className="caps-xs text-green-deep hover:underline font-bold">Verzilver →</button>
                      ) : (
                        <span className="caps-xs text-ink-mute">Nog {r.points - user.points}p</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ORDER HISTORY */}
          <div className="lg:col-span-12 bg-paper rounded-3xl border border-line p-7">
            <div className="flex items-baseline justify-between mb-5">
              <div>
                <div className="caps-sm text-green-deep mb-2">Bestelhistorie</div>
                <h2 className="display text-2xl md:text-3xl">Vorige bestellingen</h2>
              </div>
              <Link href="/menu" className="caps-xs text-green-deep hover:underline font-bold">Bestel weer →</Link>
            </div>

            {orders.length === 0 ? (
              <div className="bg-cream rounded-2xl p-8 text-center">
                <div className="text-3xl mb-2">📭</div>
                <div className="display text-lg mb-1">Nog geen bestellingen</div>
                <div className="text-ink-mute text-sm mb-5">Plaats je eerste en kom hier alles tracken.</div>
                <Link href="/menu" className="inline-block bg-green hover:bg-green-deep text-cream rounded-full px-6 py-3 caps text-[0.62rem] font-bold transition">
                  Naar het menu
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {orders.map((o) => o && (
                  <Link
                    key={o.id}
                    href={`/bestelling/${o.id}`}
                    className="block bg-cream hover:bg-green-mist rounded-2xl p-4 border border-line hover:border-green transition"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="caps-xs text-ink-mute">{new Date(o.createdAt).toLocaleString("nl-NL")}</div>
                        <div className="display text-base mt-0.5">#{o.id}</div>
                        <div className="text-xs text-ink-mute">{o.items.length} items · {o.type}</div>
                      </div>
                      <div className="text-right">
                        <div className="mono font-bold text-green-deep">{eur(o.total)}</div>
                        <div className="caps-xs text-ink-mute mt-1">Bekijk →</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
