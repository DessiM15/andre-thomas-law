import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import WhyFirm from "@/components/home/WhyFirm";
import PracticeBand from "@/components/home/PracticeBand";
import AboutPreview from "@/components/home/AboutPreview";
import ReviewsBand from "@/components/ReviewsBand";
import CTABand from "@/components/CTABand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <WhyFirm />
      <PracticeBand />
      <AboutPreview />
      <ReviewsBand n="04" />
      <CTABand n="05" />
    </>
  );
}
