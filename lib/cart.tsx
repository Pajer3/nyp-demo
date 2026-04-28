"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo, type ReactNode } from "react";

export type CartItem = {
  id: string;       // pizza slug or product id
  name: string;
  image: string;
  price: number;    // numeric
  qty: number;
  base?: string;    // crust
  notes?: string;
};

type Order = {
  id: string;
  items: CartItem[];
  subtotal: number;
  delivery: number;
  total: number;
  createdAt: string;
  postcode?: string;
  type: "bezorgen" | "afhalen";
  estMinutes: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  delivery: number;
  total: number;
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  placeOrder: (info: { type: "bezorgen" | "afhalen"; postcode?: string }) => Order;
  getOrder: (id: string) => Order | undefined;
};

const CartContext = createContext<CartContextValue | null>(null);

const KEY = "nyp_cart";
const ORDERS_KEY = "nyp_orders";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* ignore */ }
  }, [items]);

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
  const delivery = subtotal > 0 ? (subtotal >= 20 ? 0 : 2.5) : 0;
  const total = subtotal + delivery;
  const count = items.reduce((s, i) => s + i.qty, 0);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...item, qty }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      remove(id);
      return;
    }
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));
  }, [remove]);

  const clear = useCallback(() => setItems([]), []);

  const placeOrder = useCallback((info: { type: "bezorgen" | "afhalen"; postcode?: string }) => {
    const order: Order = {
      id: "NYP" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      items: [...items],
      subtotal,
      delivery,
      total,
      createdAt: new Date().toISOString(),
      postcode: info.postcode,
      type: info.type,
      estMinutes: info.type === "bezorgen" ? 28 : 15,
    };
    try {
      const all = JSON.parse(localStorage.getItem(ORDERS_KEY) || "{}");
      all[order.id] = order;
      localStorage.setItem(ORDERS_KEY, JSON.stringify(all));
    } catch { /* ignore */ }
    setItems([]);
    return order;
  }, [items, subtotal, delivery, total]);

  const getOrder = useCallback((id: string): Order | undefined => {
    try {
      const all = JSON.parse(localStorage.getItem(ORDERS_KEY) || "{}");
      return all[id];
    } catch { return undefined; }
  }, []);

  return (
    <CartContext.Provider value={{ items, count, subtotal, delivery, total, open, setOpen, add, remove, setQty, clear, placeOrder, getOrder }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart outside CartProvider");
  return ctx;
}
