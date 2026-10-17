import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHomeProducts } from "../../hooks/useProducts";
import ProductCard from "../ui/ProductCard";
import { cn } from "../../lib/utils";

export default function FeaturedCollection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");

  const { products, loading, error } = useHomeProducts(activeTab);

  const tabs = [
    { key: "all", label: t("home.tabs.all") },
    { key: "best", label: t("home.tabs.bestSellers") },
    { key: "new", label: t("home.tabs.newArrivals") },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-3xl sm:text-4xl text-center mb-8">
          {t("home.featuredCollection")}
        </h2>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-8 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "text-sm tracking-wider uppercase pb-2 border-b-2 transition-colors",
                activeTab === tab.key
                  ? "text-gold border-gold"
                  : "text-ink/50 border-transparent hover:text-ink",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-ink/5 mb-4" />
                <div className="h-4 bg-ink/5 w-3/4 mx-auto mb-2" />
                <div className="h-3 bg-ink/5 w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-600 text-sm">
            {t("products.error")}
          </p>
        ) : products.length === 0 ? (
          <p className="text-center text-ink/50 text-sm">
            {t("products.empty")}
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
