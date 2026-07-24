import { useState, useMemo, useEffect } from "react";
import {
  ShoppingBag, MessageCircle, MapPin, Trash2, Plus, Minus,
  Sparkles
} from "lucide-react";
import heroImg from "./assets/hero-fragrance.jpg";
import storeImg from "./assets/store-interior.jpg";
import logo from "./assets/logo.png";
import { PRODUCTS, FILTERS, type Category, type Product } from "./lib/products";

const ADDRESS_AR = "بنها الفلل، شارع الحرمين، أمام صيدلية العماوي";
const INSTAGRAM = "https://instagram.com/city_fragrance_";

type CartItem = Product & { qty: number };

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filter, setFilter] = useState<Category | "all">("all");
  const [showCart, setShowCart] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.qty * (i.discount ? Math.round(i.price * 0.9) : i.price), 0);

  const addToCart = (p: Product) => {
    const price = p.discount ? Math.round(p.price * 0.9) : p.price;
    setCart((prev) => {
      const existing = prev.find((x) => x.id === p.id);
      if (existing) return prev.map((x) => x.id === p.id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...p, qty: 1, price }];
    });
  };

  const removeFromCart = (id: string) => setCart((prev) => prev.filter((x) => x.id !== id));
  const setQty = (id: string, qty: number) => {
    if (qty <= 0) return removeFromCart(id);
    setCart((prev) => prev.map((x) => x.id === id ? { ...x, qty } : x));
  };
  const clearCart = () => setCart([]);

  const list = useMemo(() => (filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.categories.includes(filter))), [filter]);

  const buildWhatsAppUrl = (text: string) => {
    const encoded = encodeURIComponent(text);
    return `https://wa.me/201234567890?text=${encoded}`;
  };

  const cartToWhatsAppMessage = () => {
    if (cart.length === 0) return "السلام عليكم 👋 حابب أسأل عن العطور";
    const lines = cart.map((i) => `- ${i.nameAr} (${i.name}) × ${i.qty} = ${(i.discount ? Math.round(i.price * 0.9) : i.price) * i.qty} EGP`);
    return `السلام عليكم 👋 عايز أعمل أوردر:\n${lines.join("\n")}\nالإجمالي: ${total} EGP`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans antialiased">
      {/* Navigation */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/85 backdrop-blur-md border-b border-border/60 shadow-sm" : "bg-transparent"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-3 group">
            <img src={logo} alt="City Fragrance" width={40} height={40} className="h-10 w-10 rounded-full object-cover ring-2 ring-gold/20 group-hover:ring-gold/60 transition" />
            <div className="leading-tight">
              <div className="font-serif text-lg text-cream">City Fragrance</div>
              <div dir="rtl" className="ar text-[11px] text-gold tracking-wider">سيتي فراجرانس</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#shop" className="hover:text-gold transition-colors">Shop</a>
            <a href="#about" className="hover:text-gold transition-colors">About</a>
            <a href="#guide" className="hover:text-gold transition-colors">Guide</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
          </nav>
          <button
            onClick={() => setShowCart(true)}
            className="relative flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-sm text-cream transition hover:bg-gold hover:text-background shadow-gold/20 hover:shadow-gold"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-gradient text-[11px] font-bold text-background shadow-sm">{count}</span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-gradient-to-b from-background via-[#0f0e1a] to-background">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Luxury perfume bottle" loading="eager" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-[#0f0e1a]/40 to-background" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-background/30 backdrop-blur px-4 py-1.5 shadow-inner">
            <MapPin className="h-3.5 w-3.5 text-gold" />
            <span dir="rtl" className="ar text-xs text-cream/90">{ADDRESS_AR}</span>
          </div>
          <h1 className="font-serif text-5xl leading-[0.95] text-cream sm:text-7xl md:text-8xl drop-shadow-2xl">
            City <span className="italic text-gold">Fragrance</span>
          </h1>
          <div dir="rtl" className="ar mt-3 text-3xl font-bold text-cream sm:text-5xl drop-shadow-xl">
            سيتي <span className="text-gold">فراجرانس</span>
          </div>
          <p dir="rtl" className="ar mx-auto mt-8 max-w-xl text-xl text-cream/80 sm:text-2xl leading-relaxed">
            مش بيبع عطر.. بيبيع <span className="text-gold font-semibold">قلب العطر</span>
          </p>
          <p className="mx-auto mt-2 max-w-xl text-base italic text-muted-foreground">
            We don't sell perfume — we sell the soul of it.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#shop" className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold-soft to-gold px-8 py-3.5 text-base font-bold text-background shadow-[0_10px_40px_-10px_rgba(212,175,55,0.5)] transition hover:scale-[1.03] hover:shadow-[0_14px_50px_-10px_rgba(212,175,55,0.6)]">
              <span dir="rtl" className="ar">اعمل اوردرك دلوقتي</span>
              <span className="h-4 w-px bg-background/30" />
              <span>Shop Now</span>
            </a>
            <a href={buildWhatsAppUrl("مساء الخير 👋 حابب اسأل عن العطور المتاحة")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-6 py-3 text-sm text-cream transition hover:border-gold hover:text-gold hover:shadow-gold/20">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground animate-bounce">
          Scroll ↓
        </div>
      </section>

      {/* Shop */}
      <section id="shop" className="mx-auto max-w-7xl px-5 py-28 sm:py-36">
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-[0.4em] text-gold">Collection</div>
          <h2 className="mt-3 font-serif text-4xl text-cream sm:text-5xl">Featured Fragrances</h2>
          <div dir="rtl" className="ar mt-2 text-xl text-gold">أبرز العطور</div>
          <div className="mx-auto mt-6 h-px w-16 bg-gold/60" />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-4 py-2 text-sm transition duration-200 ${filter === f.id ? "border-gold bg-gold-gradient text-background font-semibold shadow-gold/30" : "border-border text-muted-foreground hover:border-gold/60 hover:text-cream hover:shadow-sm"}`}
            >
              {f.label} <span dir="rtl" className="ar mx-1 opacity-60">· {f.labelAr}</span>
            </button>
          ))}
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <div
              key={p.id}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-gold/50 hover:shadow-[0_20px_60px_-20px_rgba(212,175,55,0.2)] hover:-translate-y-1"
            >
              {p.discount && (
                <div className="absolute right-3 top-3 z-10 rounded-full bg-gradient-to-r from-gold-soft to-gold px-3 py-1 text-[11px] font-bold text-background shadow-md">−10% OFF</div>
              )}
              <div className="relative aspect-[4/5] overflow-hidden bg-background/40">
                <img src={p.image} alt={p.name} loading="lazy" width={800} height={1000} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{p.brand}</div>
                    <h3 className="font-serif text-xl text-cream">{p.name}</h3>
                    <div dir="rtl" className="ar text-sm text-gold/90">{p.nameAr}</div>
                  </div>
                  <div className="text-right shrink-0">
                    {p.discount && <div className="text-xs text-muted-foreground line-through">{p.price} EGP</div>}
                    <div className="font-serif text-xl text-gold">{p.discount ? Math.round(p.price * 0.9) : p.price} <span className="text-xs font-sans font-normal text-muted-foreground">EGP</span></div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{p.note}</p>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => addToCart(p)}
                    className="flex-1 rounded-full border border-gold/40 bg-transparent py-2.5 text-xs font-semibold text-cream transition hover:bg-gold hover:text-background hover:shadow-gold/30"
                  >
                    Add to Cart
                  </button>
                  <a
                    href={buildWhatsAppUrl(`عايز أطلب ${p.nameAr} (${p.name}) — ${p.discount ? Math.round(p.price * 0.9) : p.price} EGP`)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center rounded-full bg-gradient-to-r from-gold-soft to-gold px-3.5 py-2.5 text-background transition hover:scale-105 shadow-gold/20"
                    aria-label="Order via WhatsApp"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative border-y border-border/60 bg-card/30 py-28 sm:py-36 overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-2 md:items-center">
          <div className="relative overflow-hidden rounded-2xl border border-border shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
            <img src={storeImg} alt="Store interior" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
          </div>
          <div>
            <div className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold">Our Story</div>
            <h2 className="font-serif text-4xl text-cream sm:text-5xl leading-tight">
              Fragrance is <span className="italic text-gold">passion</span>, not profit.
            </h2>
            <p dir="rtl" className="ar mt-6 text-2xl leading-relaxed text-cream">
              نؤمن إن العطر <span className="text-gold font-semibold">هواية وحب</span>، مش مجرد بيزنس.
            </p>
            <p dir="rtl" className="ar mt-4 text-base leading-loose text-muted-foreground">
              من بنها، بنختار كل عطر بإيدنا. بنجربه، بنراجعه، وبنبيع اللي احنا مؤمنين بيه. مفيش انفلونسر كلام فاضي — بس صدق، شغف، ومجتمع بيحب العطر زينا.
            </p>
            <p className="mt-4 text-sm italic text-muted-foreground">
              Curated by hobbyists. Reviewed honestly. Sold with love — from Banha to you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-xl border border-border bg-background/60 px-5 py-3 shadow-sm">
                <div className="font-serif text-2xl text-gold">100%</div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Original</div>
              </div>
              <div className="rounded-xl border border-border bg-background/60 px-5 py-3 shadow-sm">
                <div className="font-serif text-2xl text-gold">8+</div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Curated brands</div>
              </div>
              <div className="rounded-xl border border-border bg-background/60 px-5 py-3 shadow-sm">
                <div className="font-serif text-2xl text-gold">24/7</div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">On WhatsApp</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide */}
      <section id="guide" className="border-t border-border/60 bg-card/20 py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5">
          <div className="text-center">
            <div className="text-[11px] uppercase tracking-[0.4em] text-gold">Guide</div>
            <h2 className="mt-3 font-serif text-4xl text-cream sm:text-5xl">How to pick your perfume</h2>
            <div dir="rtl" className="ar mt-2 text-xl text-gold">ازاي تختار عطرك؟</div>
            <div className="mx-auto mt-6 h-px w-16 bg-gold/60" />
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { time: "Morning", timeAr: "الصبح", title: "Fresh & light", titleAr: "خفيف ومنعش", picks: ["Hawas Ice", "Cerulean Blue"] },
              { time: "Evening", timeAr: "بالليل", title: "Bold & warm", titleAr: "قوي ودافي", picks: ["Hawas Kobra", "Afro Leather"] },
              { time: "All Day", timeAr: "طول اليوم", title: "Signature scent", titleAr: "بصمتك الشخصية", picks: ["Megara", "Kahilan"] },
            ].map((c) => (
              <div key={c.time} className="group rounded-2xl border border-border bg-card/40 p-8 transition hover:border-gold/50 hover:shadow-[0_20px_60px_-20px_rgba(212,175,55,0.15)] hover:-translate-y-0.5">
                <Sparkles className="h-6 w-6 text-gold" />
                <div className="mt-6 flex items-baseline justify-between">
                  <div className="font-serif text-3xl text-cream">{c.time}</div>
                  <div dir="rtl" className="ar text-gold font-bold text-lg">{c.timeAr}</div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{c.title} · <span dir="rtl" className="ar">{c.titleAr}</span></div>
                <div className="mt-6 space-y-2 border-t border-border/60 pt-6">
                  {c.picks.map((pName) => (
                    <div key={pName} className="flex items-center gap-2 text-sm text-cream">
                      <span className="h-1 w-4 rounded-full bg-gradient-to-r from-gold-soft to-gold" />
                      {pName}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order / Contact */}
      <section id="contact" className="mx-auto max-w-5xl px-5 py-28 sm:py-36 text-center">
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-[0.4em] text-gold">Order</div>
          <h2 className="mt-3 font-serif text-4xl text-cream sm:text-5xl">Two Ways to Order</h2>
          <div dir="rtl" className="ar mt-2 text-xl text-gold">طريقتين للطلب</div>
          <div className="mx-auto mt-6 h-px w-16 bg-gold/60" />
        </div>
        <div className="mx-auto mt-12 grid gap-6 md:grid-cols-2">
          <a href={buildWhatsAppUrl("السلام عليكم 👋 حابب أعمل أوردر")} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-gold-soft to-gold p-10 text-background shadow-[0_10px_40px_-10px_rgba(212,175,55,0.4)] transition hover:scale-[1.02] hover:shadow-[0_14px_50px_-10px_rgba(212,175,55,0.6)]">
            <MessageCircle className="mx-auto h-10 w-10 drop-shadow-md" />
            <h3 className="mt-4 font-serif text-3xl">Order via WhatsApp</h3>
            <p dir="rtl" className="ar mt-2 text-lg font-bold">اطلب الآن عبر الواتساب</p>
            <p className="mt-3 text-sm opacity-90">Fastest • Personal • 24/7</p>
          </a>
          <a href="#shop" className="group rounded-3xl border border-border bg-card p-10 transition hover:border-gold hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.15)] hover:-translate-y-0.5">
            <ShoppingBag className="mx-auto h-10 w-10 text-gold" />
            <h3 className="mt-4 font-serif text-3xl text-cream">Order on the site</h3>
            <p dir="rtl" className="ar mt-2 text-lg text-gold font-bold">أو اعمل اوردر عن طريق الويبسايت</p>
            <p className="mt-3 text-sm text-muted-foreground">Browse • Add to cart • Checkout on WhatsApp</p>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover ring-2 ring-gold/20" />
              <div>
                <div className="font-serif text-lg text-cream">City Fragrance</div>
                <div dir="rtl" className="ar text-xs text-gold">سيتي فراجرانس</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Curated original perfumes from Banha, Egypt. Sold with love.
            </p>
          </div>
          <div dir="rtl" className="ar">
            <div className="text-[11px] uppercase tracking-[0.3em] text-gold">العنوان</div>
            <p className="mt-3 text-sm text-cream leading-loose">{ADDRESS_AR}<br />بنها — القليوبية، مصر</p>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-gold">Contact</div>
            <div className="mt-3 space-y-2 text-sm">
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-cream hover:text-gold transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg> @city_fragrance_
              </a>
              <a href={buildWhatsAppUrl("مرحبا 👋")} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-cream hover:text-gold transition">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-border/60 px-5 pt-6 text-center text-xs text-muted-foreground">
          City Fragrance © 2025 — All rights reserved
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={buildWhatsAppUrl("السلام عليكم 👋")}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.5)] transition hover:scale-110 hover:shadow-[0_14px_40px_-5px_rgba(37,211,102,0.7)]"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />
      </a>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" onClick={() => setShowCart(false)} />
      )}
      <aside className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-card border-l border-border shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${showCart ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-serif text-2xl text-cream">Your Cart</h2>
          <button onClick={() => setShowCart(false)} className="text-muted-foreground hover:text-cream transition text-sm">Close</button>
        </div>
        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-muted-foreground px-6">
            <ShoppingBag className="h-12 w-12 text-gold/40" />
            <p className="text-lg">Cart is empty</p>
            <p dir="rtl" className="ar text-sm">السلة فاضية</p>
            <button onClick={() => { setShowCart(false); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-4 rounded-full border border-gold/40 px-6 py-2 text-sm text-cream hover:bg-gold hover:text-background transition">
              Browse products
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.map((i) => (
                <div key={i.id} className="flex gap-4 rounded-xl border border-border bg-background/30 p-4 shadow-sm">
                  <img src={i.image} alt="" className="h-20 w-20 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-serif text-cream truncate">{i.name}</div>
                    <div dir="rtl" className="ar text-xs text-gold">{i.nameAr}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => setQty(i.id, i.qty - 1)} className="rounded border border-border p-1 hover:bg-gold hover:text-background transition" aria-label="decrease"><Minus className="h-3 w-3" /></button>
                      <span className="w-6 text-center text-sm font-medium">{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} className="rounded border border-border p-1 hover:bg-gold hover:text-background transition" aria-label="increase"><Plus className="h-3 w-3" /></button>
                      <div className="ml-auto text-sm font-bold text-gold">{(i.discount ? Math.round(i.price * 0.9) : i.price) * i.qty} EGP</div>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(i.id)} className="text-muted-foreground hover:text-red-400 transition shrink-0 self-start" aria-label="remove"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-6 space-y-4">
              <div className="flex items-center justify-between font-serif text-xl">
                <span className="text-muted-foreground text-sm uppercase tracking-widest">Total</span>
                <span className="text-gold">{total} EGP</span>
              </div>
              <a
                href={buildWhatsAppUrl(cartToWhatsAppMessage())}
                target="_blank"
                rel="noreferrer"
                onClick={() => setShowCart(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-soft to-gold py-3.5 font-bold text-background shadow-[0_10px_40px_-10px_rgba(212,175,55,0.4)] transition hover:scale-[1.01] hover:shadow-[0_14px_50px_-10px_rgba(212,175,55,0.6)]"
              >
                <MessageCircle className="h-5 w-5" />
                Checkout on WhatsApp
              </a>
              <button onClick={clearCart} className="w-full text-xs text-muted-foreground hover:text-red-400 transition">Clear cart</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
