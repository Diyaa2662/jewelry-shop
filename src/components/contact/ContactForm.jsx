import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const { t } = useTranslation();
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    // TODO: لما يجهز الباك إند، نبدل هالسطر بـ apiFetch("/contact", { method: "POST", body: JSON.stringify(form) })
    await new Promise((r) => setTimeout(r, 800));
    console.log("📩 Contact form submitted:", form);

    setStatus("success");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });

    setTimeout(() => setStatus("idle"), 4000);
  };

  const inputClass =
    "w-full bg-transparent border border-ink/20 focus:border-gold outline-none px-4 py-3 text-sm transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="font-serif text-2xl mb-6">{t("contact.form.title")}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/60 mb-2">
            {t("contact.form.name")}
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder={t("contact.form.namePlaceholder")}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/60 mb-2">
            {t("contact.form.email")}
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder={t("contact.form.emailPlaceholder")}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/60 mb-2">
            {t("contact.form.phone")}
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder={t("contact.form.phonePlaceholder")}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/60 mb-2">
            {t("contact.form.subject")}
          </label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder={t("contact.form.subjectPlaceholder")}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-ink/60 mb-2">
          {t("contact.form.message")}
        </label>
        <textarea
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder={t("contact.form.messagePlaceholder")}
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 bg-ink hover:bg-gold hover:text-ink text-white px-8 py-3.5 text-sm tracking-wider uppercase transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? (
          t("contact.form.submitting")
        ) : (
          <>
            {t("contact.form.submit")}
            <Send className="w-4 h-4 rtl:rotate-180" />
          </>
        )}
      </button>

      {status === "success" && (
        <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-4 py-3 text-sm">
          <CheckCircle2 className="w-4 h-4" />
          {t("contact.form.success")}
        </div>
      )}
    </form>
  );
}
