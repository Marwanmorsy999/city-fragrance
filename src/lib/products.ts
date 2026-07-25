import hawasIce from "@/assets/images/p-hawas-ice.jpg";
import hawasKobra from "@/assets/images/p-hawas-kobra.jpg";
import pinkDiamond from "@/assets/images/p-pink-diamond.jpg";
import muskAlfajr from "@/assets/images/p-musk-alfajr.jpg";
import megara from "@/assets/images/p-megara.jpg";
import cerulean from "@/assets/images/p-cerulean.jpg";
import afroLeather from "@/assets/images/p-afro-leather.jpg";
import kahilan from "@/assets/images/p-kahilan.jpg";

export type Category = "men" | "women" | "unisex" | "oud" | "summer";

export type Product = {
  id: string;
  name: string;
  nameAr: string;
  brand: string;
  price: number;
  image: string;
  categories: Category[];
  note: string;
  discount?: boolean;
  notes: {
    top: string;
    heart: string;
    base: string;
  };
};

export const PRODUCTS: Product[] = [
  { id: "hawas-ice", name: "Hawas Ice", nameAr: "هواس آيس", brand: "Rasasi", price: 1450, image: hawasIce, categories: ["men", "summer"], note: "Fresh masculine", discount: true, notes: { top: "Bergamot, Lemon", heart: "Lavender, Cardamom", base: "Amber, Musk" } },
  { id: "hawas-kobra", name: "Hawas Kobra", nameAr: "هواس كوبرا", brand: "Rasasi", price: 1650, image: hawasKobra, categories: ["men"], note: "Bold masculine", notes: { top: "Spicy, Ginger", heart: "Jasmine, Rose", base: "Leather, Cedar" } },
  { id: "pink-diamond", name: "Pink Diamond", nameAr: "بينك دايموند", brand: "Fragrance World", price: 1200, image: pinkDiamond, categories: ["women"], note: "Floral feminine", discount: true, notes: { top: "Strawberry, Peach", heart: "Rose, Orchid", base: "Vanilla, Amber, Musk" } },
  { id: "musk-alfajr", name: "Musk Al Fajr", nameAr: "مسك الفجر", brand: "Ard Al Zaafaran", price: 950, image: muskAlfajr, categories: ["women", "oud"], note: "Oriental feminine", notes: { top: "Citrus, Lemon", heart: "Jasmine, Orange Blossom", base: "White Musk, Amber" } },
  { id: "megara", name: "Megara", nameAr: "ميجارا", brand: "Maison Alhambra", price: 1750, image: megara, categories: ["unisex", "summer"], note: "Premium summer", discount: true, notes: { top: "Fresh, Grapefruit", heart: "Rose, Jasmine", base: "Sandalwood, Amber, Musk" } },
  { id: "cerulean-blue", name: "Cerulean Blue", nameAr: "سيرولين بلو", brand: "Fragrance World", price: 1100, image: cerulean, categories: ["men", "summer"], note: "Fresh fruity", notes: { top: "Blue Raspberry, Bergamot", heart: "Seaweed, Algae", base: "Marine, Moss, Amber" } },
  { id: "afro-leather", name: "Afro Leather", nameAr: "أفرو ليذر", brand: "Memo Paris", price: 2400, image: afroLeather, categories: ["unisex"], note: "Niche leather", notes: { top: "Leather, Tobacco", heart: "Sandalwood, Rose", base: "Amber, Cedar" } },
  { id: "kahilan", name: "Kahilan", nameAr: "كيلان", brand: "Dokhoon Al Emarat", price: 1850, image: kahilan, categories: ["oud", "unisex"], note: "Arabic oud", discount: true, notes: { top: "Cardamom, Ginger", heart: "Jasmine, Lotus", base: "Oud, Amber, Musk" } },
];

export const FILTERS: { id: Category | "all"; label: string; labelAr: string }[] = [
  { id: "all", label: "All", labelAr: "الكل" },
  { id: "men", label: "Men", labelAr: "رجالي" },
  { id: "women", label: "Women", labelAr: "حريمي" },
  { id: "unisex", label: "Unisex", labelAr: "للجنسين" },
  { id: "oud", label: "Arabic Oud", labelAr: "عود عربي" },
  { id: "summer", label: "Summer", labelAr: "صيفي" },
];
