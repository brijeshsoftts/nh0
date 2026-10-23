import { Crown } from "lucide-react";
import type { ReactNode } from "react";

export function SectionHeader({
  title,
  description,
}: {
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <header className="relative mx-auto mb-8 text-center sm:mb-10">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-2 w-full font-heading text-5xl font-semibold text-muted-foreground/5 uppercase sm:-top-2 sm:text-8xl"
      >
        {title}
      </p>
      <Crown aria-hidden="true" className="mx-auto mb-3 block text-primary" />
      <p className="text-md font-medium tracking-[0.2em] text-gold uppercase">
        {title}
      </p>
      <h2
        id="why-choose-us-heading"
        className="mx-auto mt-2 max-w-lg font-heading text-3xl leading-tight font-medium sm:text-4xl"
      >
        {description}
      </h2>
    </header>
  );
}
