import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useFeaturedCategories } from "../../hooks/useFeaturedCategories";

export default function ShopByCategory() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const { categories, loading } = useFeaturedCategories();

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-3xl sm:text-4xl text-center mb-12">
          {t("home.shopByCategory")}
        </h2>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-ink/5 animate-pulse mb-4" />
                <div className="h-4 w-20 bg-ink/5 animate-pulse" />
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <p className="text-center text-ink/50">{t("products.empty")}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((item) => {
              const name = isAr ? item.category.name_ar : item.category.name_en;
              return (
                <Link
                  key={item.id}
                  to={`/products?category=${item.category_id}`}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-gold transition-colors">
                    <img
                      src={item.image.url}
                      alt={name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-sm tracking-wider uppercase text-ink/80 group-hover:text-gold transition-colors">
                    {name}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
