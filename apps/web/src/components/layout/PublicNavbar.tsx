import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, LayoutDashboard, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Home", to: "/", end: true },
  { label: "Rooms", to: "/rooms", end: false },
  { label: "About", to: "/about", end: false },
  { label: "Contact", to: "/contact", end: false },
];

export function PublicBrand({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <Link
      aria-label="Nivara Hotels home"
      className={cn(
        "group inline-flex min-h-11 items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        className
      )}
      to="/"
    >
      <span className="flex flex-col">
        <span
          className={cn(
            "font-heading text-xl leading-none font-medium tracking-[0.04em]",
            inverted
              ? "text-background dark:text-foreground"
              : "text-foreground"
          )}
        >
          NIVARA
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] leading-none font-medium tracking-[0.12em] uppercase",
            inverted
              ? "text-background/65 dark:text-foreground/65"
              : "text-muted-foreground"
          )}
        >
          Hotels
        </span>
      </span>
    </Link>
  );
}

export function PublicNavbar({ compact = false }: { compact?: boolean }) {
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
        <PublicBrand />
        {compact ? (
          <p className="text-sm font-medium text-muted-foreground">
            Reservation checkout
          </p>
        ) : (
          <>
            <div className="hidden items-center gap-7 lg:flex xl:gap-9">
              <nav className="hidden items-center gap-9 lg:flex">
                {navigation.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
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
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
            <div className="hidden items-center gap-4 lg:flex">
              {!isLoading &&
                (isAuthenticated ? (
                  <Button
                    className="h-11 px-5 font-semibold"
                    nativeButton={false}
                    render={<Link to="/dashboard" />}
                    variant="outline"
                  >
                    <LayoutDashboard aria-hidden="true" className="size-4" />
                    Dashboard
                  </Button>
                ) : (
                  <Link
                    className="min-h-11 content-center px-2 text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    to="/login"
                    state={{ openAuth: true }}
                  >
                    Sign up
                  </Link>
                ))}
              <Button
                className="h-11 px-5 font-semibold"
                nativeButton={false}
                render={<Link to="/rooms" />}
                variant="default"
              >
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
          </>
        )}
      </nav>
      {!compact ? (
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
                  {navigation.map((item) => (
                    <NavLink
                      end={item.end}
                      key={item.to}
                      onClick={closeMenu}
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          "flex min-h-12 items-center justify-between border-b border-border px-1 text-base font-medium transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                          isActive ? "text-primary" : "text-foreground"
                        )
                      }
                    >
                      {item.label}
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
                      className="mt-4 h-11 w-full font-semibold"
                      nativeButton={false}
                      onClick={closeMenu}
                      render={<Link to="/dashboard" />}
                      variant="default"
                    >
                      <LayoutDashboard aria-hidden="true" className="size-4" />
                      Dashboard
                    </Button>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 pt-4">
                      <Button
                        className="h-11"
                        nativeButton={false}
                        onClick={closeMenu}
                        render={<Link to="/login" state={{ openAuth: true }} />}
                        variant="outline"
                      >
                        Log in
                      </Button>
                      <Button
                        className="h-11 font-semibold"
                        nativeButton={false}
                        onClick={closeMenu}
                        render={<Link to="/login" state={{ openAuth: true }} />}
                        variant="default"
                      >
                        Sign up
                      </Button>
                    </div>
                  ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : null}
    </header>
  );
}
