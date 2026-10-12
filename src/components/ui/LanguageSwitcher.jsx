import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const toggle = () => {
    i18n.changeLanguage(isAr ? "en" : "ar");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Switch language"
      className="flex items-center gap-1.5 text-xs text-white/80 hover:text-gold transition-colors"
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">{isAr ? "EN" : "AR"}</span>
    </button>
  );
}
