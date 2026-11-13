import {
  BedDouble,
  CalendarDays,
  ChartNoAxesCombined,
  DoorOpen,
  Heart,
  Tag,
  UsersRound,
} from "lucide-react";
import { Link, Navigate, useLocation, useOutlet } from "react-router-dom";

import { Logo } from "@/app/layout/PublicLayout";
import { PageTransition } from "@/components/common/PageTransition";
import { Button } from "@/components/ui/button";
import { HERO_IMAGE } from "@/features/public/public.mock";
import { useAuth } from "@/hooks/useAuth";

import { FullScreenLoader } from "../../components/common/Loader";

export const AuthLayout = () => {
  const { isLoading, isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";
  const isBrandedAuthPage = isLoginPage || isRegisterPage;

  if (isLoading) return <FullScreenLoader />;

  if (isAuthenticated) return <Navigate to={"/dashboard"} />;

  return (
    <main className="grid min-h-svh bg-background text-foreground lg:grid-cols-2">
      <section
        aria-label="Nivara Hotels"
        className={`relative isolate hidden min-h-svh flex-col overflow-hidden bg-muted px-8 py-8 text-background lg:flex lg:px-12 lg:py-10 ${
          isBrandedAuthPage ? "lg:justify-start" : "lg:justify-between"
        }`}
      >
        <img
          alt="A Nivara hotel and resort"
          className="absolute inset-0 -z-20 size-full object-cover"
          fetchPriority="high"
          src={HERO_IMAGE}
        />
        <div className="absolute inset-0 -z-10 bg-foreground/55" />
        <Logo className="relative z-10" inverse />
        {isLoginPage ? (
          <div className="relative z-10 mt-10 max-w-xl xl:mt-12">
            <h1 className="max-w-md font-heading text-4xl leading-[1.08] font-medium text-background xl:text-5xl">
              <span className="block">Manage Your</span>{" "}
              <span className="block">Hotel with Ease</span>
            </h1>
            <p className="mt-4 max-w-lg text-base leading-6 text-background/85">
              Secure access to your hotel management dashboard.
            </p>
            <div
              aria-hidden="true"
              className="mt-7 h-px w-16 bg-brand-accent"
            />
            <ul className="mt-6 space-y-3">
              {[
                { icon: BedDouble, label: "Manage bookings" },
                { icon: DoorOpen, label: "Control rooms" },
                { icon: UsersRound, label: "Guest management" },
                { icon: ChartNoAxesCombined, label: "Reports & analytics" },
              ].map(({ icon: Icon, label }) => (
                <li
                  className="flex items-center gap-3 text-sm text-background/90"
                  key={label}
                >
                  <span className="grid size-9 place-items-center rounded-full bg-background/10 text-brand-accent">
                    <Icon
                      aria-hidden="true"
                      className="size-5"
                      strokeWidth={1.8}
                    />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        ) : isRegisterPage ? (
          <div className="relative z-10 mt-10 max-w-xl xl:mt-12">
            <h1 className="max-w-md font-heading text-4xl leading-[1.08] font-medium text-background xl:text-5xl">
              <span className="block">Create Your</span>{" "}
              <span className="block">Account</span>
            </h1>
            <p className="mt-4 max-w-lg text-base leading-6 text-background/85">
              Register to manage your stays and make your next visit easier.
            </p>
            <div
              aria-hidden="true"
              className="mt-7 h-px w-16 bg-brand-accent"
            />
            <ul className="mt-6 space-y-3">
              {[
                { icon: BedDouble, label: "Book your stay" },
                { icon: Tag, label: "Explore room offers" },
                { icon: CalendarDays, label: "Manage bookings" },
                { icon: Heart, label: "Save favorite rooms" },
              ].map(({ icon: Icon, label }) => (
                <li
                  className="flex items-center gap-3 text-sm text-background/90"
                  key={label}
                >
                  <span className="grid size-9 place-items-center rounded-full bg-background/10 text-brand-accent">
                    <Icon
                      aria-hidden="true"
                      className="size-5"
                      strokeWidth={1.8}
                    />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="relative z-10 max-w-xl pb-2">
            <h1 className="font-heading text-4xl leading-tight font-medium text-background xl:text-5xl">
              Find Your Perfect Stay
            </h1>
            <p className="mt-4 max-w-lg text-base leading-6 text-background/85">
              Discover comfortable rooms and helpful service in Lucknow, India.
            </p>
          </div>
        )}
      </section>

      <section
        className={`flex min-h-svh min-w-0 flex-col px-5 py-5 sm:px-8 sm:py-7 lg:px-12 lg:py-8 ${
          isBrandedAuthPage ? "bg-brand-ivory" : ""
        }`}
      >
        {!isBrandedAuthPage ? (
          <header className="flex min-h-11 items-center justify-between lg:justify-end">
            <div className="lg:hidden">
              <Logo />
            </div>
            <Button
              className="h-10 rounded-md px-4"
              nativeButton={false}
              render={<Link to="/rooms" />}
              variant="default"
            >
              Book Now
            </Button>
          </header>
        ) : null}

        <div className="flex flex-1 items-center justify-center py-8 sm:py-10 lg:py-12">
          <PageTransition
            className={
              isLoginPage
                ? "w-full max-w-lg"
                : isRegisterPage
                  ? "w-full max-w-xl"
                  : "w-full max-w-md"
            }
          >
            {outlet}
          </PageTransition>
        </div>
      </section>
    </main>
  );
};
