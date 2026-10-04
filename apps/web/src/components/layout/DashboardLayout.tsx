import { Bell } from "lucide-react";
import { useMemo } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { FullScreenLoader } from "../common/Loader";
import { AppSidebar } from "../sidebar/AppSidebar";
import { DropdownProfile } from "../common/DropdownProfile";

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
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border/80 bg-muted px-4 py-3 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="cursor-pointer md:hidden" />
            {/* Breadcrumb: Overview > Dashboard */}
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="text-muted-foreground">Overview</span>
              <span className="text-muted-foreground/60">›</span>
              <span className="font-medium text-foreground capitalize">
                {activeTab}
              </span>
            </div>
          </div>

          {/* Right Header: Notification Bell & Initials Avatar AB */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/dashboard/notifications">
              <button
                className="relative rounded-full border border-border bg-card p-2 text-muted-foreground transition-colors hover:border-border/80 hover:text-foreground"
                title="3 unread notifications"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
              </button>
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
