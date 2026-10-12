import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const categories = [
  {
    key: "rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
  },
  {
    key: "necklaces",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
  },
  {
    key: "earrings",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400",
  },
  {
    key: "bracelets",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
  },
  {
    key: "wedding",
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=400",
  },
];

export default function ShopByCategory() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-3xl sm:text-4xl text-center mb-12">
          {t("home.shopByCategory")}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              to={`/products?category=${cat.key}`}
              className="group flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-gold transition-colors">
                <img
                  src={cat.image}
                  alt={t(`home.categories.${cat.key}`)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="text-sm tracking-wider uppercase text-ink/80 group-hover:text-gold transition-colors">
                {t(`home.categories.${cat.key}`)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
