import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  // نبني قائمة الأرقام: [1, ..., current-1, current, current+1, ..., last]
  const pages = [];
  const addPage = (p) => pages.push(p);

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) addPage(i);
  } else {
    addPage(1);
    if (page > 3) addPage("...");

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) addPage(i);

    if (page < totalPages - 2) addPage("...");
    addPage(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-12">
      {/* Prev */}
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="w-10 h-10 flex items-center justify-center border border-ink/20 hover:border-gold hover:text-gold text-ink/60 disabled:opacity-30 disabled:hover:border-ink/20 disabled:hover:text-ink/60 transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
      </button>

      {/* Pages */}
      {pages.map((p, idx) =>
        p === "..." ? (
          <span
            key={`dots-${idx}`}
            className="w-10 h-10 flex items-center justify-center text-ink/40 text-sm"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={cn(
              "w-10 h-10 flex items-center justify-center border text-sm transition-colors",
              p === page
                ? "border-gold bg-gold text-ink font-medium"
                : "border-ink/20 hover:border-gold hover:text-gold text-ink/70",
            )}
          >
            {p}
          </button>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="w-10 h-10 flex items-center justify-center border border-ink/20 hover:border-gold hover:text-gold text-ink/60 disabled:opacity-30 disabled:hover:border-ink/20 disabled:hover:text-ink/60 transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4 rtl:rotate-180" />
      </button>
    </div>
  );
}
