import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TeamMemberView from "@/views/TeamMemberView";
import { teamMemberMetadata } from "@/views/meta";
import { getTeamBio } from "@/lib/content";
import { firm } from "@/lib/firm";
import { getPerson, team, TEAM_PLACEHOLDER } from "@/lib/team";

const LANG = "es" as const;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return team.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const person = getPerson(slug);
  const bio = getTeamBio(slug, LANG);
  if (!person || !bio) return {};

  const meta = teamMemberMetadata(LANG, {
    id: person.id,
    title: `${person.name} — ${bio.role}`,
    description: `${bio.preview} ${firm.name}, Houston, Texas.`,
  });

  return TEAM_PLACEHOLDER
    ? { ...meta, robots: { index: false, follow: false } }
    : meta;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const person = getPerson(slug);
  const bio = getTeamBio(slug, LANG);
  if (!person || !bio) notFound();

  return <TeamMemberView lang={LANG} person={person} bio={bio} />;
}
