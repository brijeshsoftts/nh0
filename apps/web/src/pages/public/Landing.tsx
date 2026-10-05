import { AmenitiesSection } from "@/features/public/components/AmenitiesSection";
import { BookingCTA } from "@/features/public/components/BookingCTA";
import { FeaturedRooms } from "@/features/public/components/FeaturedRooms";
import { HeroSection } from "@/features/public/components/HeroSection";
import { TestimonialsSection } from "@/features/public/components/TestimonialsSection";
import { MOCK_ROOMS } from "@/features/public/public.mock";

export default function LandingPage() {
  const rooms = MOCK_ROOMS;
  const isLoading = false;

  return (
    <>
      <HeroSection />
      <FeaturedRooms rooms={rooms} isLoading={isLoading} />
      <AmenitiesSection />
      <TestimonialsSection />
      <BookingCTA />
    </>
  );
}
