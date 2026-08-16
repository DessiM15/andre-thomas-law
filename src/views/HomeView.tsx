import Hero from "@/components/home/Hero";
import WhyFirm from "@/components/home/WhyFirm";
import FeaturedAreas from "@/components/home/FeaturedAreas";
import AboutPreview from "@/components/home/AboutPreview";
import ReviewsBand from "@/components/ReviewsBand";
import CTABand from "@/components/CTABand";
import type { Lang } from "@/lib/i18n";

export default function HomeView({ lang }: { lang: Lang }) {
  return (
    <>
      <Hero lang={lang} />
      <WhyFirm lang={lang} />
      <FeaturedAreas lang={lang} />
      <AboutPreview lang={lang} />
      <ReviewsBand lang={lang} n="04" />
      <CTABand lang={lang} n="05" />
    </>
  );
}
