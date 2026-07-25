import { createContext, useContext, useState, useEffect } from "react";
type Lang = "en" | "ar";
const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem("cf-lang") as Lang) || "en";
  });
  const set = (l: Lang) => { setLang(l); localStorage.setItem("cf-lang", l); };
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);
  return <LangContext.Provider value={{ lang, setLang: set }}>{children}</LangContext.Provider>;
}

export function useLang() { return useContext(LangContext); }