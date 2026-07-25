import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { MapPin, MessageCircle, ShoppingBag, Trash2, Plus, Minus, Sparkles, Menu, X } from "lucide-react";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}
import heroImg from "@/assets/images/hero-fragrance.jpg";
import storeImg from "@/assets/images/store-interior.jpg";
import { PRODUCTS, FILTERS, type Category, type Product } from "@/lib/products";
import { CartProvider, useCart, buildWhatsAppUrl, cartToWhatsAppMessage } from "@/lib/cart";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const on = () => setMobile(window.innerWidth <= 768);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return mobile;
}

const ADDRESS_AR = "بنها الفلل، شارع الحرمين، أمام صيدلية العماوي";
const INSTAGRAM = "https://instagram.com/city_fragrance_";

export default function App() {
  return (
    <CartProvider>
      <Page />
    </CartProvider>
  );
}

function Page() {
  return (
    <div style={{ minHeight: "100vh", overflowX: "hidden", background: "#0a0a0f", color: "#f5f0e8" }}>
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
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navLinks = [["#shop","Shop"],["#about","About"],["#guide","Guide"],["#contact","Contact"]];
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, transition: "all 0.3s",
      background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(42,42,58,0.6)" : "none",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" }}>
        <a href="#top" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, color: "#f5f0e8" }}>City Fragrance</div>
            <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: 11, color: "#c9a84c", letterSpacing: "0.1em", direction: "rtl" }}>سيتي فراجرانس</div>
          </div>
        </a>
        <nav style={{ display: isMobile ? "none" : "flex", alignItems: "center", gap: 32, fontSize: 14 }}>
          {navLinks.map(([h,l]) => (
            <a key={h} href={h} style={{ color: "#888899", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#c9a84c")}
              onMouseLeave={e => (e.currentTarget.style.color = "#888899")}>{l}</a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <CartSheet trigger={
            <button style={{
              position: "relative", display: "flex", alignItems: "center", gap: 8,
              borderRadius: 999, border: "1px solid rgba(201,168,76,0.4)", padding: "8px 16px",
              fontSize: 14, color: "#f5f0e8", background: "transparent", cursor: "pointer", transition: "all 0.2s",
            }}>
              <ShoppingBag size={16} />
              <span>Cart</span>
              {count > 0 && (
                <span style={{
                  position: "absolute", top: -4, right: -4, width: 20, height: 20, borderRadius: "50%",
                  background: "#c9a84c", color: "#0a0a0f", fontSize: 11, fontWeight: 600,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>{count}</span>
              )}
            </button>
          } />
          {isMobile && (
            <button onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "none", border: "none", cursor: "pointer",
              color: "#f5f0e8", padding: 4,
            }}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>
      {isMobile && menuOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0, zIndex: 39,
          background: "rgba(10,10,15,0.97)", backdropFilter: "blur(16px)",
          display: "flex", flexDirection: "column", padding: "8px 20px", gap: 4,
        }}>
          {navLinks.map(([h,l]) => (
            <a key={h} href={h} onClick={() => setMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", minHeight: 48, padding: "12px 16px",
                fontSize: 16, color: "#f5f0e8", textDecoration: "none", borderRadius: 12,
                transition: "background 0.2s", fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,168,76,0.1)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              {l}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const on = () => {
      if (!ref.current) return;
      const y = window.scrollY;
      ref.current.style.transform = `translate3d(0,${y*0.25}px,0) scale(${1+y*0.0004})`;
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <section id="top" style={{ position: "relative", minHeight: "100vh", maxHeight: "700px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#050508" }}>
      <div ref={ref} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
        <img src={heroImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(10,10,15,.6),rgba(10,10,15,.3),#0a0a0f)" }} />
      </div>
      <div style={{ position: "relative", zIndex: 10, maxWidth: 900, padding: "0 24px", textAlign: "center", animation: "reveal 0.8s ease both" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, border: "1px solid rgba(201,168,76,.4)", background: "rgba(10,10,15,.4)", padding: "6px 16px", backdropFilter: "blur(8px)", marginBottom: 24 }}>
          <MapPin size={14} color="#c9a84c" />
          <span style={{ fontFamily: "'Tajawal',sans-serif", fontSize: 12, color: "rgba(245,240,232,.9)", direction: "rtl" }}>{ADDRESS_AR}</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(3rem,10vw,6rem)", lineHeight: .95, color: "#f5f0e8" }}>
          City <em style={{ color: "#c9a84c" }}>Fragrance</em>
        </h1>
        <div style={{ fontFamily: "'Tajawal',sans-serif", marginTop: 16, fontSize: "clamp(1.8rem,6vw,3.5rem)", fontWeight: 700, color: "#f5f0e8", direction: "rtl" }}>
          سيتي <span style={{ color: "#c9a84c" }}>فراجرانس</span>
        </div>
        <p style={{ fontFamily: "'Tajawal',sans-serif", marginTop: 32, fontSize: "clamp(1rem,3vw,1.25rem)", color: "rgba(245,240,232,.8)", direction: "rtl" }}>
          مش بيبع عطر.. بيبيع <span style={{ color: "#c9a84c" }}>قلب العطر</span>
        </p>
        <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "center" }}>
          <a href="#shop" style={{ display: "inline-flex", alignItems: "center", gap: 12, borderRadius: 999, padding: "14px 32px", fontSize: 15, fontWeight: 600, color: "#0a0a0f", textDecoration: "none", background: "linear-gradient(135deg,#c9a84c,#e8cc80,#c9a84c)", boxShadow: "0 0 30px rgba(201,168,76,.3)" }}>
            <span style={{ fontFamily: "'Tajawal',sans-serif" }}>اعمل اوردرك دلوقتي</span>
            <span style={{ width: 1, height: 16, background: "rgba(10,10,15,.3)" }} />
            <span>Shop Now</span>
          </a>
          <a href={buildWhatsAppUrl("مساء الخير 👋 حابب اسأل عن العطور المتاحة")} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, border: "1px solid rgba(245,240,232,.3)", padding: "12px 24px", fontSize: 14, color: "#f5f0e8", textDecoration: "none" }}>
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function Shop() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const isMobile = useIsMobile();
  const list = useMemo(() => filter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.categories.includes(filter)), [filter]);
  return (
    <section id="shop" style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 20px" }}>
      <SectionHeader kicker="Collection" en="Featured Fragrances" ar="أبرز العطور" />
      <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
        {FILTERS.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{ borderRadius: 999, border: `1px solid ${filter===f.id?"#c9a84c":"#2a2a3a"}`, padding: "8px 16px", fontSize: 13, cursor: "pointer", transition: "all 0.2s", background: filter===f.id?"#c9a84c":"transparent", color: filter===f.id?"#0a0a0f":"#888899" }}>
            {f.label} <span style={{ fontFamily: "'Tajawal',sans-serif", opacity: .7 }}>· {f.labelAr}</span>
          </button>
        ))}
      </div>
      <div style={{ marginTop: 56, display: "grid", gap: isMobile ? 12 : 24, gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)" }}>
        {list.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
      </div>
    </section>
  );
}

function ProductCard({ p, index }: { p: Product; index: number }) {
  const { add } = useCart();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: .15 });
    io.observe(ref.current); return () => io.disconnect();
  }, []);
  const price = p.discount ? Math.round(p.price * .9) : p.price;
  return (
    <div ref={ref} style={{ position: "relative", overflow: "hidden", borderRadius: 16, border: "1px solid #2a2a3a", background: "#111118", boxShadow: "0 4px 24px rgba(0,0,0,.4)", transition: "all 0.7s", transitionDelay: `${(index%4)*80}ms`, transform: visible?"translateY(0)":"translateY(24px)", opacity: visible?1:0 }}>
      {p.discount && <div style={{ position: "absolute", top: 12, right: 12, zIndex: 10, borderRadius: 999, padding: "4px 10px", fontSize: 11, fontWeight: 600, color: "#0a0a0f", background: "linear-gradient(135deg,#c9a84c,#e8cc80,#c9a84c)" }}>−10% OFF</div>}
      <div style={{ aspectRatio: "3/4", overflow: "hidden" }}>
        <img src={p.image} alt={p.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      <div style={{ padding: isMobile ? 12 : 20, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontSize: isMobile ? 9 : 10, textTransform: "uppercase", letterSpacing: ".15em", color: "#888899" }}>{p.brand}</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: isMobile ? 16 : 20, color: "#f5f0e8" }}>{p.name}</h3>
            <div style={{ fontFamily: "'Tajawal',sans-serif", fontSize: isMobile ? 11 : 13, color: "rgba(201,168,76,.9)", direction: "rtl" }}>{p.nameAr}</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            {p.discount && <div style={{ fontSize: 11, color: "#888899", textDecoration: "line-through" }}>{p.price} EGP</div>}
            <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: isMobile ? 15 : 18, color: "#c9a84c" }}>{price} <span style={{ fontSize: 11 }}>EGP</span></div>
          </div>
        </div>
        <p style={{ fontSize: isMobile ? 9 : 12, color: "#888899" }}>{p.note}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: isMobile ? 9 : 10, color: "#888899" }}>
            <span style={{ width: 36, fontFamily: "'Tajawal',sans-serif", direction: "rtl", textAlign: "right" }}>أعلى</span>
            <span style={{ flex: 1 }}>{p.notes.top}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: isMobile ? 9 : 10, color: "#888899" }}>
            <span style={{ width: 36, fontFamily: "'Tajawal',sans-serif", direction: "rtl", textAlign: "right" }}>قلب</span>
            <span style={{ flex: 1 }}>{p.notes.heart}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: isMobile ? 9 : 10, color: "#888899" }}>
            <span style={{ width: 36, fontFamily: "'Tajawal',sans-serif", direction: "rtl", textAlign: "right" }}>قاعدة</span>
            <span style={{ flex: 1 }}>{p.notes.base}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => add({ id: p.id, name: p.name, nameAr: p.nameAr, price, image: p.image })} style={{ flex: 1, borderRadius: 999, border: "1px solid rgba(201,168,76,.4)", padding: isMobile ? 6 : 8, fontSize: 12, fontWeight: 500, color: "#f5f0e8", background: "transparent", cursor: "pointer", transition: "all 0.2s" }}>Add to Cart</button>
          <a href={buildWhatsAppUrl(`عايز أطلب ${p.nameAr} (${p.name}) — ${price} EGP`)} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 999, padding: isMobile ? 6 : 8, color: "#0a0a0f", background: "linear-gradient(135deg,#c9a84c,#e8cc80,#c9a84c)", textDecoration: "none" }}>
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" style={{ borderTop: "1px solid rgba(42,42,58,.6)", borderBottom: "1px solid rgba(42,42,58,.6)", background: "rgba(17,17,24,.4)", padding: "64px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gap: 56, padding: "0 20px", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", alignItems: "center" }}>
        <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #2a2a3a", boxShadow: "0 4px 24px rgba(0,0,0,.4)" }}>
          <img src={storeImg} alt="Store" loading="lazy" style={{ width: "100%", display: "block", objectFit: "cover" }} />
        </div>
        <div>
          <p style={{ fontFamily: "'Tajawal',sans-serif", marginTop: 24, fontSize: 22, lineHeight: 1.7, color: "#f5f0e8", direction: "rtl" }}>
            نؤمن إن العطر <span style={{ color: "#c9a84c" }}>هواية وحب</span>، مش مجرد بيزنس.
          </p>
          <p style={{ fontFamily: "'Tajawal',sans-serif", marginTop: 16, fontSize: 15, lineHeight: 1.9, color: "#888899", direction: "rtl" }}>
            من بنها، بنختار كل عطر بإيدنا. بنجربه، بنراجعه، وبنبيع اللي احنا مؤمنين بيه. مفيش انفلونسر كلام فاضي — بس صدق، شغف، ومجتمع بيحب العطر زينا.
          </p>
          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[["100%","Original"],["8+","Curated brands"],["24/7","On WhatsApp"]].map(([n,l]) => (
              <div key={l} style={{ borderRadius: 12, border: "1px solid #2a2a3a", background: "rgba(10,10,15,.6)", padding: "12px 20px" }}>
                <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 22, color: "#c9a84c" }}>{n}</div>
                <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".15em", color: "#888899" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OrderWA() {
  return (
    <section id="contact" style={{ maxWidth: 900, margin: "0 auto", padding: "64px 20px", textAlign: "center" }}>
      <SectionHeader kicker="Order" en="Two Ways to Order" ar="طريقتين للطلب" />
      <div style={{ marginTop: 48, display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
        <a href={buildWhatsAppUrl("السلام عليكم 👋 حابب أعمل أوردر")} target="_blank" rel="noreferrer" style={{ display: "block", borderRadius: 24, padding: 40, textAlign: "center", background: "linear-gradient(135deg,#c9a84c,#e8cc80,#c9a84c)", color: "#0a0a0f", textDecoration: "none", boxShadow: "0 0 30px rgba(201,168,76,.3)" }}>
          <MessageCircle size={40} style={{ margin: "0 auto" }} />
          <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", marginTop: 16, fontSize: 26 }}>Order via WhatsApp</h3>
          <p style={{ fontFamily: "'Tajawal',sans-serif", marginTop: 8, fontSize: 16, fontWeight: 600 }}>اطلب الآن عبر الواتساب</p>
          <p style={{ marginTop: 12, fontSize: 13, opacity: .85 }}>Fastest • Personal • 24/7</p>
        </a>
        <a href="#shop" style={{ display: "block", borderRadius: 24, border: "1px solid #2a2a3a", padding: 40, textAlign: "center", background: "#111118", textDecoration: "none" }}>
          <ShoppingBag size={40} style={{ margin: "0 auto", color: "#c9a84c" }} />
          <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", marginTop: 16, fontSize: 26, color: "#f5f0e8" }}>Order on the site</h3>
          <p style={{ fontFamily: "'Tajawal',sans-serif", marginTop: 8, fontSize: 16, color: "#c9a84c" }}>أو اعمل اوردر عن طريق الويبسايت</p>
          <p style={{ marginTop: 12, fontSize: 13, color: "#888899" }}>Browse • Add to cart • Checkout on WhatsApp</p>
        </a>
      </div>
    </section>
  );
}

function Guide() {
  const cards = [
    { time: "Morning", timeAr: "الصبح", title: "Fresh & light", titleAr: "خفيف ومنعش", picks: ["Hawas Ice","Cerulean Blue"] },
    { time: "Evening", timeAr: "بالليل", title: "Bold & warm", titleAr: "قوي ودافي", picks: ["Hawas Kobra","Afro Leather"] },
    { time: "All Day", timeAr: "طول اليوم", title: "Signature scent", titleAr: "بصمتك الشخصية", picks: ["Megara","Kahilan"] },
  ];
  return (
    <section id="guide" style={{ borderTop: "1px solid rgba(42,42,58,.6)", background: "rgba(17,17,24,.3)", padding: "64px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
        <SectionHeader kicker="Guide" en="How to pick your perfume" ar="ازاي تختار عطرك؟" />
        <div style={{ marginTop: 56, display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
          {cards.map(c => (
            <div key={c.time} style={{ borderRadius: 16, border: "1px solid #2a2a3a", background: "rgba(10,10,15,.6)", padding: 32 }}>
              <Sparkles size={24} color="#c9a84c" />
              <div style={{ marginTop: 24, display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 28, color: "#f5f0e8" }}>{c.time}</div>
                <div style={{ fontFamily: "'Tajawal',sans-serif", color: "#c9a84c" }}>{c.timeAr}</div>
              </div>
              <div style={{ marginTop: 8, fontSize: 13, color: "#888899" }}>{c.title} · <span style={{ fontFamily: "'Tajawal',sans-serif" }}>{c.titleAr}</span></div>
              <div style={{ marginTop: 24, borderTop: "1px solid rgba(42,42,58,.6)", paddingTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                {c.picks.map(p => (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#f5f0e8" }}>
                    <span style={{ width: 16, height: 2, background: "#c9a84c", flexShrink: 0 }} />{p}
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
    <footer style={{ borderTop: "1px solid #2a2a3a", background: "#0a0a0f", padding: "56px 0 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gap: 40, padding: "0 20px", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 18, color: "#f5f0e8" }}>City Fragrance</div>
          <div style={{ fontFamily: "'Tajawal',sans-serif", fontSize: 12, color: "#c9a84c" }}>سيتي فراجرانس</div>
          <p style={{ marginTop: 16, fontSize: 13, color: "#888899" }}>Curated original perfumes from Banha, Egypt. Sold with love.</p>
        </div>
        <div style={{ fontFamily: "'Tajawal',sans-serif", direction: "rtl" }}>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".3em", color: "#c9a84c", marginBottom: 12 }}>العنوان</div>
          <p style={{ fontSize: 13, color: "#f5f0e8", lineHeight: 1.8 }}>{ADDRESS_AR}<br />بنها — القليوبية، مصر</p>
        </div>
        <div>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".3em", color: "#c9a84c", marginBottom: 12 }}>Contact</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#f5f0e8", textDecoration: "none" }}><InstagramIcon size={16} /> @city_fragrance_</a>
            <a href={buildWhatsAppUrl("مرحبا 👋")} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#f5f0e8", textDecoration: "none" }}><MessageCircle size={16} /> WhatsApp</a>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: "40px auto 0", borderTop: "1px solid rgba(42,42,58,.6)", padding: "24px 20px 0", textAlign: "center", fontSize: 12, color: "#888899" }}>City Fragrance © 2025 — All rights reserved</div>
    </footer>
  );
}

function FloatingWA() {
  return (
    <a href={buildWhatsAppUrl("السلام عليكم 👋")} target="_blank" rel="noreferrer" style={{ position: "fixed", bottom: 24, right: 24, zIndex: 50, width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "#25D366", color: "white", boxShadow: "0 0 30px rgba(37,211,102,.4)", textDecoration: "none" }}>
      <MessageCircle size={24} />
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
      <SheetContent side="right" style={{ width: "100%", maxWidth: 440, background: "#111118", borderLeft: "1px solid #2a2a3a", color: "#f5f0e8", display: "flex", flexDirection: "column" }}>
        <SheetHeader>
          <SheetTitle style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 24, color: "#f5f0e8" }}>Your Cart</SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, textAlign: "center", color: "#888899" }}>
            <ShoppingBag size={40} style={{ color: "rgba(201,168,76,.6)" }} />
            <p>Cart is empty</p>
            <p style={{ fontFamily: "'Tajawal',sans-serif", fontSize: 13 }}>السلة فاضية</p>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: "auto", padding: "8px 0", display: "flex", flexDirection: "column", gap: 12 }}>
              {items.map(i => (
                <div key={i.id} style={{ display: "flex", gap: 12, borderRadius: 12, border: "1px solid #2a2a3a", background: "rgba(10,10,15,.4)", padding: 12 }}>
                  <img src={i.image} alt="" style={{ width: 80, height: 80, borderRadius: 8, objectFit: "cover" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", color: "#f5f0e8" }}>{i.name}</div>
                    <div style={{ fontFamily: "'Tajawal',sans-serif", fontSize: 11, color: "#c9a84c" }}>{i.nameAr}</div>
                    <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                      <button onClick={() => setQty(i.id, i.qty - 1)} style={{ border: "1px solid #2a2a3a", borderRadius: 4, padding: 4, background: "transparent", cursor: "pointer", color: "#f5f0e8" }}><Minus size={12} /></button>
                      <span style={{ width: 24, textAlign: "center", fontSize: 13 }}>{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} style={{ border: "1px solid #2a2a3a", borderRadius: 4, padding: 4, background: "transparent", cursor: "pointer", color: "#f5f0e8" }}><Plus size={12} /></button>
                      <div style={{ marginLeft: "auto", fontSize: 13, color: "#c9a84c" }}>{i.price * i.qty} EGP</div>
                    </div>
                  </div>
                  <button onClick={() => remove(i.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#888899", alignSelf: "flex-start" }}><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid #2a2a3a", paddingTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".15em", color: "#888899" }}>Total</span>
                <span style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 20, color: "#c9a84c" }}>{total} EGP</span>
              </div>
              <a href={waUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 999, padding: "12px", fontWeight: 600, color: "#0a0a0f", background: "linear-gradient(135deg,#c9a84c,#e8cc80,#c9a84c)", textDecoration: "none" }}>
                <MessageCircle size={16} /> Checkout on WhatsApp
              </a>
              <button onClick={clear} style={{ fontSize: 12, color: "#888899", background: "none", border: "none", cursor: "pointer" }}>Clear cart</button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function SectionHeader({ kicker, en, ar }: { kicker: string; en: string; ar: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".4em", color: "#c9a84c" }}>{kicker}</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", marginTop: 12, fontSize: "clamp(2rem,4vw,3rem)", color: "#f5f0e8" }}>{en}</h2>
      <div style={{ fontFamily: "'Tajawal',sans-serif", marginTop: 8, fontSize: 20, color: "#c9a84c", direction: "rtl" }}>{ar}</div>
      <div style={{ margin: "24px auto 0", width: 64, height: 1, background: "rgba(201,168,76,.6)" }} />
    </div>
  );
}
