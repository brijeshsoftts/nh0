import {
  KeyRound,
  LogOut,
  MoreHorizontal,
  Palmtree,
  Settings,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Logo } from "@/app/layout/PublicLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  ADMIN_PAGES,
  CUSTOMER_PAGES,
  HOUSEKEEPER_PAGES,
  MANAGER_PAGES,
  RECEPTIONIST_PAGES,
} from "@/constants/page";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/lib/format";

import { NAV_GROUPS } from "./navigation";
import type { NavItem } from "./NavMain";
import { NavMain } from "./NavMain";

function groupLinks(items: NavItem[]): NavItem[] {
  const groupedTitles = new Set(NAV_GROUPS.flatMap(({ titles }) => titles));
  const groupedItems = NAV_GROUPS.flatMap(({ label, titles }) => {
    const groupItems = items.filter(
      (item) => item.title && titles.includes(item.title)
    );

    return groupItems.length
      ? [{ isSection: true, label, children: groupItems }]
      : [];
  });
  const otherItems = items.filter(
    (item) => !item.title || !groupedTitles.has(item.title)
  );

  return otherItems.length
    ? [
        ...groupedItems,
        { isSection: true, label: "Other", children: otherItems },
      ]
    : groupedItems;
}

export function AppSidebar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { handleLogout, isLoading: isLoggingOut } = useLogout();
  const isOnline = navigator.onLine;

  const getLinks = () => {
    switch (user?.role) {
      case "ADMIN":
        return ADMIN_PAGES;
      case "MANAGER":
        return MANAGER_PAGES;
      case "CUSTOMER":
        return CUSTOMER_PAGES;
      case "STAFF":
        return user?.category == "RECEPTIONIST"
          ? RECEPTIONIST_PAGES
          : HOUSEKEEPER_PAGES;
      default:
        navigate("/");
    }
  };
  const links = getLinks();
  const groupedLinks = groupLinks(links ?? []);

  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground"
    >
      <div className="relative flex h-full flex-col bg-sidebar text-sidebar-foreground">
        <Palmtree
          aria-hidden="true"
          strokeWidth={1}
          className="pointer-events-none absolute -bottom-7 -left-8 z-0 size-36 text-sidebar-accent opacity-50"
        />
        <SidebarHeader className="relative z-10 h-16 shrink-0 justify-center border-b border-sidebar-border px-3 py-0 group-data-[collapsible=icon]:px-1">
          <div className="flex items-center justify-between gap-2 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-1">
            <Logo
              to="/dashboard"
              compact
              className="min-w-0 flex-1 overflow-hidden group-data-[collapsible=icon]:flex-none group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:[&>div:last-child]:hidden"
            />
            <SidebarTrigger
              aria-label="Collapse or expand navigation"
              className="hidden size-8 shrink-0 rounded-md text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:ring-sidebar-ring md:flex"
            />
          </div>
        </SidebarHeader>

        <SidebarContent className="relative z-10 min-h-0 flex-1 overflow-hidden px-2 py-3">
          <nav
            aria-label="Dashboard navigation"
            tabIndex={0}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "var(--sidebar-border) transparent",
            }}
            className="h-full min-h-0 overflow-y-auto overscroll-contain pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-sidebar-border [&::-webkit-scrollbar-track]:bg-transparent"
          >
            {groupedLinks.length > 0 && <NavMain items={groupedLinks} />}
          </nav>
        </SidebarContent>

        <div className="relative z-10 border-t border-sidebar-border p-3 group-data-[collapsible=icon]:p-1">
          <div className="flex min-w-0 items-center gap-1 group-data-[collapsible=icon]:justify-center">
            <Link
              to="/dashboard/profile"
              className="group flex min-h-14 min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring"
            >
              <Avatar className="size-10 shrink-0 border border-sidebar-border">
                {user?.avatar?.url && (
                  <AvatarImage
                    src={user.avatar.url}
                    alt={user.avatar.altText ?? user.fullName}
                  />
                )}
                <AvatarFallback className="bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground">
                  {getInitials(user?.fullName ?? "Brijesh")}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm leading-tight font-semibold text-sidebar-foreground">
                  {user?.fullName ?? "Brijesh"}
                </p>

                <div className="mt-1.5 flex items-center gap-1.5">
                  <Badge
                    variant="secondary"
                    className="h-5 border border-sidebar-border bg-sidebar-primary px-1.5 text-[10px] font-semibold text-sidebar-primary-foreground uppercase"
                  >
                    {user?.role ?? "Staff"}
                  </Badge>
                  <span
                    aria-hidden="true"
                    className={`size-2 rounded-full ${isOnline ? "bg-success" : "bg-sidebar-foreground/50"}`}
                  ></span>
                  <span className="text-[10px] text-sidebar-foreground/60">
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Account options"
                className="flex size-10 shrink-0 items-center justify-center rounded-lg text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring"
              >
                <MoreHorizontal className="size-4 group-data-[collapsible=icon]:hidden" />
                <Avatar className="hidden size-9 border border-sidebar-border group-data-[collapsible=icon]:flex">
                  {user?.avatar?.url && (
                    <AvatarImage
                      src={user.avatar.url}
                      alt={user.avatar.altText ?? user.fullName}
                    />
                  )}
                  <AvatarFallback className="bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground">
                    {getInitials(user?.fullName ?? "Brijesh")}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                side="right"
                className="w-56 border-sidebar-border bg-sidebar-accent text-sidebar-foreground"
              >
                <DropdownMenuItem className="text-sidebar-foreground/80 focus:bg-sidebar-accent focus:text-sidebar-foreground">
                  <Link
                    to="/dashboard/profile"
                    className="flex w-full items-center gap-2"
                  >
                    <UserRound className="size-4 text-sidebar-foreground/60" />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sidebar-foreground/80 focus:bg-sidebar-accent focus:text-sidebar-foreground">
                  <Link
                    to="/dashboard/profile"
                    className="flex w-full items-center gap-2"
                  >
                    <Settings className="size-4 text-sidebar-foreground/60" />
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sidebar-foreground/80 focus:bg-sidebar-accent focus:text-sidebar-foreground">
                  <Link
                    to="/dashboard/profile"
                    className="flex w-full items-center gap-2"
                  >
                    <KeyRound className="size-4 text-sidebar-foreground/60" />
                    Change Password
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-sidebar-border" />
                <DropdownMenuItem
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                  className="text-sidebar-foreground/80 focus:bg-sidebar-accent focus:text-sidebar-foreground"
                >
                  <LogOut className="size-4 text-sidebar-foreground/60" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
