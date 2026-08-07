import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { firm, fullAddress } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${firm.name}.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

const sections = [
  {
    h: "What we collect",
    p: [
      "When you submit the contact form, we collect the name, phone number, and email address you provide, along with any practice area selection and message you choose to include. We collect nothing else through that form.",
      "The chat assistant processes the messages you type in order to answer them. Please do not enter personal, confidential, or case-sensitive information into the chat.",
    ],
  },
  {
    h: "How we use it",
    p: [
      "Information you submit is used solely to respond to your inquiry and, where applicable, to evaluate and handle your legal matter. We do not sell your information, and we do not share it with third parties for marketing purposes.",
    ],
  },
  {
    h: "Confidentiality",
    p: [
      "Information sent through this website is not protected by the attorney–client privilege unless and until an attorney–client relationship has been established in writing. Please do not send confidential information before that point.",
    ],
  },
  {
    h: "Cookies and analytics",
    p: [
      "This site may use cookies and similar technologies to analyze traffic and improve the browsing experience. You can disable cookies in your browser settings; some parts of the site may not function as intended if you do.",
    ],
  },
  {
    h: "Third-party services",
    p: [
      "Pages on this site may embed third-party content, such as a Google Maps frame on the contact page. Those providers operate under their own privacy policies, which we do not control.",
    ],
  },
  {
    h: "Your choices",
    p: [
      `You may request that we correct or delete the information you have submitted. Contact ${firm.email} or call ${firm.phone}. Mail may be sent to ${fullAddress}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title={["Privacy Policy"]} />
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
        </div>
      </section>
    </>
  );
}
