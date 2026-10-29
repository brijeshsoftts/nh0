import { Camera, Globe, Menu, Play } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  { label: "Home", to: "/" },
  { label: "Rooms", to: "/rooms" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function PublicNavbar() {
  const { pathname } = useLocation();
  const bookingPath = pathname === "/" ? "#availability" : "/#availability";

  return (
    <header className="relative z-40 border-b border-border bg-background">
      <div className="container mx-auto grid min-h-18 w-full max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <Link
          className="w-fit rounded-md text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          to="/"
          aria-label="Nivara Hotels home"
        >
          <span className="grid size-10 place-items-center rounded-md bg-primary font-heading text-2xl font-semibold text-primary-foreground">
            N
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center justify-center gap-6 text-base font-medium text-foreground lg:flex xl:gap-8"
        >
          {navigation.map((item) => (
            <Link
              aria-current={pathname === item.to ? "page" : undefined}
              className="whitespace-nowrap transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring aria-[current=page]:text-primary"
              key={item.label}
              to={item.to}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <div className="hidden items-center gap-5 lg:flex">
            <Link
              className="text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              to="/login"
            >
              Sign Up
            </Link>
          </div>
          <Button
            className="hidden h-10 rounded-md px-5 text-sm font-semibold lg:inline-flex"
            nativeButton={false}
            variant="default"
            render={<Link to={bookingPath} />}
          >
            Book Now
          </Button>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  aria-label="Open navigation menu"
                  className="size-11 rounded-md lg:hidden"
                  size="icon"
                  variant="outline"
                />
              }
            >
              <Menu aria-hidden="true" />
            </SheetTrigger>
            <SheetContent
              className="max-h-svh w-full overflow-y-auto border-border bg-background text-foreground"
              side="top"
            >
              <SheetHeader className="container mx-auto flex min-h-18 w-full max-w-7xl flex-row items-center justify-between gap-0 border-b border-border px-4 py-0 sm:px-6 lg:px-8">
                <SheetTitle className="sr-only">Nivara Hotels menu</SheetTitle>
                <SheetClose
                  nativeButton={false}
                  render={
                    <Link
                      className="grid size-10 place-items-center rounded-md bg-primary font-heading text-2xl font-semibold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                      to="/"
                      aria-label="Nivara Hotels home"
                    />
                  }
                >
                  N
                </SheetClose>
              </SheetHeader>
              <nav
                aria-label="Mobile navigation"
                className="container mx-auto flex w-full max-w-7xl flex-col items-start gap-1 px-4 py-5 sm:px-6 lg:px-8"
              >
                {navigation.map((item) => (
                  <SheetClose
                    nativeButton={false}
                    key={item.label}
                    render={
                      <Link
                        aria-current={pathname === item.to ? "page" : undefined}
                        className="flex min-h-12 w-full items-center border-b border-border px-2 text-lg font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-[current=page]:text-primary"
                        to={item.to}
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                ))}
              </nav>
              <div className="container mx-auto grid w-full max-w-7xl grid-cols-1 gap-3 border-t border-border px-4 py-5 sm:grid-cols-2 sm:px-6 lg:px-8">
                <SheetClose
                  nativeButton={false}
                  render={
                    <Button
                      className="h-11 w-full rounded-md text-base"
                      nativeButton={false}
                      variant="outline"
                      render={<Link to="/login" />}
                    />
                  }
                >
                  Sign Up
                </SheetClose>
                <SheetClose
                  nativeButton={false}
                  render={
                    <Button
                      className="h-11 w-full rounded-md text-base font-semibold"
                      nativeButton={false}
                      variant="default"
                      render={<Link to={bookingPath} />}
                    />
                  }
                >
                  Book Now
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function PublicSocialLinks() {
  return (
    <nav aria-label="Social media" className="mt-4 flex gap-2">
      <a
        aria-label="Facebook"
        className="grid size-10 place-items-center rounded-md border border-background text-background transition-colors hover:bg-background hover:text-foreground focus-visible:outline-ring dark:border-foreground dark:text-foreground dark:hover:bg-foreground dark:hover:text-background"
        href="https://www.facebook.com"
      >
        <Globe aria-hidden="true" className="size-4" />
      </a>
      <a
        aria-label="Instagram"
        className="grid size-10 place-items-center rounded-md border border-background text-background transition-colors hover:bg-background hover:text-foreground focus-visible:outline-ring dark:border-foreground dark:text-foreground dark:hover:bg-foreground dark:hover:text-background"
        href="https://www.instagram.com"
      >
        <Camera aria-hidden="true" className="size-4" />
      </a>
      <a
        aria-label="YouTube"
        className="grid size-10 place-items-center rounded-md border border-background text-background transition-colors hover:bg-background hover:text-foreground focus-visible:outline-ring dark:border-foreground dark:text-foreground dark:hover:bg-foreground dark:hover:text-background"
        href="https://www.youtube.com"
      >
        <Play aria-hidden="true" className="size-4" />
      </a>
    </nav>
  );
}
