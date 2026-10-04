import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CalendarCheck, Menu } from "lucide-react";

import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { goldButton, goldHairline } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/constant/navigation";

export function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Transparent (white text) only while sitting on top of the home hero.
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 motion-reduce:transition-none",
        overHero
          ? "bg-linear-to-b from-black/60 to-transparent text-white"
          : "border-b bg-background/80 text-foreground backdrop-blur-xl supports-backdrop-filter:bg-background/70"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 md:h-20 lg:px-8">
        <Link
          to="/"
          aria-label="Nivara Hotels, home"
          className="rounded-lg focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:outline-none"
        >
          <Logo />
        </Link>

        {/* Desktop links */}
        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative py-2 text-sm font-medium transition-colors",
                  overHero
                    ? "text-white/80 hover:text-white"
                    : "text-muted-foreground hover:text-foreground",
                  isActive && (overHero ? "text-white" : "text-foreground")
                )
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-px opacity-0 transition-opacity",
                      goldHairline,
                      isActive && "opacity-100"
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/rooms">
            <Button
              className={cn(
                "hidden rounded-full px-6 sm:inline-flex",
                goldButton
              )}
            >
              <CalendarCheck className="size-4" />
              Book now
            </Button>
          </Link>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className={cn(
                  "md:hidden",
                  overHero && "text-white hover:bg-white/10 hover:text-white"
                )}
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[88%] max-w-sm flex-col gap-0 p-0"
            >
              <SheetHeader className="border-b p-6 text-left">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Browse Nivara Hotels pages or book a room.
                </SheetDescription>
                <Logo />
              </SheetHeader>

              <nav
                aria-label="Mobile"
                className="flex flex-1 flex-col px-6 py-4"
              >
                {NAV_ITEMS.map((item) => (
                  <SheetClose key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        cn(
                          "border-b py-4 font-display text-3xl transition-colors",
                          isActive
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-foreground hover:text-amber-600 dark:hover:text-amber-400"
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </SheetClose>
                ))}
              </nav>

              <div className="p-6">
                <SheetClose>
                  <Link to="/rooms">
                    <Button
                      size="lg"
                      className={cn("w-full rounded-full", goldButton)}
                    >
                      <CalendarCheck className="size-4" />
                      Book now
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
