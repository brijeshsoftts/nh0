import AboutSection from "@/features/public/components/AboutSection";
import { AmenitiesSection } from "@/features/public/components/AmenitiesSection";
import { CtaSection } from "@/features/public/components/CtaSection";
import { FaqSection } from "@/features/public/components/FaqSection";
import { FeaturedRooms } from "@/features/public/components/FeaturedRooms";
import { HeroSection } from "@/features/public/components/HeroSection";
import { TestimonialsSection } from "@/features/public/components/TestimonialsSection";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedRooms />
      <AmenitiesSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
