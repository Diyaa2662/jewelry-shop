import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "../../lib/utils";
import { useCategoriesLookup } from "../../hooks/useLookup";
import LanguageSwitcher from "../ui/LanguageSwitcher";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  // ✅ نجيب الفئات من الباك
  const { categories } = useCategoriesLookup();

  // إغلاق الدروب داون لما نغير الصفحة
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCatOpen(false);
    setMobileOpen(false);
    setMobileCatOpen(false);
  }, [location.pathname, location.search]);

  // إغلاق لما نضغط برا
  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCatOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const navLinks = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.shop"), to: "/products" },
  ];

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-ink text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          <span className="hidden sm:block text-white/70">
            {t("topbar.freeShipping")}
          </span>
          <div className="flex items-center gap-6 mx-auto sm:mx-0">
            <span className="flex items-center gap-1.5 text-white/80">
              <span className="text-gold">✦</span> {t("topbar.warranty")}
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-white/80">
              <span className="text-gold">↺</span> {t("topbar.returns")}
            </span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-ink text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/diamond.png"
              alt={t("brand.name")}
              className="w-10 h-10 object-contain"
            />
            <div className="leading-tight">
              <div className="font-serif text-lg tracking-widest text-gold">
                {t("brand.name")}
              </div>
              <div className="text-[9px] tracking-[0.3em] text-white/60">
                {t("brand.subtitle")}
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-7 text-sm">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-1 text-white/80 hover:text-gold transition-colors pb-1 border-b border-transparent",
                      isActive && link.to !== "/" && "text-gold border-gold",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            {/* Categories Dropdown */}
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCatOpen(!catOpen)}
                className={cn(
                  "flex items-center gap-1 text-white/80 hover:text-gold transition-colors pb-1 border-b border-transparent",
                  catOpen && "text-gold border-gold",
                )}
              >
                {t("nav.categories")}
                <ChevronDown
                  className={cn(
                    "w-3 h-3 transition-transform",
                    catOpen && "rotate-180",
                  )}
                />
              </button>

              {catOpen && (
                <div className="absolute top-full start-0 mt-3 w-56 bg-ink border border-white/10 shadow-xl py-2 z-50">
                  {categories.length === 0 ? (
                    <div className="px-5 py-2.5 text-sm text-white/40">
                      {t("common.loading")}
                    </div>
                  ) : (
                    categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/products?category=${cat.id}`}
                        className="block px-5 py-2.5 text-sm text-white/70 hover:text-gold hover:bg-white/5 transition-colors"
                      >
                        {isAr ? cat.name_ar : cat.name_en}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </li>

            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-1 text-white/80 hover:text-gold transition-colors pb-1 border-b border-transparent",
                    isActive && "text-gold border-gold",
                  )
                }
              >
                {t("nav.contact")}
              </NavLink>
            </li>
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Search"
              className="hover:text-gold transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              aria-label="Account"
              className="hover:text-gold transition-colors"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              aria-label="Cart"
              className="relative hover:text-gold transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-gold text-ink text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
            <button
              aria-label="Menu"
              className="lg:hidden hover:text-gold"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 px-4 py-4">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    className="block py-2.5 text-white/80 hover:text-gold"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}

              {/* Mobile Categories */}
              <li>
                <button
                  onClick={() => setMobileCatOpen(!mobileCatOpen)}
                  className="flex items-center justify-between w-full py-2.5 text-white/80 hover:text-gold"
                >
                  {t("nav.categories")}
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      mobileCatOpen && "rotate-180",
                    )}
                  />
                </button>
                {mobileCatOpen && (
                  <ul className="ps-4 pb-2 border-s border-white/10 ms-2">
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <Link
                          to={`/products?category=${cat.id}`}
                          className="block py-2 text-sm text-white/60 hover:text-gold"
                        >
                          {isAr ? cat.name_ar : cat.name_en}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className="block py-2.5 text-white/80 hover:text-gold"
                >
                  {t("nav.contact")}
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
