import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { cn, formatPrice } from "../../lib/utils";

export default function FilterSidebar({
  filters,
  setFilters,
  categories = [],
  materials = [],
  maxPrice = 0,
  onClearAll,
  hideHeader = false,
}) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  // تبديل قيمة بـ array (checkbox)
  const toggleArrayValue = (key, id) => {
    setFilters((prev) => {
      const current = prev[key] || [];
      const next = current.includes(id)
        ? current.filter((v) => v !== id)
        : [...current, id];
      return { ...prev, [key]: next };
    });
  };

  // تغيير السعر
  const handlePriceChange = (val) => {
    setFilters((prev) => ({
      ...prev,
      price: [0, Number(val)],
    }));
  };

  const currentMax = filters.price?.[1] ?? maxPrice;
  const hasActiveFilters =
    filters.categories?.length > 0 || filters.materials?.length > 0;

  return (
    <aside className="w-full lg:w-64 shrink-0">
      {!hideHeader && (
        <>
          {/* Breadcrumb */}
          <div className="text-xs text-ink/50 mb-6">
            <span>{t("products.breadcrumbShop")}</span>
            <span className="mx-1.5">›</span>
            <span className="text-ink/80">{t("products.title")}</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl mb-2">{t("products.title")}</h1>
            <p className="text-xs text-ink/60 leading-relaxed">
              {t("products.subtitle")}
            </p>
          </div>
        </>
      )}

      <div className="border-t border-ink/10 pt-6">
        {/* ===== Categories ===== */}
        <FilterSection title={t("products.categories")} defaultOpen>
          <ul className="space-y-2.5">
            {categories.length === 0 ? (
              <li className="text-xs text-ink/40">{t("common.loading")}</li>
            ) : (
              categories.map((cat) => {
                const checked = filters.categories?.includes(cat.id) || false;
                return (
                  <li key={cat.id}>
                    <label className="flex items-center gap-2 text-sm text-ink/70 hover:text-ink cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-gold w-3.5 h-3.5"
                        checked={checked}
                        onChange={() => toggleArrayValue("categories", cat.id)}
                      />
                      {isAr ? cat.name_ar : cat.name_en}
                    </label>
                  </li>
                );
              })
            )}
          </ul>
        </FilterSection>

        {/* ===== Price ===== */}
        <FilterSection title={t("products.price")} defaultOpen>
          <input
            type="range"
            min="0"
            max={maxPrice || 100}
            step="50"
            value={currentMax}
            onChange={(e) => handlePriceChange(e.target.value)}
            className="w-full accent-gold"
          />
          <div className="flex justify-between text-xs text-ink/60 mt-2">
            <span>{formatPrice(0)}</span>
            <span className="text-ink font-medium">
              {formatPrice(currentMax)}
            </span>
          </div>
        </FilterSection>

        {/* ===== Materials ===== */}
        <FilterSection title={t("products.material")} defaultOpen>
          <ul className="space-y-2.5">
            {materials.length === 0 ? (
              <li className="text-xs text-ink/40">{t("common.loading")}</li>
            ) : (
              materials.map((m) => {
                const checked = filters.materials?.includes(m.id) || false;
                return (
                  <li key={m.id}>
                    <label className="flex items-center gap-2 text-sm text-ink/70 hover:text-ink cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-gold w-3.5 h-3.5"
                        checked={checked}
                        onChange={() => toggleArrayValue("materials", m.id)}
                      />
                      {isAr ? m.name_ar : m.name_en}
                    </label>
                  </li>
                );
              })
            )}
          </ul>
        </FilterSection>

        {/* Clear All */}
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="mt-6 text-xs text-gold hover:text-gold-dark underline underline-offset-4"
          >
            {t("products.clearAll")}
          </button>
        )}
      </div>
    </aside>
  );
}

function FilterSection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-ink/10 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-wider text-ink/80 mb-3"
      >
        {title}
        <ChevronDown
          className={cn("w-4 h-4 transition-transform", open && "rotate-180")}
        />
      </button>
      {open && <div className="pt-1">{children}</div>}
    </div>
  );
}
