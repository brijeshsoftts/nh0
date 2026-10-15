import { MoreHorizontal } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { DropdownProfile } from "@/components/common/DropdownProfile";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ADMIN_PAGES,
  CUSTOMER_PAGES,
  HOUSEKEEPER_PAGES,
  MANAGER_PAGES,
  RECEPTIONIST_PAGES,
} from "@/constants/page";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/lib/format";

import { Logo } from "../common/Logo";

import type { NavItem } from "./NavMain";
import { NavMain } from "./NavMain";

const NAV_GROUPS = [
  { label: "Overview", titles: ["Dashboard"] },
  {
    label: "Management",
    titles: [
      "Users",
      "Staff",
      "Customers",
      "Rooms",
      "New Booking",
      "Bookings",
      "Browse Rooms",
      "My Bookings",
      "Tasks",
      "My Tasks",
    ],
  },
  { label: "Operations", titles: ["Issues", "Audit Logs"] },
  { label: "Finance", titles: ["Payments", "Invoices"] },
  { label: "Account", titles: ["Profile"] },
];

function groupLinks(items: NavItem[]): NavItem[] {
  const groupedTitles = new Set(NAV_GROUPS.flatMap(({ titles }) => titles));
  const groupedItems = NAV_GROUPS.flatMap(({ label, titles }) => {
    const groupItems = items.filter(
      (item) => item.title && titles.includes(item.title)
    );

    return groupItems.length ? [{ isSection: true, label }, ...groupItems] : [];
  });
  const otherItems = items.filter(
    (item) => !item.title || !groupedTitles.has(item.title)
  );

  return otherItems.length
    ? [...groupedItems, { isSection: true, label: "Other" }, ...otherItems]
    : groupedItems;
}

export function AppSidebar() {
  const navigate = useNavigate();
  const { user } = useAuth();
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
    <Sidebar className="border-r border-sidebar-border bg-sidebar px-0 text-sidebar-foreground">
      <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
        <SidebarHeader className="border-b border-sidebar-border p-3">
          <SidebarMenu>
            <SidebarMenuItem className="pl-4">
              <Link to="/dashboard" className="flex h-full w-full items-center">
                <Logo />
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="min-h-0 flex-1 py-4">
          <ScrollArea className="h-full">
            <div className="px-3">
              {groupedLinks.length > 0 && <NavMain items={groupedLinks} />}
            </div>
          </ScrollArea>
        </SidebarContent>

        <div className="border-t border-sidebar-border p-3">
          <div className="flex min-w-0 items-center gap-1 rounded-lg">
            <Link
              to="/dashboard/profile"
              className="group flex min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
            >
              <Avatar className="size-9 shrink-0">
                <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                  {user ? getInitials(user.fullName) : "U"}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm leading-tight font-semibold text-sidebar-foreground">
                  {user?.fullName ?? "User"}
                </p>

                <div className="mt-1.5 flex items-center gap-1.5">
                  <Badge
                    variant="secondary"
                    className="h-5 px-1.5 text-[10px] capitalize"
                  >
                    {user?.role ?? "Staff"}
                  </Badge>
                  <span aria-hidden="true" className="relative flex size-2">
                    {isOnline && (
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/40" />
                    )}
                    <span
                      className={`relative inline-flex size-2 rounded-full ${isOnline ? "bg-primary" : "bg-muted-foreground/50"}`}
                    />
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </Link>

            <DropdownProfile>
              <button
                type="button"
                aria-label="Account options"
                className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <MoreHorizontal className="size-4" />
              </button>
            </DropdownProfile>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
