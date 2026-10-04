import { ArrowUpRight, ExternalLink, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Logo } from "../common/Logo";
import { NavMain } from "./NavMain";
import { getInitials } from "@/lib/format";

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

  return (
    <Sidebar className="px-0">
      <div className="flex h-full flex-col gap-6 bg-muted">
        <SidebarHeader className="border-b p-3">
          <SidebarMenu>
            <SidebarMenuItem className="pl-4">
              <Link to="/dashboard" className="h-full w-full">
                <Logo />
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <ScrollArea className="h-full">
            <div className="px-4">{links && <NavMain items={links} />}</div>
            <div className="absolute bottom-2 w-full space-y-3 border-t border-border/80 p-4 pb-0">
              <Link
                to="/"
                className="flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors hover:bg-muted hover:text-foreground"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Public</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
              </Link>
              <div className="rounded-md border border-border/60 bg-background/50 p-2 shadow-xs">
                <div className="flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-muted/50">
                  <Avatar className="size-9 shrink-0 border border-border/60">
                    <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                      {user ? getInitials(user.fullName) : "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm leading-tight font-semibold text-foreground">
                      {user?.fullName ?? "User"}
                    </p>

                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="truncate text-[10px] font-medium text-muted-foreground capitalize">
                        {user?.role ?? "Staff"}
                      </span>

                      <span className="size-0.5 shrink-0 rounded-full bg-muted-foreground/40" />

                      <span className="text-[10px] font-medium text-primary">
                        {isOnline ? "Online" : "Offline"}
                      </span>
                    </div>
                  </div>

                  <div
                    className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"
                    title="Verified account"
                  >
                    <ShieldCheck className="size-4" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
