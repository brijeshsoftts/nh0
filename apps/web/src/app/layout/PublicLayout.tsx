import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  LayoutDashboard,
  Mail,
  MapPin,
  Menu,
  Palmtree,
  Phone,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type FormEvent, useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useOutlet,
} from "react-router-dom";

import { PageTransition } from "@/components/common/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { HOTEL_DETAILS } from "@/constants/hotel";
import {
  getBookingPreferences,
  saveBookingPreferences,
} from "@/features/public/bookingPreferences";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Rooms", href: "/rooms" },
  { name: "Contact", href: "/contact" },
];

export function Logo({
  to = "/",
  className,
  inverse = false,
}: {
  to?: string;
  className?: string;
  inverse?: boolean;
}) {
  return (
    <Link to={to} className={cn("flex items-center gap-3", className)}>
      {/* Logo Mark - Arched Background matching screenshot */}
      <div className="relative flex h-12 w-10 items-end justify-center overflow-hidden rounded-t-full rounded-b-sm bg-secondary pb-1">
        <Palmtree
          className="absolute -bottom-1 h-7 w-7 text-primary"
          strokeWidth={1.5}
        />
      </div>

      {/* Logo Text */}
      <div className="flex flex-col justify-center">
        <span
          className={cn(
            "font-heading text-[26px] leading-none tracking-wide",
            inverse ? "text-background" : "text-primary"
          )}
        >
          Nivara
        </span>
        <span
          className={cn(
            "mt-1 font-sans text-[9px] font-medium tracking-[0.25em] uppercase",
            inverse ? "text-background/80" : "text-primary/80"
          )}
        >
          Hotel & Resort
        </span>
      </div>
    </Link>
  );
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;
  const { isAuthenticated, isLoading } = useAuth();
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 text-foreground backdrop-blur-md supports-backdrop-filter:bg-background/85">
      <nav
        aria-label="Main navigation"
        className="container mx-auto flex min-h-18 w-full max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8"
      >
        <Logo />
        <div className="hidden items-center gap-7 lg:flex xl:gap-9">
          <nav className="hidden items-center gap-9 lg:flex">
            {navLinks.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative py-2 text-[13px] font-medium tracking-wide transition-colors duration-200",
                    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-primary after:transition-transform after:duration-300",
                    isActive
                      ? "text-foreground after:scale-x-100"
                      : "text-muted-foreground after:scale-x-0 hover:text-foreground hover:after:scale-x-100"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-4 lg:flex">
          {!isLoading &&
            (isAuthenticated ? (
              <Button
                nativeButton={false}
                render={<Link to="/dashboard" />}
                className="h-11 rounded-lg px-5 font-semibold"
                variant="outline"
              >
                <LayoutDashboard aria-hidden="true" className="size-4" />
                Dashboard
              </Button>
            ) : (
              <Link
                className="min-h-11 content-center px-2 text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                to="/login"
              >
                Log in
              </Link>
            ))}
          <Button
            nativeButton={false}
            render={<Link to="/rooms" />}
            className="h-11 rounded-lg px-5 font-semibold"
            variant="default"
          >
            <Calendar aria-hidden="true" />
            Book now
          </Button>
        </div>
        <Button
          aria-controls="public-mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          className="size-11 lg:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          size="icon"
          variant="outline"
        >
          {isMenuOpen ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </Button>
      </nav>

      <AnimatePresence initial={false}>
        {isMenuOpen ? (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
            exit={{ height: 0, opacity: 0 }}
            id="public-mobile-navigation"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
          >
            <div className="container mx-auto max-w-7xl px-4 py-4 sm:px-6">
              <div className="flex flex-col">
                {navLinks.map((item) => (
                  <NavLink
                    end={item.href === "/"}
                    key={item.name}
                    onClick={closeMenu}
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        "flex min-h-12 items-center justify-between border-b border-border px-1 text-base font-medium transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                        isActive ? "text-primary" : "text-foreground"
                      )
                    }
                  >
                    {item.name}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 text-muted-foreground"
                    />
                  </NavLink>
                ))}
              </div>
              {!isLoading &&
                (isAuthenticated ? (
                  <Button
                    nativeButton={false}
                    render={<Link to="/dashboard" onClick={closeMenu} />}
                    className="mt-4 h-11 w-full font-semibold"
                    variant="default"
                  >
                    <LayoutDashboard aria-hidden="true" className="size-4" />
                    Dashboard
                  </Button>
                ) : (
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <Button
                      nativeButton={false}
                      render={<Link to="/login" onClick={closeMenu} />}
                      className="h-11 w-full rounded-lg font-semibold"
                      variant="outline"
                    >
                      Log in
                    </Button>
                    <Button
                      nativeButton={false}
                      render={<Link to="/rooms" onClick={closeMenu} />}
                      className="h-11 w-full rounded-lg font-semibold"
                      variant="default"
                    >
                      <Calendar aria-hidden="true" className="size-4" />
                      Book now
                    </Button>
                  </div>
                ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!HOTEL_DETAILS.email) return;
    const email = new FormData(event.currentTarget).get("email");
    if (typeof email !== "string") return;

    const params = new URLSearchParams({
      subject: `${HOTEL_DETAILS.name} newsletter request`,
      body: `Please add ${email} to the ${HOTEL_DETAILS.name} newsletter.`,
    });
    window.location.href = `mailto:${HOTEL_DETAILS.email}?${params.toString()}`;
  };

  return (
    <footer className="w-full bg-secondary pt-16 pb-8 font-sans">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Main Grid: Responsive column mapping */}
        <div className="grid grid-cols-1 gap-12 pb-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand Identifier & Intro */}
          <div className="flex flex-col space-y-5">
            {/* Logo Mark - Arched Background */}
            <Logo />

            <p className="max-w-70 text-[14px] leading-relaxed text-foreground/70">
              A comfortable hotel stay in Lucknow, with helpful service for
              business and leisure guests.
            </p>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="flex flex-col">
            <h4 className="mb-5 text-[15px] font-bold tracking-wider text-foreground uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="text-[14px] font-medium text-foreground/70 transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Channels */}
          <div className="flex flex-col">
            <h4 className="mb-5 text-[15px] font-bold tracking-wider text-foreground uppercase">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-foreground/70">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <span className="text-[14px] leading-relaxed">
                  {HOTEL_DETAILS.address ?? HOTEL_DETAILS.location}
                </span>
              </li>

              {HOTEL_DETAILS.phone && (
                <li className="flex items-center gap-3 text-foreground/70">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Phone className="h-3.5 w-3.5" />
                  </div>
                  <a
                    href={`tel:${HOTEL_DETAILS.phone}`}
                    className="text-[14px] transition-colors hover:text-primary"
                  >
                    {HOTEL_DETAILS.phone}
                  </a>
                </li>
              )}

              {HOTEL_DETAILS.email && (
                <li className="flex items-center gap-3 text-foreground/70">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  <a
                    href={`mailto:${HOTEL_DETAILS.email}`}
                    className="text-[14px] break-all transition-colors hover:text-primary"
                  >
                    {HOTEL_DETAILS.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-[15px] font-bold tracking-wider text-foreground uppercase">
              Newsletter
            </h4>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex w-full max-w-[320px] flex-col gap-2"
            >
              <label
                htmlFor="newsletter-email"
                className="text-[13px] font-semibold text-foreground"
              >
                Subscribe to our newsletter
              </label>
              <div className="relative flex w-full items-center rounded-2xl border border-border bg-accent p-1">
                <Input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  disabled={!HOTEL_DETAILS.email}
                  autoComplete="email"
                  placeholder="Your email address"
                  aria-describedby="newsletter-help"
                  className="h-10 w-full rounded-xl border-0 bg-transparent pr-12 pl-3 text-sm text-foreground placeholder:text-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  type="submit"
                  disabled={!HOTEL_DETAILS.email}
                  size="icon"
                  aria-label="Send newsletter request"
                  className="absolute right-1 h-10 w-10 shrink-0 rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                >
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Button>
              </div>
              <p id="newsletter-help" className="text-xs text-muted-foreground">
                {HOTEL_DETAILS.email
                  ? "Submitting opens your email app to send the request."
                  : "Newsletter contact details are not configured."}
              </p>
            </form>
          </div>
        </div>

        {/* Separator Section line */}
        <Separator className="h-px w-full bg-border" />

        {/* Bottom Section: Rights, Legal, Accessibility */}
        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-[12px] text-foreground/60 sm:flex-row md:text-[13px]">
          <span>
            © {currentYear} {HOTEL_DETAILS.name}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export function PublicLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const outlet = useOutlet();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const preferences = getBookingPreferences(searchParams);
    saveBookingPreferences(preferences);

    Object.entries(preferences).forEach(([key, value]) => {
      searchParams.set(key, String(value));
    });

    const search = searchParams.toString();
    if (search !== location.search.slice(1)) {
      navigate(
        {
          pathname: location.pathname,
          search: search ? `?${search}` : "",
          hash: location.hash,
        },
        { replace: true }
      );
    }
  }, [location, navigate]);

  return (
    <>
      <Navbar />
      <main className="min-w-0 flex-1" id="main-content" tabIndex={-1}>
        <PageTransition>{outlet}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
