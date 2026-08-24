/**
 * The unmissable banner that sits on every draft team page.
 *
 * Deliberately loud and deliberately un-branded: this is scaffolding, and it
 * should look like scaffolding so that nobody mistakes the page for finished
 * work or screenshots it into a pitch deck. It disappears the moment
 * `TEAM_PLACEHOLDER` is set to false.
 */
export default function DraftNotice({ children }: { children: string }) {
  return (
    <div
      role="note"
      className="relative z-10 border-y-2 border-dashed border-amber-500 bg-amber-100 px-5 py-4 text-amber-950"
    >
      <div className="container-x flex items-start gap-3">
        <span aria-hidden className="mt-px text-lg leading-none">
          ⚠
        </span>
        <p className="text-[0.82rem] font-medium leading-relaxed">{children}</p>
      </div>
    </div>
  );
}
