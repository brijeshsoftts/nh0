import type { NavItem, SocialLink } from "@/features/public/public.types";
import { AArrowDown } from "lucide-react";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Rooms", to: "/rooms" },
  { label: "Contact", to: "/contact" },
];

export const LEGAL_ITEMS: NavItem[] = [
  { label: "Terms and conditions", to: "/terms" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com", icon: AArrowDown },
  { label: "Facebook", href: "https://facebook.com", icon: AArrowDown },
  { label: "X (Twitter)", href: "https://x.com", icon: AArrowDown },
  { label: "YouTube", href: "https://youtube.com", icon: AArrowDown },
];
