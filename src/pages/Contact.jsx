import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactInfoCard from "../components/contact/ContactInfoCard";
import ContactForm from "../components/contact/ContactForm";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="bg-cream">
      {/* Header */}
      <div className="bg-ink text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-xs text-white/50 mb-3">
            <span>{t("products.breadcrumbHome")}</span>
            <span className="mx-1.5">›</span>
            <span className="text-gold">{t("contact.breadcrumb")}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl mb-3">
            {t("contact.title")}
          </h1>
          <p className="text-white/60 max-w-xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Info column */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-serif text-2xl mb-6">
              {t("contact.info.title")}
            </h2>

            <div className="space-y-6">
              <ContactInfoCard
                icon={MapPin}
                title={t("contact.info.title")}
                lines={[t("contact.info.address")]}
              />
              <ContactInfoCard
                icon={Phone}
                title={t("contact.info.phone")}
                lines={[t("contact.info.phone")]}
              />
              <ContactInfoCard
                icon={Mail}
                title={t("contact.info.email")}
                lines={[t("contact.info.email")]}
              />
              <ContactInfoCard
                icon={Clock}
                title={t("contact.info.hours.title")}
                lines={[
                  t("contact.info.hours.weekdays"),
                  t("contact.info.hours.weekend"),
                ]}
              />
            </div>
          </div>

          {/* Map */}
          <div className="aspect-video border border-ink/10 overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=80"
              alt="Store location map"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-ink/10 pointer-events-none" />

            {/* Pin marker */}
            <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-full pointer-events-none">
              <div className="relative">
                <MapPin
                  className="w-10 h-10 text-gold drop-shadow-lg"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <div className="absolute top-full start-1/2 -translate-x-1/2 w-4 h-4 bg-gold/40 rounded-full blur-sm" />
              </div>
            </div>

            {/* Overlay button */}
            <a
              href="https://maps.google.com/?q=Amman+Jordan"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 end-4 bg-ink/90 hover:bg-gold hover:text-ink text-white text-xs tracking-wider uppercase px-4 py-2 transition-colors"
            >
              {t("contact.info.openMap") || "Open in Google Maps"}
            </a>
          </div>
        </div>

        {/* Form column */}
        <div className="lg:col-span-3 bg-white p-8 lg:p-10 border border-ink/5">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
