import {
  AirVent,
  CarFront,
  Coffee,
  ConciergeBell,
  ShieldCheck,
  ShowerHead,
  Sparkles,
  Tv,
  Wifi,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps the `icon` string returned by the API (Amenity.icon) to a lucide icon.
 * Add a key here whenever a new icon name is introduced in the admin dashboard.
 */
const AMENITY_ICONS: Record<string, LucideIcon> = {
  wifi: Wifi,
  "air-vent": AirVent,
  tv: Tv,
  coffee: Coffee,
  "shower-head": ShowerHead,
  "shield-check": ShieldCheck,
  zap: Zap,
  "car-front": CarFront,
  "concierge-bell": ConciergeBell,
  sparkles: Sparkles,
};

export function getAmenityIcon(icon: string | null): LucideIcon {
  if (!icon) return Sparkles;
  return AMENITY_ICONS[icon] ?? Sparkles;
}
