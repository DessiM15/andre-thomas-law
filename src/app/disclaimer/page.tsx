import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { firm } from "@/lib/site";

export const metadata: Metadata = {
  title: "Legal Disclaimer",
  description: `Legal disclaimer for ${firm.name}.`,
  alternates: { canonical: "/disclaimer" },
  robots: { index: false, follow: true },
};

const sections = [
  {
    h: "No legal advice",
    p: [
      "The content on this website is provided for general informational purposes only and does not constitute legal advice. Every legal matter turns on its own particular facts, and nothing you read here should be relied upon as a substitute for advice from a licensed attorney about your specific situation.",
    ],
  },
  {
    h: "No attorney–client relationship",
    p: [
      "Viewing this website, submitting the contact form, using the chat assistant, or sending an email to the firm does not create an attorney–client relationship. Such a relationship is established only when the firm and the client execute a written agreement.",
      "Because no relationship exists until that point, information transmitted through this website is not protected by the attorney–client privilege. Please do not send confidential or sensitive information until an attorney–client relationship has been established in writing.",
    ],
  },
  {
    h: "The chat assistant",
    p: [
      "This website includes an automated assistant. It is not an attorney, it does not provide legal advice, and it cannot evaluate your case. It answers only from information already published on this website. Any question about your particular circumstances should be directed to the firm.",
    ],
  },
  {
    h: "Prior results",
    p: [
      "Any references to prior matters, trials, or outcomes are provided for informational purposes only. Prior results do not guarantee or predict a similar outcome in any future matter.",
    ],
  },
  {
    h: "Jurisdiction",
    p: [
      `${firm.attorney} is licensed to practice law in the States of Texas and Tennessee. Nothing on this website is intended to constitute an offer to represent anyone in a jurisdiction where the firm is not licensed to practice.`,
    ],
  },
  {
    h: "Time limits",
    p: [
      "Legal claims are subject to strict filing deadlines that vary by claim type and jurisdiction. Delay can permanently bar an otherwise valid claim. If you believe you may have a claim, consult an attorney promptly.",
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title={["Disclaimer"]} />
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x max-w-3xl">
          {sections.map((s, i) => (
            <Reveal key={s.h} delay={i * 0.04} className="border-b border-paper-edge py-10 first:pt-0">
              <h2 className="font-display text-2xl leading-snug text-ink-900 md:text-[1.9rem]">
                {s.h}
              </h2>
              <div className="mt-5 space-y-4 leading-relaxed text-ink-800/85">
                {s.p.map((para) => (
                  <p key={para.slice(0, 20)}>{para}</p>
                ))}
              </div>
            </Reveal>
          ))}
          <Reveal>
            <p className="pt-10 text-sm text-ink-800/60">
              Questions about this disclaimer? Call{" "}
              <a href={firm.phoneHref} className="text-gold-700 underline underline-offset-4">
                {firm.phone}
              </a>{" "}
              or email{" "}
              <a href={firm.emailHref} className="text-gold-700 underline underline-offset-4">
                {firm.email}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
