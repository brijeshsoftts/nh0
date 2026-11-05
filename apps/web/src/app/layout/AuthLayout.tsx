import { Link, Navigate, useOutlet } from "react-router-dom";

import { Logo } from "@/app/layout/PublicLayout";
import { PageTransition } from "@/components/common/PageTransition";
import { Button } from "@/components/ui/button";
import { HERO_IMAGE } from "@/features/public/public.mock";
import { useAuth } from "@/hooks/useAuth";

import { FullScreenLoader } from "../../components/common/Loader";

export const AuthLayout = () => {
  const { isLoading, isAuthenticated } = useAuth();
  const outlet = useOutlet();

  if (isLoading) return <FullScreenLoader />;

  if (isAuthenticated) return <Navigate to={"/dashboard"} />;

  return (
    <main className="grid min-h-svh bg-background text-foreground lg:grid-cols-2">
      <section
        aria-label="Nivara Hotels"
        className="relative isolate hidden min-h-svh flex-col justify-between overflow-hidden bg-muted px-8 py-8 text-background lg:flex lg:px-12 lg:py-10"
      >
        <img
          alt="A Nivara hotel and resort"
          className="absolute inset-0 -z-20 size-full object-cover"
          fetchPriority="high"
          src={HERO_IMAGE}
        />
        <div className="absolute inset-0 -z-10 bg-foreground/55" />
        <Logo className="relative z-10" inverse />
        <div className="relative z-10 max-w-xl pb-2">
          <h1 className="font-heading text-4xl leading-tight font-medium text-background xl:text-5xl">
            Find Your Perfect Stay
          </h1>
          <p className="mt-4 max-w-lg text-base leading-6 text-background/85">
            Discover comfortable rooms and helpful service in Lucknow, India.
          </p>
        </div>
      </section>

      <section className="flex min-h-svh min-w-0 flex-col px-5 py-5 sm:px-8 sm:py-7 lg:px-12 lg:py-8">
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

        <div className="flex flex-1 items-center justify-center py-8 sm:py-10 lg:py-12">
          <PageTransition className="max-w-md">{outlet}</PageTransition>
        </div>
      </section>
    </main>
  );
};
