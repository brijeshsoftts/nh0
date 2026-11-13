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
  SidebarGroupContent,
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
      {items.map((item, index) =>
        item.isSection ? (
          <NavSection key={item.label || index} item={item} />
        ) : (
          <SidebarGroup key={item.title || index} className="px-0 py-1">
            <SidebarMenu>
              <NavMainItem item={item} id={index} />
            </SidebarMenu>
          </SidebarGroup>
        )
      )}
    </>
  );
}

function NavSection({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <SidebarGroup className="px-0 py-1 first:pt-0">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <SidebarGroupLabel className="h-8 px-3 text-[10px] font-semibold text-sidebar-foreground/60 uppercase group-data-[collapsible=icon]:hidden">
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md text-left transition-colors hover:text-sidebar-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring">
            <span className="uppercase">{item.label}</span>
            <ChevronRight
              className={cn(
                "size-3.5 text-sidebar-foreground/60 transition-transform duration-200",
                isOpen && "rotate-90 text-sidebar-foreground"
              )}
            />
          </CollapsibleTrigger>
        </SidebarGroupLabel>

        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {item.children?.map((child, index) => (
                <NavMainItem
                  key={child.title || index}
                  item={child}
                  id={index}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
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
        <SidebarGroupLabel className="h-8 px-3 pt-2 pb-1 text-2xs font-semibold tracking-[0.12em] text-sidebar-foreground/55 uppercase">
          {item.label}
        </SidebarGroupLabel>
      </SidebarGroup>
    );
  }

  if (hasChildren && item.title) {
    return (
      <SidebarMenuItem>
        <Collapsible open={isOpen || isCurrent} onOpenChange={setIsOpen}>
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
                  "h-11 cursor-pointer rounded-lg border-l-2 border-transparent px-3 text-sm text-sidebar-foreground/80 transition-colors duration-150 hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring data-active:bg-sidebar-primary data-active:text-sidebar-primary-foreground",
                  isCurrent && "border-sidebar-ring font-semibold"
                )}
              >
                {item.icon && (
                  <item.icon
                    className={cn(
                      "size-4 text-sidebar-foreground/60 transition-colors duration-150 group-hover/menu-button:text-sidebar-foreground",
                      isCurrent && "text-sidebar-primary-foreground"
                    )}
                  />
                )}
                <span>{item.title}</span>
                <ChevronRight
                  className={cn(
                    "ml-auto transition-transform duration-200",
                    (isOpen || isCurrent) &&
                      "rotate-90 text-sidebar-primary-foreground",
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
        </Collapsible>
      </SidebarMenuItem>
    );
  }

  if (item.title) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          id={`nav-main-button-${item.title
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
          tooltip={item.title}
          isActive={isCurrent}
          className={cn(
            "h-11 cursor-pointer rounded-lg border-l-2 border-transparent px-3 text-sm text-sidebar-foreground/80 transition-colors duration-150 hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring data-active:bg-sidebar-primary data-active:text-sidebar-primary-foreground",
            isCurrent && "border-sidebar-ring font-semibold"
          )}
          render={<Link to={item.href!} />}
        >
          {item.icon && (
            <item.icon
              className={cn(
                "size-4 text-sidebar-foreground/60 transition-colors duration-150 group-hover/menu-button:text-sidebar-foreground",
                isCurrent && "text-sidebar-primary-foreground"
              )}
            />
          )}
          {item.title}
        </SidebarMenuButton>
      </SidebarMenuItem>
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
                  "h-10 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/80 transition-colors duration-150 hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                  isCurrent &&
                    "bg-sidebar-primary text-sidebar-primary-foreground"
                )}
              >
                {item.icon && (
                  <item.icon
                    className={cn(
                      "size-4 text-sidebar-foreground/60 transition-colors duration-150 group-hover/menu-sub-item:text-sidebar-foreground",
                      isCurrent && "text-sidebar-primary-foreground"
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
            "h-10 w-full rounded-md text-sidebar-foreground/80 transition-colors duration-150 hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring",
            isCurrent &&
              "bg-sidebar-primary font-semibold text-sidebar-primary-foreground"
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
