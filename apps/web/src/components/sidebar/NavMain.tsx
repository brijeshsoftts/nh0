"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export type NavItem = {
  label?: string;
  isSection?: boolean;
  title?: string;
  icon?: LucideIcon;
  href?: string;
  children?: NavItem[];
};

function matchesPath(item: NavItem, pathname: string): boolean {
  if (item.href === pathname) {
    return true;
  }

  return (
    item.children?.some(
      (child) =>
        (!!child.href && pathname.startsWith(`${child.href}/`)) ||
        matchesPath(child, pathname)
    ) ?? false
  );
}

export function NavMain({ items }: { items: NavItem[] }) {
  return (
    <>
      {items.map((item, index) => (
        <NavMainItem
          key={item.title || item.label || index}
          item={item}
          id={index}
        />
      ))}
    </>
  );
}

function NavMainItem({ item }: { item: NavItem; id: number }) {
  const location = useLocation();
  const hasChildren = !!item.children?.length;
  const isCurrent = matchesPath(item, location.pathname);
  const [isOpen, setIsOpen] = React.useState(false);

  if (item.isSection && item.label) {
    return (
      <SidebarGroup className="px-0 py-1 first:pt-0">
        <SidebarGroupLabel className="h-8 rounded-none px-3 pt-2 pb-1 text-[11px] font-semibold tracking-[0.12em] text-sidebar-foreground/55 uppercase">
          {item.label}
        </SidebarGroupLabel>
      </SidebarGroup>
    );
  }

  if (hasChildren && item.title) {
    return (
      <SidebarGroup className="px-0 py-1">
        <SidebarMenu>
          <Collapsible open={isOpen || isCurrent} onOpenChange={setIsOpen}>
            <SidebarMenuItem>
              <CollapsibleTrigger
                className="w-full"
                render={
                  <SidebarMenuButton
                    id={`nav-main-trigger-${item.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    tooltip={item.title}
                    isActive={isCurrent}
                    className={cn(
                      "h-11 cursor-pointer rounded-md px-3 text-sm text-sidebar-foreground/75 transition-colors duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                      isCurrent &&
                        "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                    )}
                  >
                    {item.icon && (
                      <item.icon
                        size={16}
                        className={cn(
                          "size-4 text-sidebar-foreground/70 transition-colors duration-150 group-hover/menu-button:text-sidebar-accent-foreground",
                          isCurrent && "text-sidebar-accent-foreground"
                        )}
                      />
                    )}
                    <span>{item.title}</span>
                    <ChevronRight
                      className={cn(
                        "ml-auto transition-transform duration-200",
                        (isOpen || isCurrent) &&
                          "rotate-90 text-sidebar-accent-foreground",
                        !isCurrent && "text-sidebar-foreground/60"
                      )}
                    />
                  </SidebarMenuButton>
                }
              />

              <CollapsibleContent>
                <SidebarMenuSub className="me-0 pe-0">
                  {item.children!.map((child, index) => (
                    <NavMainSubItem key={child.title || index} item={child} />
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  if (item.title) {
    return (
      <SidebarGroup className="px-0 py-0.5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              id={`nav-main-button-${item.title
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              tooltip={item.title}
              isActive={isCurrent}
              className={cn(
                "h-11 cursor-pointer rounded-md px-3 text-sm text-sidebar-foreground/75 transition-colors duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                isCurrent &&
                  "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
              )}
              render={<Link to={item.href!} />}
            >
              {item.icon && (
                <item.icon
                  className={cn(
                    "size-4 text-sidebar-foreground/70 transition-colors duration-150 group-hover/menu-button:text-sidebar-accent-foreground",
                    isCurrent && "text-sidebar-accent-foreground"
                  )}
                />
              )}
              {item.title}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return null;
}

function NavMainSubItem({ item }: { item: NavItem }) {
  const location = useLocation();
  const hasChildren = !!item.children?.length;
  const isCurrent = matchesPath(item, location.pathname);
  const [isOpen, setIsOpen] = React.useState(false);

  if (hasChildren && item.title) {
    return (
      <SidebarMenuSubItem>
        <Collapsible open={isOpen || isCurrent} onOpenChange={setIsOpen}>
          <CollapsibleTrigger
            className="w-full"
            render={
              <SidebarMenuSubButton
                id={`nav-sub-trigger-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                isActive={isCurrent}
                className={cn(
                  "h-10 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/75 transition-colors duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                  isCurrent &&
                    "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                {item.icon && (
                  <item.icon
                    className={cn(
                      "size-4 text-sidebar-foreground/70 transition-colors duration-150 group-hover/menu-sub-item:text-sidebar-accent-foreground",
                      isCurrent && "text-sidebar-accent-foreground"
                    )}
                  />
                )}
                <span>{item.title}</span>
                <ChevronRight
                  className={cn(
                    "ml-auto transition-transform duration-200",
                    (isOpen || isCurrent) &&
                      "rotate-90 text-sidebar-accent-foreground",
                    !isCurrent && "text-sidebar-foreground/60"
                  )}
                />
              </SidebarMenuSubButton>
            }
          />
          <CollapsibleContent>
            <SidebarMenuSub className="me-0 pe-0">
              {item.children!.map((child, index) => (
                <NavMainSubItem key={child.title || index} item={child} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuSubItem>
    );
  }

  if (item.title) {
    return (
      <SidebarMenuSubItem className="w-full">
        <SidebarMenuSubButton
          id={`nav-sub-button-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
          className={cn(
            "h-10 w-full rounded-md text-sidebar-foreground/75 transition-colors duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring",
            isCurrent &&
              "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
          )}
          isActive={isCurrent}
          render={
            <Link to={item.href!}>
              {item.icon && (
                <item.icon
                  className={cn(
                    "size-4 text-sidebar-foreground/70 transition-colors duration-150 group-hover/menu-sub-item:text-sidebar-accent-foreground",
                    isCurrent && "text-sidebar-accent-foreground"
                  )}
                />
              )}
              {item.title}
            </Link>
          }
        />
      </SidebarMenuSubItem>
    );
  }

  return null;
}
