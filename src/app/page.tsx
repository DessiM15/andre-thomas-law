import Hero from "@/components/home/Hero";
import WhyFirm from "@/components/home/WhyFirm";
import FeaturedAreas from "@/components/home/FeaturedAreas";
import AboutPreview from "@/components/home/AboutPreview";
import ReviewsBand from "@/components/ReviewsBand";
import CTABand from "@/components/CTABand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyFirm />
      <FeaturedAreas />
      <AboutPreview />
      <ReviewsBand n="04" />
      <CTABand n="05" />
    </>
  );
}
