import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  SiFacebook,
  SiInstagram,
  SiX,
  SiYoutube,
} from "@icons-pack/react-simple-icons";

const socialIcons = [
  { Icon: SiFacebook, label: "Facebook" },
  { Icon: SiInstagram, label: "Instagram" },
  { Icon: SiX, label: "X" },
  { Icon: SiYoutube, label: "Youtube" },
];

export default function Footer() {
  const { t } = useTranslation();

  const shopLinks = [
    t("footer.links.rings"),
    t("footer.links.necklaces"),
    t("footer.links.earrings"),
    t("footer.links.bracelets"),
    t("footer.links.wedding"),
  ];
  const helpLinks = [
    t("footer.links.contactUs"),
    t("footer.links.shipping"),
    t("footer.links.returns"),
    t("footer.links.sizeGuide"),
    t("footer.links.faq"),
  ];
  const aboutLinks = [
    t("footer.links.ourStory"),
    t("footer.links.sustainability"),
    t("footer.links.careers"),
    t("footer.links.blog"),
    t("footer.links.press"),
  ];

  return (
    <footer className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src="/diamond.png"
              alt="Luxora Jewelry"
              className="w-10 h-10 object-contain"
            />
            <div className="leading-tight">
              <div className="font-serif text-lg tracking-widest text-gold">
                LUXORA
              </div>
              <div className="text-[9px] tracking-[0.3em] text-white/60">
                JEWELRY
              </div>
            </div>
          </div>
          <p className="text-sm text-white/60 leading-relaxed mb-6">
            {t("footer.tagline")}
          </p>
          <div className="flex items-center gap-3">
            {socialIcons.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 border border-white/15 rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title={t("footer.shop")} links={shopLinks} />
        <FooterColumn title={t("footer.help")} links={helpLinks} />
        <FooterColumn title={t("footer.about")} links={aboutLinks} />
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>{t("footer.rights")}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">
              {t("footer.privacy")}
            </a>
            <a href="#" className="hover:text-gold">
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="font-serif text-lg mb-4 text-gold">{title}</h4>
      <ul className="space-y-2.5 text-sm">
        {links.map((link) => (
          <li key={link}>
            <Link
              to="/products"
              className="text-white/60 hover:text-gold transition-colors"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
