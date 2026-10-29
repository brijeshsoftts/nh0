import { Link } from "react-router-dom";

import { Logo } from "@/components/common/Logo";
import { PublicSocialLinks } from "@/components/layout/PublicNavbar";

export function PublicFooter() {
  return (
    <footer
      className="bg-foreground text-background dark:bg-background dark:text-foreground"
      id="contact"
    >
      <div className="container mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-6 gap-y-9 px-4 py-10 sm:px-6 md:grid-cols-4 md:gap-10 lg:px-8">
        <div className="col-span-2 md:col-span-1">
          <Link className="w-fit text-background dark:text-foreground" to="/">
            <Logo className="text-background dark:text-foreground" size="lg" />
          </Link>
          <p className="mt-4 max-w-xs text-base leading-relaxed text-background dark:text-foreground">
            A considered stay, in a place that feels like your own.
          </p>
          <PublicSocialLinks />
        </div>
        <nav
          aria-label="Explore"
          className="flex flex-col items-start gap-2 text-base text-background dark:text-foreground"
        >
          <h2 className="mb-1 text-lg font-semibold text-primary">Explore</h2>
          <Link className="hover:underline" to="/">
            Home
          </Link>
          <Link className="hover:underline" to="/rooms">
            Rooms
          </Link>
          <Link className="hover:underline" to="/about">
            About Us
          </Link>
          <Link className="hover:underline" to="/rooms">
            Offers
          </Link>
        </nav>
        <nav
          aria-label="Guest information"
          className="flex flex-col items-start gap-2 text-base text-background dark:text-foreground"
        >
          <h2 className="mb-1 text-lg font-semibold text-primary">
            Guest Information
          </h2>
          <Link className="hover:underline" to="/contact">
            Contact Us
          </Link>
          <Link className="hover:underline" to="/#faq">
            FAQs
          </Link>
          <Link className="hover:underline" to="/rooms">
            Booking Information
          </Link>
          <span>Privacy Policy</span>
        </nav>
        <div className="flex flex-col items-start gap-2 text-base text-background dark:text-foreground">
          <h2 className="mb-1 text-lg font-semibold text-primary">Contact</h2>
          <p className="leading-relaxed text-background dark:text-foreground">
            14 Residency Road
            <br />
            Bengaluru, Karnataka 560025
          </p>
          <a className="hover:underline" href="tel:+918012345678">
            +91 80 1234 5678
          </a>
          <a
            className="break-all hover:underline"
            href="mailto:stay@nivarahotels.com"
          >
            stay@nivarahotels.com
          </a>
        </div>
      </div>
      <div className="border-t border-background/30 dark:border-foreground/30">
        <div className="container mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-4 text-sm text-background sm:flex-row sm:justify-between sm:px-6 lg:px-8 dark:text-foreground">
          <p>© 2026 Nivara Hotels. All rights reserved.</p>
          <p>Made for moments that stay with you.</p>
        </div>
      </div>
    </footer>
  );
}
