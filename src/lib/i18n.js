import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../locales/en/translation.json";
import ar from "../locales/ar/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: "ar", // ← الافتراضية عربي
    supportedLngs: ["ar", "en"],
    interpolation: { escapeValue: false },
    detection: {
      // الترتيب: نتحقق أولاً من localStorage (لو المستخدم اختار لغة قبل)،
      // وإذا ما لقى شي، بيرجع للـ fallbackLng (عربي)
      order: ["localStorage"],
      caches: ["localStorage"],
    },
  });

// ضبط اتجاه الصفحة عند التغيير
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
});

// ضبط الاتجاه فوراً عند التحميل الأول
const initialLng = i18n.language || "ar";
document.documentElement.lang = initialLng;
document.documentElement.dir = initialLng === "ar" ? "rtl" : "ltr";

export default i18n;
