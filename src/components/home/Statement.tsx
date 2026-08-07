import { Eyebrow, GoldRule, MaskLines, Reveal } from "@/components/Reveal";

export default function Statement() {
  return (
    <section className="bg-paper py-24 md:py-36">
      <div className="container-x">
        <Reveal>
          <Eyebrow n="01">Where this begins</Eyebrow>
        </Reveal>
        <GoldRule className="mt-5 w-full max-w-md" />

        <MaskLines
          className="mt-12 font-display text-[clamp(2rem,5.6vw,4.4rem)] leading-[1.06] tracking-[-0.02em] text-ink-900"
          lines={[
            <>Somewhere across town,</>,
            <>
              an adjuster opened a file on you{" "}
              <span className="italic text-gold-600">before</span>
            </>,
            <>you called anyone.</>,
          ]}
        />

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <Reveal delay={0.1} className="md:col-span-5 md:col-start-1">
            <p className="text-lg leading-relaxed text-ink-800/85">
              Their file is already being worked. Statements are being taken,
              records requested, footage quietly aging out of a hard drive
              somewhere. None of it is being gathered on your behalf.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="md:col-span-5 md:col-start-7">
            <p className="text-lg leading-relaxed text-ink-800/85">
              Andre Thomas spent years as a prosecutor building cases before he
              spent his career taking them apart. He knows what the other side
              is doing right now — because he used to do it.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
