import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ChevronRight, Menu, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthDialogs } from "@/features/public/components/AuthDialogs";

import { Button } from "../ui/button";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "#home" },
  { name: "Rooms", href: "#rooms" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [authDialogOpen, setAuthDialogOpen] = useState(() => {
    const locationState = location.state as { openAuth?: boolean } | null;
    return Boolean(locationState?.openAuth);
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const locationState = location.state as { openAuth?: boolean } | null;

    if (locationState?.openAuth) {
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`sticky top-0 right-0 left-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "border-b border-border/60 bg-background/90 py-4 shadow-sm backdrop-blur-md"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          {/* LEFT: Logo */}
          <a href="#home" className="group flex flex-col focus:outline-none">
            <span className="font-heading text-2xl font-medium tracking-wider text-foreground transition-colors duration-300 group-hover:text-gold md:text-3xl">
              NIVARA
            </span>
            <span className="-mt-1 font-sans text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">
              Hotels & Resorts
            </span>
          </a>

          {/* CENTER: Navigation Links (Desktop) */}
          <nav className="hidden items-center space-x-10 md:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group relative py-1 text-sm tracking-widest text-muted-foreground uppercase transition-colors duration-300 hover:text-foreground"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* RIGHT: Book Now & Sign In */}
          <div className="hidden items-center space-x-4 md:flex">
            <Button
              variant={"ghost"}
              className={"h-10 rounded-none"}
              onClick={() => {
                setMobileMenuOpen(false);
                setAuthDialogOpen(true);
              }}
            >
              <User className="h-4 w-4 text-gold" />
              Sign In
            </Button>
            <Button
              className={"h-10 rounded-none"}
              onClick={() => setMobileMenuOpen(false)}
            >
              <CalendarDays className="h-4 w-4" />
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground focus:outline-none md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gold" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 flex flex-col justify-between border-b border-border bg-background/98 px-8 pt-28 pb-12 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col space-y-6">
              <span className="text-xs font-medium tracking-[0.25em] text-gold uppercase">
                Menu
              </span>
              <div className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-between font-heading text-3xl font-medium text-foreground transition-colors hover:text-gold"
                  >
                    <span>{item.name}</span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-gold" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-4 border-t border-border/60 pt-6">
              <Button
                variant={"outline"}
                className={"h-10 rounded-none"}
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthDialogOpen(true);
                }}
              >
                <User className="h-4 w-4 text-gold" />
                Sign In
              </Button>
              <Button
                className={"h-10 rounded-none"}
                onClick={() => setMobileMenuOpen(false)}
              >
                <CalendarDays className="h-4 w-4" />
                Book Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthDialogs open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </>
  );
}
