import Image from "next/image";
import type { TeamPerson } from "@/lib/team";

/**
 * A team member's square headshot — or, while their photograph is still
 * outstanding, a monogram in the firm's paper-and-gold palette.
 *
 * The monogram is deliberately not a grey silhouette or a stock face: it reads
 * as "photograph pending" rather than as a picture of someone. It keeps the
 * same square, hairline-framed footprint as a real headshot so the grid never
 * reflows when a photo finally lands.
 */
export default function Portrait({
  person,
  alt,
  sizes,
  priority,
  /** The list and grid views scale their portrait on hover; the detail page doesn't. */
  zoomOnHover = false,
  /** Monogram type scales with the tile, which ranges from 88px to 40vw. */
  monogramClass = "text-[1.6rem] md:text-[2.1rem]",
}: {
  person: TeamPerson;
  alt: string;
  sizes: string;
  priority?: boolean;
  zoomOnHover?: boolean;
  monogramClass?: string;
}) {
  const zoom = zoomOnHover
    ? "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
    : "";

  return (
    <>
      {person.image ? (
        <Image
          src={person.image}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover ${zoom}`}
          style={person.focal ? { objectPosition: person.focal } : undefined}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className={`absolute inset-0 flex items-center justify-center bg-paper-warm ${zoom}`}
        >
          <span
            aria-hidden
            className={`font-display leading-none tracking-[0.08em] text-gold-600/70 ${monogramClass}`}
          >
            {person.initials}
          </span>
        </div>
      )}
    </>
  );
}
