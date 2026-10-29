import { Outlet, ScrollRestoration } from "react-router-dom";

import { PublicFooter } from "@/components/layout/PublicFooter";
import { PublicNavbar } from "@/components/layout/PublicNavbar";

export function PublicLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-background font-sans text-foreground antialiased">
      <PublicNavbar />
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
      <PublicFooter />
      <ScrollRestoration />
    </div>
  );
}
