type NavigationGroup = {
  label: string;
  titles: string[];
};

export const NAV_GROUPS: NavigationGroup[] = [
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
      "Tasks",
      "Browse Rooms",
      "My Bookings",
      "My Tasks",
    ],
  },
  { label: "Operations", titles: ["Issues", "Inquiries", "Audit Logs"] },
  { label: "Reports", titles: ["Payments", "Invoices"] },
  { label: "Settings", titles: ["Profile"] },
];

export function getNavigationGroupLabel(title: string): string {
  return (
    NAV_GROUPS.find(({ titles }) => titles.includes(title))?.label ?? "Other"
  );
}
