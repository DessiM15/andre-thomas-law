import type { Metadata } from "next";
import TeamView from "@/views/TeamView";
import { pageMetadata } from "@/views/meta";
import { content } from "@/lib/content";
import { TEAM_PLACEHOLDER } from "@/lib/team";

const LANG = "es" as const;

export const metadata: Metadata = pageMetadata(
  LANG,
  "team",
  content(LANG).pages.team,
  // Draft roster: keep it out of the index until the placeholder people are
  // replaced. Removing `TEAM_PLACEHOLDER` from `lib/team.ts` lifts this.
  TEAM_PLACEHOLDER ? { robots: { index: false, follow: false } } : {}
);

export default function Page() {
  return <TeamView lang={LANG} />;
}
