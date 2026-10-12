import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../ui/ProductCard";
import { cn } from "../../lib/utils";

export default function FeaturedCollection() {
  const { t } = useTranslation();
  const { products } = useProducts();
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { key: "all", label: t("home.tabs.all") },
    { key: "best", label: t("home.tabs.bestSellers") },
    { key: "new", label: t("home.tabs.newArrivals") },
  ];

  const filtered = products
    .filter((p) => {
      if (activeTab === "all") return true;
      if (activeTab === "new") return p.badge === "New";
      if (activeTab === "best") return p.reviews >= 30;
      return true;
    })
    .slice(0, 4);

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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
