import { Link } from "react-router-dom";

import { LogoMark } from "@/components/common/Logo";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About us", to: "/about" },
  { label: "Rooms", to: "/rooms" },
  { label: "Contact us", to: "/contact" },
];

const guestLinks = [
  { label: "Explore rooms", to: "/rooms" },
  { label: "Book your stay", to: "/rooms" },
];

const legalLabels = ["Terms and conditions", "Privacy policy"];

const linkClass =
  "inline-flex min-h-8 items-center text-[13px] text-primary-foreground/65 transition-colors hover:text-gold focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-primary text-primary-foreground">
        <div className="grid gap-9 px-6 pt-8 pb-7 sm:px-8 sm:pt-10 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-[1.45fr_repeat(3,minmax(0,1fr))] lg:gap-8 lg:px-10 lg:pt-11">
          <div className="max-w-xs">
            <Link
              to="/"
              aria-label="Nivara Hotels, home"
              className="inline-flex min-h-11 items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <LogoMark className="size-9" />
              <span className="font-heading text-xl tracking-wide text-primary-foreground sm:text-2xl">
                Nivara Hotels
              </span>
            </Link>
            <p className="mt-4 max-w-68 text-[13px] leading-6 text-primary-foreground/65">
              Thoughtful rooms, a warm welcome and the little comforts that make
              a stay feel easy.
            </p>
          </div>

          <nav aria-label="Quick links" className="space-y-3">
            <h2 className="text-[11px] font-medium tracking-[0.15em] text-primary-foreground uppercase">
              Quick links
            </h2>
            <ul className="space-y-1">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Guest services" className="space-y-3">
            <h2 className="text-[11px] font-medium tracking-[0.15em] text-primary-foreground uppercase">
              Guest services
            </h2>
            <ul className="space-y-1">
              {guestLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div aria-labelledby="footer-legal-heading" className="space-y-3">
            <h2
              id="footer-legal-heading"
              className="text-[11px] font-medium tracking-[0.15em] text-primary-foreground uppercase"
            >
              Legal
            </h2>
            <ul className="space-y-1">
              {legalLabels.map((label) => (
                <li key={label}>
                  <span className="inline-flex min-h-8 items-center text-[13px] text-primary-foreground/40">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-6 flex flex-col gap-3 border-t border-primary-foreground/15 py-5 text-[11px] text-primary-foreground/60 sm:mx-8 sm:flex-row sm:items-center sm:justify-between lg:mx-10">
          <p>© {year} Nivara Hotels. All rights reserved.</p>
        </div>

        <div
          aria-hidden="true"
          className="overflow-hidden px-3 text-center text-[clamp(5rem,18vw,14rem)] leading-[0.76] font-black tracking-[-0.09em] whitespace-nowrap"
        >
          <span className="bg-linear-to-r from-primary-foreground/0 via-gold/85 to-primary-foreground/0 bg-clip-text text-transparent">
            NIVARA
          </span>
        </div>
      </div>
    </footer>
  );
}
