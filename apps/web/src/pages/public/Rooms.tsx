import { AvailabilitySearch } from "@/components/common/AvailabilitySearch";

export default function RoomsPage() {
  return (
    <section className="container mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-medium text-foreground md:text-4xl">
        Find a room
      </h1>
      <p className="mt-2 text-base text-foreground">
        Choose your dates and guest count to search available rooms.
      </p>
      <AvailabilitySearch className="mt-6" />
    </section>
  );
}
