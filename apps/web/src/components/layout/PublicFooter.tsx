import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { PublicBrand } from "@/components/layout/PublicNavbar";

const exploreLinks = [
  { label: "Home", to: "/" },
  { label: "Rooms", to: "/rooms" },
  { label: "About Nivara", to: "/about" },
];

const guestLinks = [
  { label: "Contact us", to: "/contact" },
  { label: "Frequently asked questions", to: "/#faq" },
  { label: "Check availability", to: "/#availability" },
];

export function PublicFooter() {
  return (
    <footer
      className="bg-foreground text-background dark:bg-background dark:text-foreground"
      id="contact"
    >
      <div className="container mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-x-8 gap-y-8 px-4 py-9 sm:grid-cols-2 sm:px-6 md:grid-cols-3 md:gap-x-10 md:py-12 lg:px-8">
        <div className="min-w-0">
          <PublicBrand inverted />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-background/75 dark:text-foreground/75">
            Thoughtful rooms and warm hospitality for a comfortable stay.
          </p>
        </div>
        <FooterLinkGroup label="Explore" links={exploreLinks} />
        <FooterLinkGroup label="Guest information" links={guestLinks} />
      </div>
      <div className="border-t border-background/15 dark:border-foreground/15">
        <div className="container mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-background/70 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 dark:text-foreground/70">
          <p>© {new Date().getFullYear()} Nivara Hotels</p>
          <Link
            className="inline-flex min-h-10 items-center gap-1 self-start transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:self-auto"
            to="/rooms"
          >
            Find a room <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkGroup({
  label,
  links,
}: {
  label: string;
  links: { label: string; to: string }[];
}) {
  return (
    <nav aria-label={label} className="flex min-w-0 flex-col items-start gap-1">
      <h2 className="mb-2 text-sm font-semibold text-background dark:text-primary">
        {label}
      </h2>
      {links.map((link) => (
        <Link
          className="inline-flex min-h-10 items-center text-sm text-background/75 transition-colors hover:text-background focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:text-foreground/75 dark:hover:text-foreground"
          key={link.to}
          to={link.to}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
