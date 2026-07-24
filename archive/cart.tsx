import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  image: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "cf_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, ready]);

  const add: CartCtx["add"] = (item) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { ...item, qty: 1 }];
    });
  };
  const remove: CartCtx["remove"] = (id) => setItems((p) => p.filter((i) => i.id !== id));
  const setQty: CartCtx["setQty"] = (id, qty) =>
    setItems((p) => p.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  return <Ctx.Provider value={{ items, add, remove, setQty, clear, count, total }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}

export const WHATSAPP_NUMBER = "201000000000"; // placeholder — owner should update

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function cartToWhatsAppMessage(items: CartItem[], total: number) {
  const lines = [
    "السلام عليكم 👋",
    "حابب أعمل أوردر من City Fragrance:",
    "",
    ...items.map((i, idx) => `${idx + 1}. ${i.nameAr} (${i.name}) × ${i.qty} — ${i.price * i.qty} EGP`),
    "",
    `الإجمالي: ${total} EGP`,
  ];
  return lines.join("\n");
}
