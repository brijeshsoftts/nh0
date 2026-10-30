import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

import { PublicFooter } from "@/components/layout/PublicFooter";
import { PublicNavbar } from "@/components/layout/PublicNavbar";

export function PublicLayout() {
  const { pathname } = useLocation();
  const isCheckoutRoute =
    pathname === "/checkout" || /\/rooms\/[^/]+\/book\/?$/.test(pathname);

  return (
    <div className="flex min-h-svh flex-col bg-background font-sans text-foreground antialiased">
      <a
        className="sr-only z-50 rounded-md bg-background px-4 py-3 text-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:outline-2 focus:outline-offset-2 focus:outline-ring"
        href="#main-content"
      >
        Skip to content
      </a>
      <PublicNavbar compact={isCheckoutRoute} />
      <main className="min-w-0 flex-1" id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      {isCheckoutRoute ? null : <PublicFooter />}
      <ScrollRestoration />
    </div>
  );
}
