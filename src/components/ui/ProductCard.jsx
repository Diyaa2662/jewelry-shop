import { Heart, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../../lib/utils";

export default function ProductCard({ product }) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const name = isAr ? product.name_ar : product.name_en;
  const image = product.images?.[0]?.url;
  const rating = Math.round(product.rating || 0);

  return (
    <div className="group relative bg-white">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink/20">
            <span className="text-xs">
              {t("products.noImage") || "No image"}
            </span>
          </div>
        )}

        <button
          aria-label="Add to wishlist"
          className="absolute top-3 end-3 w-9 h-9 bg-white/90 hover:bg-gold hover:text-white text-ink flex items-center justify-center transition-colors"
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Info */}
      <div className="pt-4 pb-2 text-center">
        <h3 className="text-sm font-medium text-ink/90 mb-2 line-clamp-2">
          {name}
        </h3>

        <div className="flex items-center justify-center gap-1 mb-2">
          <div className="flex text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3"
                fill={i < rating ? "currentColor" : "none"}
                strokeWidth={1.5}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-gold font-semibold">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
}
