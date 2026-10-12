import { Heart, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../../lib/utils";

export default function ProductCard({ product }) {
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation();

  return (
    <div className="group relative bg-white">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {product.badge && (
          <span className="absolute top-3 start-3 bg-gold text-ink text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1">
            {product.badge}
          </span>
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
        <h3 className="text-sm font-medium text-ink/90 mb-2">{product.name}</h3>

        <div className="flex items-center justify-center gap-1 mb-2">
          <div className="flex text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3"
                fill={i < product.rating ? "currentColor" : "none"}
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className="text-[11px] text-ink/50">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-gold font-semibold">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-ink/40 line-through text-xs">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
