import Hero from "@/components/home/Hero";
import CommunityNotice from "@/components/home/CommunityNotice";
import WhyFirm from "@/components/home/WhyFirm";
import FeaturedAreas from "@/components/home/FeaturedAreas";
import AboutPreview from "@/components/home/AboutPreview";
import Recognition from "@/components/Recognition";
import ReviewsBand from "@/components/ReviewsBand";
import CTABand from "@/components/CTABand";
import type { Lang } from "@/lib/i18n";

export default function HomeView({ lang }: { lang: Lang }) {
  return (
    <>
      <Hero lang={lang} />
      <CommunityNotice lang={lang} />
      <WhyFirm lang={lang} />
      <FeaturedAreas lang={lang} />
      <AboutPreview lang={lang} />
      <Recognition lang={lang} n="04" />
      <ReviewsBand lang={lang} n="05" limit={3} />
      <CTABand lang={lang} n="06" />
    </>
  );
}
