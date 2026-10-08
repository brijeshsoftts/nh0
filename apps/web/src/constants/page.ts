import {
  BedDouble,
  CalendarCheck,
  CalendarPlus,
  CircleDollarSign,
  ClipboardCheck,
  FileClock,
  LayoutDashboard,
  UserCheck,
  UserRound,
  Users,
  Wrench,
} from "lucide-react";

import type { NavItem } from "@/components/sidebar/NavMain";

export const ADMIN_PAGES: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Users",
    icon: Users,
    href: "/dashboard/users",
  },
  {
    title: "Staff",
    icon: Users,
    href: "/dashboard/staff",
  },
  {
    title: "Customers",
    icon: UserCheck,
    href: "/dashboard/customers",
  },
  {
    title: "Rooms",
    icon: BedDouble,
    href: "/dashboard/rooms",
  },
  {
    title: "Bookings",
    icon: CalendarCheck,
    href: "/dashboard/bookings",
  },
  {
    title: "New Booking",
    icon: CalendarPlus,
    href: "/dashboard/bookings/new",
  },
  {
    title: "Issues",
    icon: Wrench,
    href: "/dashboard/issues",
  },
  {
    title: "Tasks",
    icon: ClipboardCheck,
    href: "/dashboard/tasks",
  },
  {
    title: "Payments",
    icon: CircleDollarSign,
    href: "/dashboard/payments",
  },
  {
    title: "Audit Logs",
    icon: FileClock,
    href: "/dashboard/audit-logs",
  },
  {
    title: "Profile",
    icon: UserRound,
    href: "/dashboard/profile",
  },
];

export const MANAGER_PAGES: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Staff",
    icon: Users,
    href: "/dashboard/staff",
  },
  {
    title: "Customers",
    icon: UserCheck,
    href: "/dashboard/customers",
  },
  {
    title: "Rooms",
    icon: BedDouble,
    href: "/dashboard/rooms",
  },
  {
    title: "Bookings",
    icon: CalendarCheck,
    href: "/dashboard/bookings",
  },
  {
    title: "New Booking",
    icon: CalendarPlus,
    href: "/dashboard/bookings/new",
  },
  {
    title: "Issues",
    icon: Wrench,
    href: "/dashboard/issues",
  },
  {
    title: "Tasks",
    icon: ClipboardCheck,
    href: "/dashboard/tasks",
  },
  {
    title: "Payments",
    icon: CircleDollarSign,
    href: "/dashboard/payments",
  },
  {
    title: "Profile",
    icon: UserRound,
    href: "/dashboard/profile",
  },
];

export const RECEPTIONIST_PAGES: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Customers",
    icon: UserCheck,
    href: "/dashboard/customers",
  },
  {
    title: "Rooms",
    icon: BedDouble,
    href: "/dashboard/rooms",
  },
  {
    title: "Bookings",
    icon: CalendarCheck,
    href: "/dashboard/bookings",
  },
  {
    title: "New Booking",
    icon: CalendarPlus,
    href: "/dashboard/bookings/new",
  },
  {
    title: "Payments",
    icon: CircleDollarSign,
    href: "/dashboard/payments",
  },
  {
    title: "Profile",
    icon: UserRound,
    href: "/dashboard/profile",
  },
];

export const HOUSEKEEPER_PAGES: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "My Tasks",
    icon: ClipboardCheck,
    href: "/dashboard/tasks",
  },
  {
    title: "Rooms",
    icon: BedDouble,
    href: "/dashboard/rooms",
  },
  {
    title: "Profile",
    icon: UserRound,
    href: "/dashboard/profile",
  },
];

export const CUSTOMER_PAGES: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Browse Rooms",
    icon: BedDouble,
    href: "/dashboard/rooms",
  },
  {
    title: "My Bookings",
    icon: CalendarCheck,
    href: "/dashboard/bookings",
  },
  {
    title: "New Booking",
    icon: CalendarPlus,
    href: "/dashboard/bookings/new",
  },
  {
    title: "Payments",
    icon: CircleDollarSign,
    href: "/dashboard/payments",
  },
  {
    title: "Issues",
    icon: Wrench,
    href: "/dashboard/issues",
  },
  {
    title: "Profile",
    icon: UserRound,
    href: "/dashboard/profile",
  },
];
