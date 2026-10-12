export default function ContactInfoCard({ icon: Icon, title, lines }) {
  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 shrink-0 border border-gold/40 rounded-full flex items-center justify-center text-gold">
        <Icon className="w-5 h-5" strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="font-serif text-lg mb-1">{title}</h3>
        {lines.map((line, i) => (
          <p key={i} className="text-sm text-ink/70 leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
