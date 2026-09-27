import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";

type Lang = "ar" | "en";
const LanguageContext = createContext<{ lang: Lang; toggleLang: () => void } | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === "ar" ? "en" : "ar"));

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>{children}</LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
