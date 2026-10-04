import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";

export function PublicLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="flex min-h-svh flex-col bg-background font-sans text-foreground antialiased">
      <Navbar />
      <main className={cn("flex-1", !isHome && "pt-16 md:pt-20")}>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
