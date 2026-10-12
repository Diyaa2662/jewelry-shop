import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SlidersHorizontal } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import FilterSidebar from "../components/products/FilterSidebar";
import ProductCard from "../components/ui/ProductCard";

export default function Products() {
  const { t } = useTranslation();
  const { products } = useProducts();
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    categories: [],
    materials: [],
    stones: [],
    price: [0, 5000],
  });
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFilters, setMobileFilters] = useState(false);

  // مزامنة الـ URL مع الفلاتر (لما تفتح من النافبار)
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilters((prev) => ({ ...prev, categories: [cat] }));
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.category))
        return false;
      if (filters.materials.length) {
        const key =
          p.material === "White Gold" ? "whiteGold" : p.material.toLowerCase();
        if (!filters.materials.includes(key)) return false;
      }
      if (filters.stones.length) {
        const key = p.stone.toLowerCase();
        if (!filters.stones.includes(key)) return false;
      }
      if (p.price < filters.price[0] || p.price > filters.price[1])
        return false;
      return true;
    });

    if (sortBy === "priceLow")
      list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "priceHigh")
      list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "newest")
      list = [...list].sort(
        (a, b) => (b.badge === "New") - (a.badge === "New"),
      );

    return list;
  }, [products, filters, sortBy]);

  return (
    <div className="bg-cream">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </div>

        {/* Mobile filter toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileFilters(!mobileFilters)}
            className="flex items-center gap-2 text-sm border border-ink/20 px-4 py-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {t("products.filterBy")}
          </button>
        </div>

        {/* Main */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="text-sm text-ink/60">
              {t("products.showing")}{" "}
              <span className="text-ink font-medium">{filtered.length}</span>{" "}
              {t("products.results")}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-ink/60">{t("products.sortBy")}:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border border-ink/20 px-3 py-1.5 text-sm focus:outline-none focus:border-gold"
              >
                <option value="featured">{t("products.sort.featured")}</option>
                <option value="priceLow">{t("products.sort.priceLow")}</option>
                <option value="priceHigh">
                  {t("products.sort.priceHigh")}
                </option>
                <option value="newest">{t("products.sort.newest")}</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-ink/50">
              {t("products.noResults")}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFilters && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setMobileFilters(false)}
        >
          <div
            className="absolute top-0 start-0 h-full w-80 max-w-[85%] bg-cream overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>
        </div>
      )}
    </div>
  );
}
