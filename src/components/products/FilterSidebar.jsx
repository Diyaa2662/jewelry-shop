import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

const CATEGORIES = ["rings", "necklaces", "earrings", "bracelets", "wedding"];
const MATERIALS = ["gold", "whiteGold", "platinum", "silver"];
const STONES = ["diamond", "pearl", "emerald", "ruby"];

export default function FilterSidebar({ filters, setFilters }) {
  const { t } = useTranslation();

  const updateFilter = (key, value) => {
    setFilters((prev) => {
      const current = prev[key] || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const clearAll = () =>
    setFilters({ categories: [], materials: [], stones: [], price: [0, 5000] });

  return (
    <aside className="w-full lg:w-64 shrink-0">
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

      <div className="border-t border-ink/10 pt-6">
        <FilterSection title={t("products.categories")} defaultOpen>
          <ul className="space-y-2.5">
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <label className="flex items-center gap-2 text-sm text-ink/70 hover:text-ink cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-gold w-3.5 h-3.5"
                    checked={filters.categories?.includes(cat) || false}
                    onChange={() => updateFilter("categories", cat)}
                  />
                  {t(`home.categories.${cat}`)}
                </label>
              </li>
            ))}
          </ul>
        </FilterSection>

        <FilterSection title={t("products.filterBy")} defaultOpen>
          <div className="mb-5">
            <div className="text-xs text-ink/60 mb-2">
              {t("products.price")}
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              value={filters.price?.[1] ?? 5000}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  price: [0, Number(e.target.value)],
                }))
              }
              className="w-full accent-gold"
            />
            <div className="flex justify-between text-xs text-ink/60 mt-1">
              <span>$0</span>
              <span>${filters.price?.[1] ?? 5000}</span>
            </div>
          </div>

          <div className="text-xs text-ink/60 mb-2">
            {t("products.material")}
          </div>
          <ul className="space-y-2.5 mb-5">
            {MATERIALS.map((m) => (
              <li key={m}>
                <label className="flex items-center gap-2 text-sm text-ink/70 hover:text-ink cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-gold w-3.5 h-3.5"
                    checked={filters.materials?.includes(m) || false}
                    onChange={() => updateFilter("materials", m)}
                  />
                  {t(`products.materials.${m}`)}
                </label>
              </li>
            ))}
          </ul>

          <div className="text-xs text-ink/60 mb-2">{t("products.stone")}</div>
          <ul className="space-y-2.5">
            {STONES.map((s) => (
              <li key={s}>
                <label className="flex items-center gap-2 text-sm text-ink/70 hover:text-ink cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-gold w-3.5 h-3.5"
                    checked={filters.stones?.includes(s) || false}
                    onChange={() => updateFilter("stones", s)}
                  />
                  {t(`products.stones.${s}`)}
                </label>
              </li>
            ))}
          </ul>
        </FilterSection>

        <button
          onClick={clearAll}
          className="mt-6 text-xs text-gold hover:text-gold-dark underline underline-offset-4"
        >
          {t("products.clearAll")}
        </button>
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
