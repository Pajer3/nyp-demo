"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { eur } from "@/lib/format";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, delivery, total, placeOrder } = useCart();
  const { user, addPoints, recordOrder } = useAuth();
  const [type, setType] = useState<"bezorgen" | "afhalen">("bezorgen");
  const [postcode, setPostcode] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("Amsterdam");
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState("");
  const [pay, setPay] = useState("ideal");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (items.length === 0 && !submitting) router.replace("/winkelmand");
  }, [items.length, submitting, router]);

  useEffect(() => {
    if (user) { setName(user.name); setEmail(user.email); }
  }, [user]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const order = placeOrder({ type, postcode });
    if (user) {
      // Earn 1 point per €1
      addPoints(Math.floor(order.total));
      recordOrder(order.id);
    }
    await new Promise((r) => setTimeout(r, 600));
    router.replace(`/bestelling/${order.id}`);
  }

  return (
    <section className="bg-cream py-10 md:py-14 min-h-[60vh]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="caps-sm text-green-deep mb-2">Afrekenen</div>
        <h1 className="display-bold text-ink text-[clamp(2.2rem,4vw,4rem)] leading-[0.96] mb-8">
          Bijna klaar.
        </h1>

        <form onSubmit={onSubmit} className="grid lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8 space-y-5">

            <div className="bg-paper rounded-3xl border border-line p-6">
              <div className="caps-sm text-green-deep mb-3">1. Bezorgen of afhalen?</div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setType("bezorgen")}
                  className={`flex-1 rounded-full py-3 caps text-[0.65rem] font-bold transition ${
                    type === "bezorgen" ? "bg-green text-cream" : "bg-cream text-ink border border-line hover:border-green"
                  }`}
                >
                  Bezorgen · ~28 min
                </button>
                <button
                  type="button"
                  onClick={() => setType("afhalen")}
                  className={`flex-1 rounded-full py-3 caps text-[0.65rem] font-bold transition ${
                    type === "afhalen" ? "bg-green text-cream" : "bg-cream text-ink border border-line hover:border-green"
                  }`}
                >
                  Afhalen · ~15 min
                </button>
              </div>
            </div>

            <div className="bg-paper rounded-3xl border border-line p-6">
              <div className="caps-sm text-green-deep mb-3">2. Jouw gegevens</div>
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Naam" value={name} onChange={setName} required />
                <Field label="E-mail" type="email" value={email} onChange={setEmail} required />
                <Field label="Telefoon" type="tel" value={phone} onChange={setPhone} placeholder="06 12345678" required />
                {type === "bezorgen" && (
                  <>
                    <Field label="Postcode" value={postcode} onChange={setPostcode} placeholder="1012 AB" required />
                    <Field label="Straat + huisnr" value={street} onChange={setStreet} className="sm:col-span-2" required />
                    <Field label="Plaats" value={city} onChange={setCity} required />
                  </>
                )}
              </div>
            </div>

            <div className="bg-paper rounded-3xl border border-line p-6">
              <div className="caps-sm text-green-deep mb-3">3. Betaling</div>
              <div className="grid sm:grid-cols-3 gap-2">
                {[
                  { v: "ideal", l: "iDeal" },
                  { v: "applepay", l: "Apple Pay" },
                  { v: "cash", l: "Contant" },
                ].map((p) => (
                  <button
                    key={p.v}
                    type="button"
                    onClick={() => setPay(p.v)}
                    className={`rounded-xl py-3 caps text-[0.65rem] font-bold transition border ${
                      pay === p.v ? "bg-green text-cream border-green" : "bg-cream text-ink border-line hover:border-green"
                    }`}
                  >
                    {p.l}
                  </button>
                ))}
              </div>
            </div>

            {!user && (
              <div className="bg-yellow/30 border border-yellow rounded-2xl p-4 text-sm">
                💡 Log in en verdien {Math.floor(total)} pizzapunten voor deze bestelling.{" "}
                <Link href="/login" className="text-green-deep font-bold underline">Inloggen</Link>
                {" of "}
                <Link href="/register" className="text-green-deep font-bold underline">aanmelden</Link>.
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-paper rounded-3xl border border-line p-6 sticky top-32">
              <div className="caps-sm text-green-deep mb-4">Overzicht</div>

              <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                {items.map((it) => (
                  <div key={it.id} className="flex items-center gap-3 text-sm">
                    <div className="relative w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-green-soft">
                      <Image src={it.image} alt="" fill sizes="48px" className="object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold truncate">{it.name}</div>
                      <div className="text-ink-mute text-xs">{it.qty}× {eur(it.price)}</div>
                    </div>
                    <div className="mono font-bold text-sm">{eur(it.price * it.qty)}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-3 border-t border-line">
                <div className="flex justify-between text-sm">
                  <span className="text-ink-mute">Subtotaal</span>
                  <span className="mono font-bold">{eur(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink-mute">Bezorging</span>
                  <span className={`mono font-bold ${delivery === 0 ? "text-green-deep" : ""}`}>
                    {type === "afhalen" ? "Afhalen" : delivery === 0 ? "Gratis" : eur(delivery)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between pt-3 border-t border-line my-4">
                <span className="display text-lg">Totaal</span>
                <span className="display text-lg text-green-deep">
                  {eur(type === "afhalen" ? subtotal : total)}
                </span>
              </div>

              {user && (
                <div className="bg-green-mist text-green-deep caps-xs px-3 py-2 rounded-lg mb-4 font-bold">
                  + {Math.floor(type === "afhalen" ? subtotal : total)} pizzapunten
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-green hover:bg-green-deep text-cream rounded-full py-3.5 caps text-[0.66rem] font-bold tracking-[0.16em] transition disabled:opacity-60 lift-green"
              >
                {submitting ? "Bestelling plaatsen..." : "Bevestig & betaal →"}
              </button>
              <p className="caps-xs text-ink-mute text-center mt-3">🔒 Demo · geen echte betaling</p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = "text", required, placeholder, className = "" }:
  { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string; className?: string }) {
  return (
    <label className={`block ${className}`}>
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
