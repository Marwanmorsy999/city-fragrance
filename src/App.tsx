import { useEffect, useMemo, useState } from "react";
import { MessageCircle, ShoppingBag, Sparkles, Menu, X, ChevronDown } from "lucide-react";
import heroImg from "@/assets/images/hero-fragrance.jpg";
import storeImg from "@/assets/images/store-interior.jpg";
import { PRODUCTS, type Category, type Product } from "@/lib/products";
import { CartProvider, useCart, buildWhatsAppUrl } from "@/lib/cart";
import { LanguageProvider, useLang } from "@/lib/language";
import { t as tx } from "@/lib/translations";

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const on = () => setMobile(window.innerWidth <= 768);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return mobile;
}

const INSTAGRAM = "https://instagram.com/city_fragrance_";

type Page = "home" | "shop" | "about" | "guide" | "faq" | "product";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = (p: Page) => { setPage(p); window.scrollTo(0, 0); };

  return (
    <CartProvider>
      <LanguageProvider>
        <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#ffffff", fontFamily: "'Inter', sans-serif" }}>
          <Nav navigate={navigate} currentPage={page} />
          {page === "home" && <HomePage navigate={navigate} setSelectedProduct={setSelectedProduct} />}
          {page === "shop" && <ShopPage navigate={navigate} setSelectedProduct={setSelectedProduct} />}
          {page === "about" && <AboutPage />}
          {page === "guide" && <GuidePage />}
          {page === "faq" && <FAQPage />}
          {page === "product" && selectedProduct && <ProductDetailPage product={selectedProduct} navigate={navigate} />}
          <Footer navigate={navigate} />
          <FloatingWA />
        </div>
      </LanguageProvider>
    </CartProvider>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function Nav({ navigate, currentPage }: { navigate: (p: Page) => void; currentPage: Page }) {
  const { lang, setLang } = useLang();
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const s = tx[lang];

  const navLinks: Array<[Page, string]> = [
    ["shop", s.shop],
    ["about", s.about],
    ["guide", s.guide],
    ["faq", s.faq],
  ];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
      background: "rgba(10,10,15,0.85)",
      borderBottom: "1px solid rgba(42,42,58,0.6)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" }}>
        <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <span style={{ fontWeight: 700, fontSize: 18, color: "#ffffff" }}>City Fragrance</span>
        </button>
        <nav style={{ display: isMobile ? "none" : "flex", alignItems: "center", gap: 28, fontSize: 14 }}>
          {navLinks.map(([p, label]) => (
            <button
              key={p}
              onClick={() => navigate(p)}
              style={{
                color: currentPage === p ? "#c9a84c" : "#888899",
                background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 14,
              }}
            >
              {label}
            </button>
          ))}
          <a
            href={buildWhatsAppUrl(lang === "en" ? "Hello 👋" : "السلام عليكم 👋")}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#888899", textDecoration: "none", fontSize: 14 }}
          >
            {s.contact}
          </a>
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            style={{
              border: "1px solid #2a2a3a", borderRadius: 8, padding: "6px 12px",
              fontSize: 13, background: "transparent", color: "#888899", cursor: "pointer",
            }}
          >
            {lang === "en" ? "ع" : "EN"}
          </button>
          <button
            onClick={() => navigate("shop")}
            style={{
              position: "relative", display: "flex", alignItems: "center", gap: 8,
              border: "1px solid #2a2a3a", borderRadius: 8, padding: "8px 14px",
              fontSize: 13, color: "#ffffff", background: "transparent", cursor: "pointer",
            }}
          >
            <ShoppingBag size={16} />
            <span>{s.cart}</span>
            {count > 0 && (
              <span style={{
                position: "absolute", top: -4, right: -4, width: 20, height: 20, borderRadius: "50%",
                background: "#c9a84c", color: "#0a0a0f", fontSize: 11, fontWeight: 600,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{count}</span>
            )}
          </button>
        </nav>
        <div style={{ display: isMobile ? "flex" : "none", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => navigate("shop")}
            style={{
              position: "relative", display: "flex", alignItems: "center", gap: 6,
              border: "1px solid #2a2a3a", borderRadius: 8, padding: "8px 12px",
              fontSize: 12, color: "#ffffff", background: "transparent", cursor: "pointer",
            }}
          >
            <ShoppingBag size={16} />
            {count > 0 && (
              <span style={{
                position: "absolute", top: -4, right: -4, width: 18, height: 18, borderRadius: "50%",
                background: "#c9a84c", color: "#0a0a0f", fontSize: 10, fontWeight: 600,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{count}</span>
            )}
          </button>
          <button onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "none", border: "none", cursor: "pointer", color: "#ffffff", padding: 4,
          }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMobile && menuOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0, zIndex: 39,
          background: "rgba(10,10,15,0.97)",
          display: "flex", flexDirection: "column", padding: "8px 20px", gap: 4,
        }}>
          {navLinks.map(([p, label]) => (
            <button
              key={p}
              onClick={() => { setMenuOpen(false); navigate(p); }}
              style={{
                display: "flex", alignItems: "center", minHeight: 48, padding: "12px 16px",
                fontSize: 16, color: currentPage === p ? "#c9a84c" : "#ffffff",
                background: "none", border: "none", cursor: "pointer", textAlign: "left",
              }}
            >
              {label}
            </button>
          ))}
          <a
            href={buildWhatsAppUrl(lang === "en" ? "Hello 👋" : "السلام عليكم 👋")}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 8, textDecoration: "none",
              minHeight: 48, padding: "12px 16px", fontSize: 16, color: "#ffffff",
            }}
          >
            <MessageCircle size={16} /> {s.contact}
          </a>
          <button
            onClick={() => { setLang(lang === "en" ? "ar" : "en"); setMenuOpen(false); }}
            style={{
              display: "flex", alignItems: "center", minHeight: 48, padding: "12px 16px",
              fontSize: 16, color: "#ffffff", background: "none", border: "none", cursor: "pointer", textAlign: "left",
            }}
          >
            {lang === "en" ? "عربي" : "English"}
          </button>
        </div>
      )}
    </header>
  );
}

function HomePage({ navigate, setSelectedProduct }: { navigate: (p: Page) => void; setSelectedProduct: (p: Product) => void }) {
  return (
    <>
      <Hero navigate={navigate} />
      <FeaturedProducts navigate={navigate} setSelectedProduct={setSelectedProduct} />
      <AuthenticitySection />
      <OrderWaysSection />
    </>
  );
}

function Hero({ navigate }: { navigate: (p: Page) => void }) {
  const { lang } = useLang();
  const s = tx[lang];
  const bodyStyle = lang === "ar" ? { fontFamily: "'Tajawal', sans-serif", direction: "rtl" as const } : {};

  return (
    <section id="top" style={{ position: "relative", minHeight: "100vh", maxHeight: "700px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#050508" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <img src={heroImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(10,10,15,.6),rgba(10,10,15,.3),#0a0a0f)" }} />
      </div>
      <div style={{ position: "relative", zIndex: 10, maxWidth: 900, padding: "0 24px", textAlign: "center", ...bodyStyle }}>
        <h1 style={{ fontWeight: 700, fontSize: "clamp(2.5rem,6vw,4rem)", color: "#ffffff", margin: 0 }}>
          City Fragrance
        </h1>
        <p style={{ fontWeight: 400, fontSize: 18, color: "#888899", marginTop: 16 }}>
          {s.heroTagline}
        </p>
        <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "center" }}>
          <button onClick={() => navigate("shop")} style={{
            background: "#c9a84c", color: "#000", borderRadius: 8, padding: "12px 24px",
            fontSize: 15, fontWeight: 600, border: "none", cursor: "pointer",
          }}>
            {s.shopNow}
          </button>
          <a href={buildWhatsAppUrl(lang === "en" ? "Hello 👋 I'd like to know more" : "السلام عليكم 👋 حابب اسأل عن العطور")} target="_blank" rel="noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: "1px solid #2a2a3a", borderRadius: 8, padding: "12px 24px",
            fontSize: 14, color: "#ffffff", textDecoration: "none",
          }}>
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts({ navigate, setSelectedProduct }: { navigate: (p: Page) => void; setSelectedProduct: (p: Product) => void }) {
  const { lang } = useLang();
  const s = tx[lang];
  const featured = PRODUCTS.slice(0, 4);
  const isMobile = useIsMobile();

  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 20px" }}>
      <h2 style={{ fontWeight: 600, fontSize: 28, textAlign: "center", color: "#ffffff", margin: 0 }}>
        Featured Collection
      </h2>
      <div style={{ marginTop: 40, display: "grid", gap: 16, gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)" }}>
        {featured.map(p => <ProductCard key={p.id} p={p} setSelectedProduct={setSelectedProduct} navigate={navigate} />)}
      </div>
      <div style={{ marginTop: 40, textAlign: "center" }}>
        <button onClick={() => navigate("shop")} style={{
          border: "1px solid #2a2a3a", borderRadius: 8, padding: "10px 24px",
          fontSize: 14, color: "#ffffff", background: "transparent", cursor: "pointer",
        }}>
          {s.viewAll}
        </button>
      </div>
    </section>
  );
}

function AuthenticitySection() {
  const { lang } = useLang();
  const s = tx[lang];
  const bodyStyle = lang === "ar" ? { fontFamily: "'Tajawal', sans-serif", direction: "rtl" as const } : {};

  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 20px", textAlign: "center" }}>
      <h2 style={{ fontWeight: 600, fontSize: 28, color: "#ffffff", margin: 0 }}>
        {s.authHeading}
      </h2>
      <div style={{
        marginTop: 32, background: "#111118", border: "1px solid #2a2a3a",
        borderRadius: 12, padding: 40,
      }}>
        <p style={{ fontSize: 15, color: "#888899", lineHeight: 1.8, margin: 0, ...bodyStyle }}>
          {s.authBody}
        </p>
        <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", ...bodyStyle }}>
          <div style={{ border: "1px solid #2a2a3a", borderRadius: 8, padding: "12px 20px" }}>
            🔒 {s.badge1}
          </div>
          <div style={{ border: "1px solid #2a2a3a", borderRadius: 8, padding: "12px 20px" }}>
            ✅ {s.badge2}
          </div>
          <div style={{ border: "1px solid #2a2a3a", borderRadius: 8, padding: "12px 20px" }}>
            🔄 {s.badge3}
          </div>
        </div>
      </div>
    </section>
  );
}

function OrderWaysSection() {
  const { lang } = useLang();
  const s = tx[lang];

  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 20px", textAlign: "center" }}>
      <h2 style={{ fontWeight: 600, fontSize: 28, color: "#ffffff", margin: 0 }}>
        {s.orderHeading}
      </h2>
      <div style={{ marginTop: 40, display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
        <a href={buildWhatsAppUrl(lang === "en" ? "Hello 👋 I'd like to place an order" : "السلام عليكم 👋 حابب أعمل أوردر")} target="_blank" rel="noreferrer" style={{
          display: "block", borderRadius: 12, padding: 40, textAlign: "center",
          background: "#c9a84c", color: "#000", textDecoration: "none",
        }}>
          <MessageCircle size={40} style={{ margin: "0 auto" }} />
          <h3 style={{ marginTop: 16, fontSize: 22, fontWeight: 600 }}>{s.orderWA}</h3>
          <p style={{ marginTop: 8, fontSize: 13, opacity: 0.85 }}>{s.orderWASub}</p>
        </a>
        <div style={{
          borderRadius: 12, border: "1px solid #2a2a3a", padding: 40,
          textAlign: "center", background: "#111118",
        }}>
          <ShoppingBag size={40} style={{ margin: "0 auto", color: "#c9a84c" }} />
          <h3 style={{ marginTop: 16, fontSize: 22, fontWeight: 600, color: "#ffffff" }}>{s.orderSite}</h3>
          <p style={{ marginTop: 8, fontSize: 13, color: "#888899" }}>{s.orderSiteSub}</p>
        </div>
      </div>
    </section>
  );
}

function ShopPage({ navigate, setSelectedProduct }: { navigate: (p: Page) => void; setSelectedProduct: (p: Product) => void }) {
  const { lang } = useLang();
  const s = tx[lang];
  const [filter, setFilter] = useState<Category | "all">("all");
  const isMobile = useIsMobile();
  const list = useMemo(() => filter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.categories.includes(filter)), [filter]);
  const bodyStyle = lang === "ar" ? { fontFamily: "'Tajawal', sans-serif", direction: "rtl" as const } : {};

  const filterBtns: Array<{ id: Category | "all"; label: string }> = [
    { id: "all", label: s.filterAll },
    { id: "men", label: s.filterMen },
    { id: "women", label: s.filterWomen },
    { id: "unisex", label: s.filterUnisex },
    { id: "oud", label: s.filterOud },
    { id: "summer", label: s.filterSummer },
  ];

  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 20px" }}>
      <h2 style={{ fontWeight: 600, fontSize: 28, textAlign: "center", color: "#ffffff", margin: 0, ...bodyStyle }}>
        {s.shopHeading}
      </h2>
      <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, ...bodyStyle }}>
        {filterBtns.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            borderRadius: 8, border: `1px solid ${filter===f.id?"#c9a84c":"#2a2a3a"}`,
            padding: "8px 16px", fontSize: 13, cursor: "pointer",
            background: filter===f.id?"#c9a84c":"transparent",
            color: filter===f.id?"#000":"#888899",
          }}>
            {f.label}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 40, display: "grid", gap: 16, gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)" }}>
        {list.map(p => <ProductCard key={p.id} p={p} setSelectedProduct={setSelectedProduct} navigate={navigate} />)}
      </div>
    </section>
  );
}

function ProductCard({ p, setSelectedProduct, navigate }: { p: Product; setSelectedProduct: (p: Product) => void; navigate: (p: Page) => void }) {
  const { lang } = useLang();
  const { add } = useCart();
  const isMobile = useIsMobile();
  const price = p.discount ? Math.round(p.price * 0.9) : p.price;
  const s = tx[lang];

  const handleCardClick = () => {
    setSelectedProduct(p);
    navigate("product");
  };

  return (
    <div style={{
      background: "#111118", border: "1px solid #2a2a3a", borderRadius: 12, cursor: "pointer", overflow: "hidden",
    }}>
      <div onClick={handleCardClick} style={{ aspectRatio: "3/4" }}>
        <img src={p.image} alt={p.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      <div onClick={handleCardClick} style={{ padding: isMobile ? 12 : 16, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 10, textTransform: "uppercase", color: "#888899" }}>{p.brand}</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#ffffff" }}>
          {lang === "ar" ? p.nameAr : p.name}
        </div>
        <div style={{ fontSize: 15, color: "#c9a84c" }}>
          {price} <span style={{ fontSize: 11 }}>EGP</span>
          {p.discount && <span style={{ fontSize: 11, color: "#888899", textDecoration: "line-through", marginLeft: 8 }}>{p.price} EGP</span>}
        </div>
        <div style={{ fontSize: 11, color: "#888899" }}>
          {lang === "ar" ? p.noteAr : p.note}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, fontSize: 10, color: "#888899" }}>
          <div>{s.topNote}: {p.notes.top}</div>
          <div>{s.heartNote}: {p.notes.heart}</div>
          <div>{s.baseNote}: {p.notes.base}</div>
        </div>
      </div>
      <div style={{ padding: isMobile ? "0 12px 12px" : "0 16px 16px", display: "flex", gap: 8 }}>
        <button
          onClick={(e) => { e.stopPropagation(); add({ id: p.id, name: p.name, nameAr: p.nameAr, price, image: p.image }); }}
          style={{
            flex: 1, border: "1px solid #2a2a3a", borderRadius: 8, padding: isMobile ? 6 : 8,
            fontSize: 12, fontWeight: 500, color: "#ffffff", background: "transparent", cursor: "pointer",
          }}
        >
          {s.addToCart}
        </button>
        <a
          href={buildWhatsAppUrl(lang === "en"
            ? `I'd like to order ${p.name} — ${price} EGP`
            : `عايز أطلب ${p.nameAr} — ${price} EGP`)}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 8, padding: "8px 12px",
            color: "#000", background: "#c9a84c", textDecoration: "none",
          }}
        >
          <MessageCircle size={16} />
        </a>
      </div>
    </div>
  );
}

function ProductDetailPage({ product, navigate }: { product: Product; navigate: (p: Page) => void }) {
  const { lang } = useLang();
  const { add } = useCart();
  const s = tx[lang];
  const p = product;
  const price = p.discount ? Math.round(p.price * 0.9) : p.price;
  const bodyStyle = lang === "ar" ? { fontFamily: "'Tajawal', sans-serif", direction: "rtl" as const } : {};
  const isMobile = useIsMobile();

  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 20px 64px" }}>
      <button onClick={() => navigate("shop")} style={{
        color: "#888899", background: "none", border: "none", cursor: "pointer", fontSize: 14, marginBottom: 32, display: "block",
      }}>
        {s.backToShop}
      </button>
      <div style={{
        display: "grid", gap: 40, alignItems: "start",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      }}>
        <div>
          <img src={p.image} alt={p.name} style={{ width: "100%", borderRadius: 12, objectFit: "cover" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, ...bodyStyle }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", color: "#888899" }}>{p.brand}</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#ffffff" }}>
            {lang === "ar" ? p.nameAr : p.name}
          </div>
          <div style={{ fontSize: 24, color: "#c9a84c" }}>
            {price} <span style={{ fontSize: 14 }}>EGP</span>
            {p.discount && <span style={{ fontSize: 14, color: "#888899", textDecoration: "line-through", marginLeft: 12 }}>{p.price} EGP</span>}
          </div>
          <div style={{ fontSize: 14, color: "#888899" }}>
            {lang === "ar" ? p.noteAr : p.note}
          </div>
          <div style={{ background: "#111118", border: "1px solid #2a2a3a", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 14, color: "#888899" }}><strong style={{ color: "#ffffff" }}>{s.topNote}:</strong> {p.notes.top}</div>
            <div style={{ fontSize: 14, color: "#888899" }}><strong style={{ color: "#ffffff" }}>{s.heartNote}:</strong> {p.notes.heart}</div>
            <div style={{ fontSize: 14, color: "#888899" }}><strong style={{ color: "#ffffff" }}>{s.baseNote}:</strong> {p.notes.base}</div>
          </div>
          <button
            onClick={() => add({ id: p.id, name: p.name, nameAr: p.nameAr, price, image: p.image })}
            style={{
              width: "100%", border: "1px solid #2a2a3a", borderRadius: 8, padding: 12,
              fontSize: 15, fontWeight: 500, color: "#ffffff", background: "transparent", cursor: "pointer",
            }}
          >
            {s.addToCart}
          </button>
          <a
            href={buildWhatsAppUrl(lang === "en"
              ? `I'd like to order ${p.name} — ${price} EGP`
              : `عايز أطلب ${p.nameAr} — ${price} EGP`)}
            target="_blank"
            rel="noreferrer"
            style={{
              width: "100%", display: "block", textAlign: "center",
              background: "#c9a84c", color: "#000", borderRadius: 8, padding: 12,
              fontSize: 15, fontWeight: 500, textDecoration: "none",
            }}
          >
            <MessageCircle size={16} style={{ verticalAlign: "middle", marginRight: 8 }} />
            {s.orderWhatsApp}
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  const { lang } = useLang();
  const s = tx[lang];
  const bodyStyle = lang === "ar" ? { fontFamily: "'Tajawal', sans-serif", direction: "rtl" as const } : {};

  return (
    <section style={{ padding: "64px 20px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <h2 style={{ fontWeight: 600, fontSize: 28, textAlign: "center", color: "#ffffff", margin: 0, ...bodyStyle }}>
          {s.aboutHeading}
        </h2>
        <div style={{ marginTop: 40, display: "grid", gap: 40, gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", alignItems: "center" }}>
          <div style={{ borderRadius: 12, overflow: "hidden" }}>
            <img src={storeImg} alt="Store" loading="lazy" style={{ width: "100%", display: "block", objectFit: "cover" }} />
          </div>
          <div>
            <p style={{ fontSize: 15, color: "#888899", lineHeight: 1.8, margin: 0, ...bodyStyle }}>
              {s.aboutBody}
            </p>
            <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <div style={{ border: "1px solid #2a2a3a", borderRadius: 8, padding: "12px 20px" }}>
                <div style={{ fontSize: 22, fontWeight: 600, color: "#c9a84c" }}>100%</div>
                <div style={{ fontSize: 11, color: "#888899" }}>{s.statOriginal}</div>
              </div>
              <div style={{ border: "1px solid #2a2a3a", borderRadius: 8, padding: "12px 20px" }}>
                <div style={{ fontSize: 22, fontWeight: 600, color: "#c9a84c" }}>8+</div>
                <div style={{ fontSize: 11, color: "#888899" }}>{s.statBrands}</div>
              </div>
              <div style={{ border: "1px solid #2a2a3a", borderRadius: 8, padding: "12px 20px" }}>
                <div style={{ fontSize: 22, fontWeight: 600, color: "#c9a84c" }}>24/7</div>
                <div style={{ fontSize: 11, color: "#888899" }}>{s.statWhatsApp}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GuidePage() {
  const { lang } = useLang();
  const s = tx[lang];
  const bodyStyle = lang === "ar" ? { fontFamily: "'Tajawal', sans-serif", direction: "rtl" as const } : {};
  const productNames = PRODUCTS.reduce((acc: Record<string, string>, p) => {
    acc[p.name] = lang === "ar" ? p.nameAr : p.name;
    return acc;
  }, {});

  const cards = [
    { time: s.morning, sub: s.morningSub, picks: ["Hawas Ice", "Cerulean Blue"] },
    { time: s.evening, sub: s.eveningSub, picks: ["Hawas Kobra", "Afro Leather"] },
    { time: s.allDay, sub: s.allDaySub, picks: ["Megara", "Kahilan"] },
  ];

  return (
    <section style={{ padding: "64px 20px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <h2 style={{ fontWeight: 600, fontSize: 28, textAlign: "center", color: "#ffffff", margin: 0, ...bodyStyle }}>
          {s.guideHeading}
        </h2>
        <div style={{ marginTop: 40, display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
          {cards.map(c => (
            <div key={c.time} style={{ background: "#111118", border: "1px solid #2a2a3a", borderRadius: 12, padding: 32 }}>
              <Sparkles size={24} color="#c9a84c" />
              <div style={{ marginTop: 24, fontSize: 24, fontWeight: 600, color: "#ffffff" }}>{c.time}</div>
              <div style={{ marginTop: 8, fontSize: 13, color: "#888899" }}>{c.sub}</div>
              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                {c.picks.map(pk => (
                  <div key={pk} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#ffffff" }}>
                    <span style={{ width: 12, height: 2, background: "#c9a84c", flexShrink: 0 }} />
                    {productNames[pk] || pk}
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

function FAQPage() {
  const { lang } = useLang();
  const s = tx[lang];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const bodyStyle = lang === "ar" ? { fontFamily: "'Tajawal', sans-serif", direction: "rtl" as const } : {};

  const faqs: Array<{ q: string; a: string }> = [
    { q: s.q1, a: s.a1 },
    { q: s.q2, a: s.a2 },
    { q: s.q3, a: s.a3 },
    { q: s.q4, a: s.a4 },
    { q: s.q5, a: s.a5 },
  ];

  return (
    <section style={{ maxWidth: 900, margin: "0 auto", padding: "64px 20px" }}>
      <h2 style={{ fontWeight: 600, fontSize: 28, textAlign: "center", color: "#ffffff", margin: 0, ...bodyStyle }}>
        {s.faqHeading}
      </h2>
      <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 12 }}>
        {faqs.map((item, i) => (
          <div key={i} style={{ background: "#111118", border: "1px solid #2a2a3a", borderRadius: 12 }}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{
                width: "100%", padding: "16px 20px", display: "flex", justifyContent: "space-between",
                alignItems: "center", fontSize: 15, fontWeight: 500, color: "#ffffff",
                background: "transparent", border: "none", cursor: "pointer",
                ...bodyStyle,
              }}
            >
              <span>{item.q}</span>
              <span style={{
                color: "#c9a84c", transition: "transform 0.2s",
                transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                display: "inline-block",
              }}>
                <ChevronDown size={16} />
              </span>
            </button>
            {openIndex === i && (
              <div style={{ padding: "0 20px 16px", fontSize: 14, color: "#888899", lineHeight: 1.8, ...bodyStyle }}>
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer({ navigate }: { navigate: (p: Page) => void }) {
  const { lang } = useLang();
  const s = tx[lang];
  const bodyStyle = lang === "ar" ? { fontFamily: "'Tajawal', sans-serif", direction: "rtl" as const } : {};

  const footerLinks: Array<{ label: string; page: Page }> = [
    { label: s.home, page: "home" },
    { label: s.shop, page: "shop" },
    { label: s.about, page: "about" },
    { label: s.guide, page: "guide" },
    { label: s.faq, page: "faq" },
  ];

  return (
    <footer style={{ borderTop: "1px solid #2a2a3a", background: "#0a0a0f", padding: "48px 20px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gap: 40, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 18, color: "#ffffff" }}>City Fragrance</div>
          <p style={{ marginTop: 8, fontSize: 13, color: "#888899", ...bodyStyle }}>{s.footerTagline}</p>
        </div>
        <div>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#888899", marginBottom: 12 }}>{s.footerContact}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#ffffff", textDecoration: "none" }}>
              <InstagramIcon size={16} /> @city_fragrance_
            </a>
            <a href={buildWhatsAppUrl(lang === "en" ? "Hello 👋" : "السلام عليكم 👋")} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#ffffff", textDecoration: "none" }}>
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#888899", marginBottom: 12 }}>{s.footerLinks}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {footerLinks.map(link => (
              <button key={link.page} onClick={() => navigate(link.page)} style={{
                background: "none", border: "none", padding: 0, cursor: "pointer",
                fontSize: 13, color: "#ffffff", textDecoration: "none", textAlign: "left", width: "fit-content",
              }}>
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #2a2a3a", paddingTop: 24, marginTop: 24, textAlign: "center", fontSize: 12, color: "#888899" }}>
        {s.rights}
      </div>
    </footer>
  );
}

function FloatingWA() {
  const { lang } = useLang();
  return (
    <a
      href={buildWhatsAppUrl(lang === "en" ? "Hello 👋" : "السلام عليكم 👋")}
      target="_blank"
      rel="noreferrer"
      style={{
        position: "fixed", bottom: 24, zIndex: 50,
        right: lang === "ar" ? undefined : 24,
        left: lang === "ar" ? 24 : undefined,
        width: 52, height: 52, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "#25D366", color: "white", textDecoration: "none",
      }}
    >
      <MessageCircle size={24} />
    </a>
  );
}