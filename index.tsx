import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Instagram, MapPin, MessageCircle, ShoppingBag, Trash2, Plus, Minus, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-fragrance.jpg";
import storeImg from "@/assets/store-interior.jpg";
import logo from "@/assets/logo.png";
import { PRODUCTS, FILTERS, type Category, type Product } from "@/lib/products";
import { CartProvider, useCart, buildWhatsAppUrl, cartToWhatsAppMessage } from "@/lib/cart";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const ADDRESS_AR = "بنها الفلل، شارع الحرمين، أمام صيدلية العماوي";
const INSTAGRAM = "https://instagram.com/city_fragrance_";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "City Fragrance — سيتي فراجرانس | Original Perfumes in Banha, Egypt" },
      { name: "description", content: "City Fragrance — original luxury perfumes, honest reviews, curated by passion. Order via WhatsApp or online. Banha, Egypt." },
      { property: "og:title", content: "City Fragrance — سيتي فراجرانس" },
      { property: "og:description", content: "مش بيبع عطر.. بيبيع قلب العطر. عطور أصلية ومختارة بشغف من بنها." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <CartProvider>
      <Page />
    </CartProvider>
  ),
});

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Shop />
      <About />
      <OrderWA />
      <Guide />
      <Footer />
      <FloatingWA />
    </div>
  );
}

function Nav() {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all ${scrolled ? "bg-background/85 backdrop-blur-md border-b border-border/60" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo} alt="City Fragrance" width={40} height={40} className="h-10 w-10" />
          <div className="leading-tight">
            <div className="font-serif text-lg text-cream">City Fragrance</div>
            <div dir="rtl" className="ar text-[11px] text-gold tracking-wider">سيتي فراجرانس</div>
          </div>
        </a>
        <nav className="hidden items-center gap-8 md:flex text-sm text-muted-foreground">
          <a href="#shop" className="hover:text-gold transition-colors">Shop</a>
          <a href="#about" className="hover:text-gold transition-colors">About</a>
          <a href="#guide" className="hover:text-gold transition-colors">Guide</a>
          <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
        </nav>
        <CartSheet trigger={
          <button className="relative flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-sm text-cream transition hover:bg-gold hover:text-primary-foreground">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[11px] font-semibold text-primary-foreground">{count}</span>
            )}
          </button>
        } />
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const on = () => {
      if (!ref.current) return;
      const y = window.scrollY;
      ref.current.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(${1 + y * 0.0004})`;
    };
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-hero">
      <div ref={ref} className="absolute inset-0 will-change-transform">
        <img src={heroImg} alt="Luxury perfume bottle" width={1600} height={1200} className="h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center reveal">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/40 px-4 py-1.5 backdrop-blur">
          <MapPin className="h-3.5 w-3.5 text-gold" />
          <span dir="rtl" className="ar text-xs text-cream/90">{ADDRESS_AR}</span>
        </div>

        <h1 className="font-serif text-5xl leading-[0.95] text-cream sm:text-7xl md:text-8xl">
          City <span className="italic text-gold">Fragrance</span>
        </h1>
        <div dir="rtl" className="ar mt-4 text-3xl font-bold text-cream sm:text-5xl">
          سيتي <span className="text-gold">فراجرانس</span>
        </div>

        <p dir="rtl" className="ar mx-auto mt-8 max-w-xl text-lg text-cream/80 sm:text-xl">
          مش بيبع عطر.. بيبيع <span className="text-gold">قلب العطر</span>
        </p>
        <p className="mx-auto mt-2 max-w-xl text-sm italic text-muted-foreground">
          We don't sell perfume — we sell the soul of it.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#shop" className="group inline-flex items-center gap-3 rounded-full bg-gold-gradient px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-gold transition hover:scale-[1.03]">
            <span dir="rtl" className="ar">اعمل اوردرك دلوقتي</span>
            <span className="h-4 w-px bg-primary-foreground/30" />
            <span>Shop Now</span>
          </a>
          <a href={buildWhatsAppUrl("مساء الخير 👋 حابب اسأل عن العطور المتاحة")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm text-cream transition hover:border-gold hover:text-gold">
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Scroll ↓
      </div>
    </section>
  );
}

function Shop() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const list = useMemo(() => (filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.categories.includes(filter))), [filter]);
  return (
    <section id="shop" className="mx-auto max-w-7xl px-5 py-24 sm:py-32">
      <SectionHeader kicker="Collection" en="Featured Fragrances" ar="أبرز العطور" />
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full border px-4 py-2 text-sm transition ${filter === f.id ? "border-gold bg-gold text-primary-foreground" : "border-border text-muted-foreground hover:border-gold/60 hover:text-cream"}`}
          >
            {f.label} <span dir="rtl" className="ar mx-1 opacity-70">· {f.labelAr}</span>
          </button>
        ))}
      </div>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
      </div>
    </section>
  );
}

function ProductCard({ p, index }: { p: Product; index: number }) {
  const { add } = useCart();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const price = p.discount ? Math.round(p.price * 0.9) : p.price;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${(index % 4) * 80}ms` }}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-700 hover:border-gold/50 hover:shadow-gold ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
    >
      {p.discount && (
        <div className="absolute right-3 top-3 z-10 rounded-full bg-gold-gradient px-3 py-1 text-[11px] font-semibold text-primary-foreground">−10% OFF</div>
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
          <div className="text-right">
            {p.discount && <div className="text-xs text-muted-foreground line-through">{p.price} EGP</div>}
            <div className="font-serif text-lg text-gold">{price} <span className="text-xs">EGP</span></div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{p.note}</p>
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => add({ id: p.id, name: p.name, nameAr: p.nameAr, price, image: p.image })}
            className="flex-1 rounded-full border border-gold/40 bg-transparent py-2 text-xs font-medium text-cream transition hover:bg-gold hover:text-primary-foreground"
          >
            Add to Cart
          </button>
          <a
            href={buildWhatsAppUrl(`عايز أطلب ${p.nameAr} (${p.name}) — ${price} EGP`)}
            target="_blank" rel="noreferrer"
            className="flex items-center justify-center rounded-full bg-gold-gradient px-3 py-2 text-primary-foreground transition hover:scale-105"
            aria-label="Order via WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative border-y border-border/60 bg-card/40 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-2 md:items-center">
        <div className="relative overflow-hidden rounded-2xl border border-border shadow-card">
          <img src={storeImg} alt="Store interior" width={1400} height={1000} loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
        </div>
        <div>
          <div className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold">Our Story</div>
          <h2 className="font-serif text-4xl text-cream sm:text-5xl">
            Fragrance is <span className="italic text-gold">passion</span>, not profit.
          </h2>
          <p dir="rtl" className="ar mt-6 text-2xl leading-relaxed text-cream">
            نؤمن إن العطر <span className="text-gold">هواية وحب</span>، مش مجرد بيزنس.
          </p>
          <p dir="rtl" className="ar mt-4 text-base leading-loose text-muted-foreground">
            من بنها، بنختار كل عطر بإيدنا. بنجربه، بنراجعه، وبنبيع اللي احنا مؤمنين بيه. مفيش انفلونسر
            كلام فاضي — بس صدق، شغف، ومجتمع بيحب العطر زينا.
          </p>
          <p className="mt-4 text-sm italic text-muted-foreground">
            Curated by hobbyists. Reviewed honestly. Sold with love — from Banha to you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Stat n="100%" l="Original" />
            <Stat n="8+" l="Curated brands" />
            <Stat n="24/7" l="On WhatsApp" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/60 px-5 py-3">
      <div className="font-serif text-2xl text-gold">{n}</div>
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{l}</div>
    </div>
  );
}

function OrderWA() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-5 py-24 sm:py-32 text-center">
      <SectionHeader kicker="Order" en="Two Ways to Order" ar="طريقتين للطلب" />
      <div className="mx-auto mt-12 grid gap-6 md:grid-cols-2">
        <a href={buildWhatsAppUrl("السلام عليكم 👋 حابب أعمل أوردر")} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-3xl border border-gold/40 bg-gold-gradient p-10 text-primary-foreground shadow-gold transition hover:scale-[1.02]">
          <MessageCircle className="mx-auto h-10 w-10" />
          <h3 className="mt-4 font-serif text-3xl">Order via WhatsApp</h3>
          <p dir="rtl" className="ar mt-2 text-lg font-semibold">اطلب الآن عبر الواتساب</p>
          <p className="mt-3 text-sm opacity-90">Fastest • Personal • 24/7</p>
        </a>
        <a href="#shop" className="group rounded-3xl border border-border bg-card p-10 transition hover:border-gold">
          <ShoppingBag className="mx-auto h-10 w-10 text-gold" />
          <h3 className="mt-4 font-serif text-3xl text-cream">Order on the site</h3>
          <p dir="rtl" className="ar mt-2 text-lg text-gold">أو اعمل اوردر عن طريق الويبسايت</p>
          <p className="mt-3 text-sm text-muted-foreground">Browse • Add to cart • Checkout on WhatsApp</p>
        </a>
      </div>
    </section>
  );
}

function Guide() {
  const cards = [
    { time: "Morning", timeAr: "الصبح", title: "Fresh & light", titleAr: "خفيف ومنعش", picks: ["Hawas Ice", "Cerulean Blue"] },
    { time: "Evening", timeAr: "بالليل", title: "Bold & warm", titleAr: "قوي ودافي", picks: ["Hawas Kobra", "Afro Leather"] },
    { time: "All Day", timeAr: "طول اليوم", title: "Signature scent", titleAr: "بصمتك الشخصية", picks: ["Megara", "Kahilan"] },
  ];
  return (
    <section id="guide" className="border-t border-border/60 bg-card/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader kicker="Guide" en="How to pick your perfume" ar="ازاي تختار عطرك؟" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <div key={c.time} className="group rounded-2xl border border-border bg-background/60 p-8 transition hover:border-gold/50 hover:shadow-gold">
              <Sparkles className="h-6 w-6 text-gold" />
              <div className="mt-6 flex items-baseline justify-between">
                <div className="font-serif text-3xl text-cream">{c.time}</div>
                <div dir="rtl" className="ar text-gold">{c.timeAr}</div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{c.title} · <span dir="rtl" className="ar">{c.titleAr}</span></div>
              <div className="mt-6 space-y-2 border-t border-border/60 pt-6">
                {c.picks.map((p) => (
                  <div key={p} className="flex items-center gap-2 text-sm text-cream">
                    <span className="h-1 w-4 bg-gold" />
                    {p}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background py-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="" width={40} height={40} className="h-10 w-10" />
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
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-cream hover:text-gold">
              <Instagram className="h-4 w-4" /> @city_fragrance_
            </a>
            <a href={buildWhatsAppUrl("مرحبا 👋")} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-cream hover:text-gold">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-border/60 px-5 pt-6 text-center text-xs text-muted-foreground">
        City Fragrance © 2025 — All rights reserved
      </div>
    </footer>
  );
}

function FloatingWA() {
  return (
    <a
      href={buildWhatsAppUrl("السلام عليكم 👋")}
      target="_blank" rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-gold transition hover:scale-110"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/50" />
    </a>
  );
}

function CartSheet({ trigger }: { trigger: React.ReactNode }) {
  const { items, remove, setQty, total, clear } = useCart();
  const [open, setOpen] = useState(false);
  const waUrl = buildWhatsAppUrl(cartToWhatsAppMessage(items, total));

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md bg-card border-l border-border text-cream flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl text-cream">Your Cart</SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-muted-foreground">
            <ShoppingBag className="h-10 w-10 text-gold/60" />
            <p>Cart is empty</p>
            <p dir="rtl" className="ar text-sm">السلة فاضية</p>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto py-2">
              {items.map((i) => (
                <div key={i.id} className="flex gap-3 rounded-xl border border-border bg-background/40 p-3">
                  <img src={i.image} alt="" className="h-20 w-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="font-serif text-cream">{i.name}</div>
                    <div dir="rtl" className="ar text-xs text-gold">{i.nameAr}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => setQty(i.id, i.qty - 1)} className="rounded border border-border p-1"><Minus className="h-3 w-3" /></button>
                      <span className="w-6 text-center text-sm">{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} className="rounded border border-border p-1"><Plus className="h-3 w-3" /></button>
                      <div className="ml-auto text-sm text-gold">{i.price * i.qty} EGP</div>
                    </div>
                  </div>
                  <button onClick={() => remove(i.id)} className="text-muted-foreground hover:text-destructive" aria-label="remove">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex items-center justify-between font-serif text-lg">
                <span className="text-muted-foreground text-sm uppercase tracking-widest">Total</span>
                <span className="text-gold">{total} EGP</span>
              </div>
              <a
                href={waUrl}
                target="_blank" rel="noreferrer"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient py-3 font-semibold text-primary-foreground shadow-gold transition hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" />
                Checkout on WhatsApp
              </a>
              <button onClick={clear} className="w-full text-xs text-muted-foreground hover:text-destructive">Clear cart</button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function SectionHeader({ kicker, en, ar }: { kicker: string; en: string; ar: string }) {
  return (
    <div className="text-center">
      <div className="text-[11px] uppercase tracking-[0.4em] text-gold">{kicker}</div>
      <h2 className="mt-3 font-serif text-4xl text-cream sm:text-5xl">{en}</h2>
      <div dir="rtl" className="ar mt-2 text-xl text-gold">{ar}</div>
      <div className="mx-auto mt-6 h-px w-16 bg-gold/60" />
    </div>
  );
}
