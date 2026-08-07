import { practiceAreas } from "@/lib/site";

/**
 * The seam between the navy hero and the bright body — a slow ticker of
 * everything the firm handles. Pure CSS so it costs nothing to run.
 */
export default function Marquee() {
  const items = [...practiceAreas, ...practiceAreas];

  return (
    <div className="relative overflow-hidden border-y border-ink-800/40 bg-ink-900 py-4">
      <div className="flex w-max animate-[atl-marquee_60s_linear_infinite] motion-reduce:animate-none">
        {items.map((area, i) => (
          <span
            key={`${area.slug}-${i}`}
            className="flex items-center whitespace-nowrap px-7 text-[0.78rem] tracking-wide text-ink-200"
          >
            {area.name}
            <span className="ml-7 text-gold-500">✦</span>
          </span>
        ))}
      </div>

      {/* Feather both ends so items enter and exit rather than snapping */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-900 to-transparent" />

      <style>{`
        @keyframes atl-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
