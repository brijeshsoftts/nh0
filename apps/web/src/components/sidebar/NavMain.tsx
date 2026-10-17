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
      <SidebarGroup className="p-0 first:pt-0">
        <SidebarGroupLabel className="h-auto px-3 py-2 text-xs tracking-wider text-muted-foreground">
          {item.label}
        </SidebarGroupLabel>
      </SidebarGroup>
    );
  }

  if (hasChildren && item.title) {
    return (
      <SidebarGroup>
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
                      "h-9 cursor-pointer rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all duration-200 hover:bg-muted/60 hover:text-foreground",
                      isCurrent &&
                        "relative bg-primary/10! font-medium text-primary! shadow-xs before:absolute before:top-1/2 before:left-0 before:h-5 before:w-1 before:-translate-y-1/2 before:rounded-r-full before:bg-primary before:content-['']"
                    )}
                  >
                    {item.icon && (
                      <item.icon
                        size={16}
                        className={cn(
                          "text-muted-foreground/80 transition-transform duration-200 group-hover/menu-button:scale-105 group-hover/menu-button:text-foreground",
                          isCurrent && "text-primary"
                        )}
                      />
                    )}
                    <span>{item.title}</span>
                    <ChevronRight
                      className={cn(
                        "ml-auto transition-transform duration-200",
                        (isOpen || isCurrent) && "rotate-90 text-primary",
                        !isCurrent && "text-muted-foreground/80"
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
      <SidebarGroup className="p-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              id={`nav-main-button-${item.title
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              tooltip={item.title}
              isActive={isCurrent}
              className={cn(
                "h-10 cursor-pointer rounded-sm px-3 text-sm text-foreground transition-all duration-200 hover:bg-primary/50 hover:text-foreground",
                isCurrent &&
                  "relative bg-primary! font-medium text-background! shadow-xs before:absolute before:top-1/2 before:left-0 before:h-5 before:w-1 before:-translate-y-1/2 before:rounded-r-full before:bg-primary before:content-['']"
              )}
              render={<Link to={item.href!} />}
            >
              {item.icon && (
                <item.icon
                  className={cn(
                    "text-foreground transition-transform duration-200 group-hover/menu-button:scale-105 group-hover/menu-button:text-foreground",
                    isCurrent && "text-background!"
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
                  "h-9 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted/60 hover:text-foreground",
                  isCurrent &&
                    "relative bg-primary/10! text-primary! shadow-xs before:absolute before:top-1/2 before:left-0 before:h-5 before:w-1 before:-translate-y-1/2 before:rounded-r-full before:bg-primary before:content-['']"
                )}
              >
                {item.icon && (
                  <item.icon
                    className={cn(
                      "text-muted-foreground/80 transition-transform duration-200 group-hover/menu-sub-item:scale-105 group-hover/menu-sub-item:text-foreground",
                      isCurrent && "text-primary"
                    )}
                  />
                )}
                <span>{item.title}</span>
                <ChevronRight
                  className={cn(
                    "ml-auto transition-transform duration-200",
                    (isOpen || isCurrent) && "rotate-90 text-primary",
                    !isCurrent && "text-muted-foreground/80"
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
            "w-full rounded-lg text-muted-foreground transition-all duration-200 hover:bg-muted/60 hover:text-foreground",
            isCurrent &&
              "relative bg-primary/10! font-medium text-primary! shadow-xs before:absolute before:top-1/2 before:left-0 before:h-5 before:w-1 before:-translate-y-1/2 before:rounded-r-full before:bg-primary before:content-['']"
          )}
          isActive={isCurrent}
          render={
            <Link to={item.href!}>
              {item.icon && (
                <item.icon
                  className={cn(
                    "text-muted-foreground/80 transition-transform duration-200 group-hover/menu-sub-item:scale-105 group-hover/menu-sub-item:text-foreground",
                    isCurrent && "text-primary"
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
