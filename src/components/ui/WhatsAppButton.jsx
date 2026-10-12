import { useTranslation } from "react-i18next";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

export default function WhatsAppButton() {
  const { t } = useTranslation();

  // بدلها لاحقاً برقم المحل الحقيقي
  const phone = "962700000000";
  const message = t("whatsapp.message");
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp.label")}
      className="fixed bottom-6 end-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
    >
      <SiWhatsapp className="w-7 h-7" />
    </a>
  );
}
