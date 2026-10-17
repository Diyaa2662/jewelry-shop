/* eslint-disable react-hooks/set-state-in-effect */
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SlidersHorizontal, X } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import { useCategoriesLookup, useMaterialsLookup } from "../../hooks/useLookup";
import FilterSidebar from "../../components/products/FilterSidebar";
import ProductCard from "../../components/ui/ProductCard";
import Pagination from "../../components/ui/Pagination";

const PER_PAGE = 9;

const EMPTY_FILTERS = {
  categories: [],
  materials: [],
  price: [0, Infinity],
};

export default function Products() {
  const { t } = useTranslation();
  const { products, loading, error } = useProducts();
  const { categories } = useCategoriesLookup();
  const { materials } = useMaterialsLookup();
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);
  const [mobileFilters, setMobileFilters] = useState(false);

  // أعلى سعر من المنتجات (ثابت، ما بيتغير مع الفلاتر)
  const maxPrice = useMemo(() => {
    if (!products.length) return 0;
    return Math.ceil(Math.max(...products.map((p) => p.price)) / 50) * 50;
  }, [products]);

  // نحدّث السعر لما نعرف maxPrice
  useEffect(() => {
    if (maxPrice > 0) {
      setFilters((prev) => ({
        ...prev,
        price: [0, maxPrice],
      }));
    }
  }, [maxPrice]);

  // مزامنة ?category= من الـ URL — مرة وحدة عند التحميل
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      const id = Number(cat);
      if (!Number.isNaN(id)) {
        setFilters((prev) => ({
          ...prev,
          categories: [id],
        }));
      }
    }
  }, [searchParams]);

  // ==== الفلترة (client-side) ====
  const filtered = useMemo(() => {
    // في حال لسا ما تحملت maxPrice، منخلي الفلتر يشتغل بدون قيد السعر
    const priceLimit = maxPrice > 0 ? filters.price[1] : Infinity;

    let list = products.filter((p) => {
      // الفئات: OR داخل نفس القسم
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(p.category_id)) return false;
      }

      // المواد: OR داخل نفس القسم
      if (filters.materials.length > 0) {
        if (!filters.materials.includes(p.material_id)) return false;
      }

      // السعر
      if (p.price > priceLimit) return false;

      return true;
    });

    // الترتيب
    if (sortBy === "priceLow") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHigh") {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === "featured") {
      // المميزة أولاً، ثم الأحدث إضافة
      list = [...list].sort((a, b) => {
        if (a.featured === b.featured) return b.id - a.id;
        return b.featured ? 1 : -1;
      });
    } else if (sortBy === "newest") {
      // وصل حديثاً أولاً، ثم الأحدث إضافة
      list = [...list].sort((a, b) => {
        if (a.newly_arrived === b.newly_arrived) return b.id - a.id;
        return b.newly_arrived ? 1 : -1;
      });
    }
    return list;
  }, [products, filters, sortBy, maxPrice]);

  // ==== Pagination ====
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, page]);

  // لو تغيّرت الفلاتر أو الترتيب → نرجع للصفحة 1
  useEffect(() => {
    setPage(1);
  }, [filters, sortBy]);

  // لو تجاوزنا عدد الصفحات → نرجع لآخر صفحة موجودة
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  // عدد الفلاتر المفعّلة (لشاشة الموبايل)
  const activeFiltersCount =
    filters.categories.length + filters.materials.length;

  const clearFilters = () => {
    setFilters({
      categories: [],
      materials: [],
      price: [0, maxPrice],
    });
  };

  return (
    <div className="bg-cream">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10">
        {/* Sidebar — Desktop */}
        <div className="hidden lg:block">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            materials={materials}
            maxPrice={maxPrice}
            onClearAll={clearFilters}
          />
        </div>

        {/* Mobile filter toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileFilters(true)}
            className="flex items-center gap-2 text-sm border border-ink/20 px-4 py-2 relative"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {t("products.filterBy")}
            {activeFiltersCount > 0 && (
              <span className="bg-gold text-ink text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Main */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="text-sm text-ink/60">
              {loading ? (
                t("common.loading")
              ) : (
                <>
                  {t("products.showing")}{" "}
                  <span className="text-ink font-medium">
                    {filtered.length}
                  </span>{" "}
                  {t("products.results")}
                </>
              )}
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
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-ink/5 mb-4" />
                  <div className="h-4 bg-ink/5 w-3/4 mx-auto mb-2" />
                  <div className="h-3 bg-ink/5 w-1/2 mx-auto" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-600 text-sm">
              {t("products.error")}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-ink/50">
              {t("products.empty")}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-ink/50 mb-4">{t("products.noResults")}</p>
              <button
                onClick={clearFilters}
                className="text-sm text-gold hover:text-gold-dark underline underline-offset-4"
              >
                {t("products.clearAll")}
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {paginated.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onChange={setPage}
                />
              )}
            </>
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
            className="absolute top-0 start-0 h-full w-80 max-w-[85%] bg-cream overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header مع زر إغلاق */}
            <div className="sticky top-0 bg-cream border-b border-ink/10 px-6 py-4 flex items-center justify-between z-10">
              <span className="text-sm font-semibold uppercase tracking-wider">
                {t("products.filterBy")}
              </span>
              <button
                onClick={() => setMobileFilters(false)}
                className="text-ink/60 hover:text-ink"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                categories={categories}
                materials={materials}
                maxPrice={maxPrice}
                onClearAll={clearFilters}
                hideHeader
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
