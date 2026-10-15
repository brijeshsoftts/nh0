import { Bell, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

import { DropdownProfile } from "../common/DropdownProfile";
import { FullScreenLoader } from "../common/Loader";
import { AppSidebar } from "../sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

export function DashboardLayout() {
  const { isLoading, isAuthenticated } = useAuth();
  const location = useLocation();

  const activeTab = useMemo(() => {
    const pathname = location.pathname;

    if (pathname === "/dashboard") {
      return "Dashboard";
    }

    const segment = pathname.split("/").filter(Boolean)[1];

    if (!segment) {
      return "Dashboard";
    }

    return segment
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }, [location.pathname]);

  if (isLoading) return <FullScreenLoader />;

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border/80 bg-background/90 px-4 py-3 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="cursor-pointer text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground md:hidden" />
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs sm:text-sm"
            >
              <Link
                to="/dashboard"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Overview
              </Link>
              <ChevronRight
                aria-hidden="true"
                className="size-3.5 text-muted-foreground/60"
              />
              <span className="font-medium text-foreground capitalize">
                {activeTab}
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/dashboard/notifications"
              className="relative inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-border/80 hover:text-foreground"
              title="3 unread notifications"
              aria-label="Notifications, 3 unread"
            >
              <Bell className="size-4" />
              <span
                aria-hidden="true"
                className="absolute top-1 right-1 size-2 rounded-full bg-primary"
              />
            </Link>
            <DropdownProfile />
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl space-y-6 px-6 py-6 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
