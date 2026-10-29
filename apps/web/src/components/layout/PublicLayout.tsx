import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";

export function PublicLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="flex min-h-svh flex-col bg-background font-sans text-foreground antialiased">
      <main className={cn("flex-1", !isHome && "")}>
        <Outlet />
      </main>
      <ScrollRestoration />
    </div>
  );
}
