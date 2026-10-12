import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-ink text-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center min-h-[560px]">
        {/* Text */}
        <div className="px-6 sm:px-10 lg:px-16 py-16 lg:py-24 z-10">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
            {t("home.hero.line1")}
            <br />
            <span className="text-gold">{t("home.hero.line2")}</span>
          </h1>
          <p className="text-white/70 max-w-md mb-8 leading-relaxed">
            {t("home.hero.description")}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/products"
              className="bg-gold hover:bg-gold-dark text-ink font-medium px-6 py-3 transition-colors tracking-wide text-sm"
            >
              {t("home.hero.exploreMore")}
            </Link>
            <Link
              to="/products"
              className="flex items-center gap-2 text-white/90 hover:text-gold text-sm tracking-wide transition-colors"
            >
              {t("home.hero.exploreCollection")}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative h-[400px] lg:h-full">
          <img
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200"
            alt="Gold ring"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent rtl:bg-gradient-to-l" />
        </div>
      </div>
    </section>
  );
}
