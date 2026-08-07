import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Statement from "@/components/home/Statement";
import Pillars from "@/components/home/Pillars";
import PracticeIndex from "@/components/home/PracticeIndex";
import AboutPreview from "@/components/home/AboutPreview";
import Process from "@/components/home/Process";
import ReviewsBand from "@/components/ReviewsBand";
import CTABand from "@/components/CTABand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Statement />
      <Pillars />
      <PracticeIndex />
      <AboutPreview />
      <Process />
      <ReviewsBand />
      <CTABand />
    </>
  );
}
