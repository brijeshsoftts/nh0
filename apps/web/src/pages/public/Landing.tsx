import { Plus, RefreshCw } from "lucide-react";

import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { Button } from "@/components/ui/button";
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

      <EmptyState
        heading="No service category list found"
        description="You can add a new Service category by clicking on the button below"
        render={
          <Button variant="link">
            <Plus />
            Add category
          </Button>
        }
      />

      <ErrorState
        heading="Failed to load services"
        description="We couldn't fetch the service list. Please check your connection and try again."
        render={
          <Button>
            <RefreshCw />
            Try again
          </Button>
        }
      />

      <FeaturedRooms rooms={rooms} isLoading={isLoading} />
      <AmenitiesSection />
      <TestimonialsSection />
      <BookingCTA />
    </>
  );
}
