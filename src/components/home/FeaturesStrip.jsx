import { useTranslation } from "react-i18next";
import { Truck, ShieldCheck, RotateCcw, Lock } from "lucide-react";

export default function FeaturesStrip() {
  const { t } = useTranslation();

  const features = [
    {
      Icon: Truck,
      title: t("home.features.freeShipping.title"),
      subtitle: t("home.features.freeShipping.subtitle"),
    },
    {
      Icon: ShieldCheck,
      title: t("home.features.warranty.title"),
      subtitle: t("home.features.warranty.subtitle"),
    },
    {
      Icon: RotateCcw,
      title: t("home.features.returns.title"),
      subtitle: t("home.features.returns.subtitle"),
    },
    {
      Icon: Lock,
      title: t("home.features.secure.title"),
      subtitle: t("home.features.secure.subtitle"),
    },
  ];

  return (
    <section className="bg-ink text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ Icon, title, subtitle }, i) => (
          <div key={i} className="flex items-center gap-3">
            <Icon className="w-7 h-7 text-gold shrink-0" strokeWidth={1.5} />
            <div className="min-w-0">
              <div className="text-sm font-medium">{title}</div>
              <div className="text-[11px] text-white/50 truncate">
                {subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
