import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  to: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type AmenityHighlight = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Testimonial = {
  id: string;
  guestName: string;
  guestLocation: string;
  stay: string;
  rating: number;
  quote: string;
};
