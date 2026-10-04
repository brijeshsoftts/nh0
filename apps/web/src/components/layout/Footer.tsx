import { Link } from "react-router-dom";

import { Logo } from "@/components/common/Logo";
import { Separator } from "@/components/ui/separator";

import { goldHairline } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { LEGAL_ITEMS, NAV_ITEMS, SOCIAL_LINKS } from "@/constants/navigation";

const linkClass =
  "text-sm text-muted-foreground transition-colors hover:text-amber-600 dark:hover:text-amber-400";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t bg-card text-card-foreground">
      <div
        aria-hidden
        className={cn("absolute inset-x-0 top-0 h-px", goldHairline)}
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div className="max-w-sm space-y-6">
          <Link
            to="/"
            aria-label="Nivara Hotels, home"
            className="flex items-center"
          >
            <Logo />
          </Link>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Nivara is a hotel rooted in Awadhi hospitality: thoughtful rooms,
            unhurried service and a booking you can confirm in minutes.
          </p>
          <ul className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border text-muted-foreground transition-colors hover:border-amber-500/60 hover:text-amber-600 dark:hover:text-amber-400"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Pages" className="space-y-5">
          <h3 className="font-display text-xl font-medium">Pages</h3>
          <ul className="space-y-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal" className="space-y-5">
          <h3 className="font-display text-xl font-medium">Legal</h3>
          <ul className="space-y-3">
            {LEGAL_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <Separator />
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
        © {year} Nivara Hotels. All rights reserved.
      </div>
    </footer>
  );
}
