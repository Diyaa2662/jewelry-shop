import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function CustomJewelryCTA() {
  const { t } = useTranslation();

  return (
    <section className="bg-cream">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <div className="relative h-[320px] lg:h-auto lg:min-h-[400px]">
          <img
            src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1000"
            alt="Jewelry craftsmanship"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="px-6 sm:px-10 lg:px-16 py-16 lg:py-24 flex flex-col justify-center">
          <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4">
            {t("home.customJewelry.label")}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
            {t("home.customJewelry.title")}
          </h2>
          <p className="text-ink/70 leading-relaxed mb-8 max-w-md">
            {t("home.customJewelry.description")}
          </p>
          <Link
            to="/products"
            className="self-start bg-ink hover:bg-gold hover:text-ink text-white font-medium px-6 py-3 transition-colors tracking-wide text-sm uppercase"
          >
            {t("home.customJewelry.cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
