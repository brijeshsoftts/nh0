import { BsInstagram, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

import { PublicBrand } from "@/components/layout/PublicNavbar";

const links = [
  { label: "Home", to: "/" },
  { label: "Rooms", to: "/rooms" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function PublicFooter() {
  return (
    <footer
      className="bg-foreground text-background dark:bg-background dark:text-foreground"
      id="contact"
    >
      <div className="container mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-x-8 gap-y-10 px-4 py-12 sm:grid-cols-2 sm:px-6 md:grid-cols-4 md:gap-x-8 md:py-16 lg:px-8">
        <div className="min-w-0">
          <PublicBrand inverted />
          <p className="mt-5 max-w-xs font-heading text-lg text-background/80 dark:text-foreground/80">
            Stay. Unwind. Belong.
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-background/65 dark:text-foreground/65">
            Thoughtfully arranged stays and warm Indian hospitality.
          </p>
        </div>

        <nav
          aria-label="Quick links"
          className="flex flex-col items-start gap-1"
        >
          <h2 className="mb-2 text-xs font-semibold tracking-[0.12em] text-primary uppercase">
            Explore
          </h2>
          {links.map((link) => (
            <Link
              className="inline-flex min-h-9 items-center text-sm text-background/75 transition-colors hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:text-foreground/75 dark:hover:text-foreground"
              key={link.to}
              to={link.to}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-start gap-2 text-sm">
          <h2 className="mb-2 text-xs font-semibold tracking-[0.12em] text-primary uppercase">
            Contact
          </h2>
          <p className="text-background/70 dark:text-foreground/70">
            Phone details coming soon
          </p>
          <p className="text-background/70 dark:text-foreground/70">
            Email details coming soon
          </p>
          <p className="max-w-52 leading-relaxed text-background/70 dark:text-foreground/70">
            Address details coming soon
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-semibold tracking-[0.12em] text-primary uppercase">
            Follow us
          </h2>
          <div
            aria-label="Social media"
            className="flex items-center gap-3 text-background/75 dark:text-foreground/75"
          >
            <BsInstagram aria-label="Instagram" className="size-5" />
            <FaFacebook aria-label="Facebook" className="size-5" />
            <BsYoutube aria-label="YouTube" className="size-5" />
          </div>
          <p className="mt-3 text-xs text-background/60 dark:text-foreground/60">
            Social links coming soon
          </p>
        </div>
      </div>

      <div className="border-t border-background/15 dark:border-foreground/15">
        <div className="container mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 text-xs text-background/65 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 dark:text-foreground/65">
          <p>© {new Date().getFullYear()} Nivara Hotels</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>Privacy policy</span>
            <span>Terms &amp; conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
