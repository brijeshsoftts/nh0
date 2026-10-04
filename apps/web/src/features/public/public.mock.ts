import {
  AirVent,
  CarFront,
  ConciergeBell,
  ShieldCheck,
  ShowerHead,
  Sparkles,
  Wifi,
  Zap,
} from "lucide-react";
import type { AmenityHighlight, Testimonial } from "./public.types";

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80";

export const AMENITIES: AmenityHighlight[] = [
  {
    icon: Wifi,
    title: "High-speed Wi-Fi",
    description: "A fast, reliable connection in every room and corridor.",
  },
  {
    icon: AirVent,
    title: "Climate control",
    description:
      "Air conditioning you set yourself, so you sleep at your temperature.",
  },
  {
    icon: ConciergeBell,
    title: "24-hour front desk",
    description:
      "Check in or ask for anything, at any hour of the day or night.",
  },
  {
    icon: Sparkles,
    title: "Daily housekeeping",
    description: "Fresh linen and a reset room, timed around your schedule.",
  },
  {
    icon: ShowerHead,
    title: "Rain shower and hot water",
    description: "Steady pressure and hot water available around the clock.",
  },
  {
    icon: ShieldCheck,
    title: "In-room safe and security",
    description: "A personal safe in your room and a monitored property.",
  },
  {
    icon: CarFront,
    title: "Guarded parking",
    description: "A secure place to leave the car when you arrive by road.",
  },
  {
    icon: Zap,
    title: "Power backup",
    description: "Lights, cooling and charging stay on, even during an outage.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    guestName: "Ananya Mehra",
    guestLocation: "New Delhi",
    stay: "3 nights, Heritage Twin Room",
    rating: 5,
    quote:
      "Our flight was delayed to midnight, and the front desk still had the room ready within minutes. The bed, the quiet, the small details: it felt like staying with family who happen to run a very good hotel.",
  },
  {
    id: "t2",
    guestName: "Rohan Verma",
    guestLocation: "Mumbai",
    stay: "2 nights, Deluxe King Room",
    rating: 5,
    quote:
      "Booking took under two minutes and the confirmation arrived instantly. The room was spotless and exactly as pictured.",
  },
  {
    id: "t3",
    guestName: "Sarah Whitfield",
    guestLocation: "London",
    stay: "5 nights, Royal Suite",
    rating: 5,
    quote:
      "Warm, unfussy and impeccably clean. The team knew my name by the second morning.",
  },
];

/** Replace with the real API response. Shape matches AvailableRoomListItemResponse. */
export const MOCK_ROOMS = [
  {
    name: "Deluxe King Room",
    slug: "deluxe-king-room",
    description:
      "A calm, light-filled room with a plush king bed, a writing desk and a rain shower, made for restful stays.",
    sizeSqFt: 320,
    maxGuests: 3,
    adults: 2,
    children: 1,
    basePrice: 6500,
    bedType: "KING",
    bedCount: 1,
    availableRooms: 6,
    image: {
      url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
      altText: "Deluxe king room with a made bed and soft daylight",
    },
    amenities: [
      { name: "High-speed Wi-Fi", icon: "wifi" },
      { name: "Air conditioning", icon: "air-vent" },
      { name: "Smart TV", icon: "tv" },
      { name: "Rain shower", icon: "shower-head" },
      { name: "In-room safe", icon: "shield-check" },
    ],
  },
  {
    name: "Heritage Twin Room",
    slug: "heritage-twin-room",
    description:
      "Two generous beds, warm Awadhi-inspired textiles and a quiet corner for tea, ideal for friends or family.",
    sizeSqFt: 360,
    maxGuests: 3,
    adults: 3,
    children: 0,
    basePrice: 7800,
    bedType: "TWIN",
    bedCount: 2,
    availableRooms: 2,
    image: {
      url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      altText: "Twin room with two beds and warm lighting",
    },
    amenities: [
      { name: "High-speed Wi-Fi", icon: "wifi" },
      { name: "Air conditioning", icon: "air-vent" },
      { name: "Tea and coffee maker", icon: "coffee" },
      { name: "Smart TV", icon: "tv" },
    ],
  },
  {
    name: "Royal Suite",
    slug: "royal-suite",
    description:
      "Our most spacious address: a separate sitting area, a king bed and a deep-soak bath, with space to spread out.",
    sizeSqFt: 620,
    maxGuests: 4,
    adults: 3,
    children: 1,
    basePrice: 14500,
    bedType: "KING",
    bedCount: 1,
    availableRooms: 1,
    image: {
      url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      altText: "Spacious suite with a king bed and sitting area",
    },
    amenities: [
      { name: "High-speed Wi-Fi", icon: "wifi" },
      { name: "Air conditioning", icon: "air-vent" },
      { name: "Smart TV", icon: "tv" },
      { name: "Tea and coffee maker", icon: "coffee" },
      { name: "Rain shower", icon: "shower-head" },
      { name: "In-room safe", icon: "shield-check" },
    ],
  },
];

export const MOCK_ROOM = {
  id: "cmutdp4h8000fabcpifk3pyte",
  name: "Presidential King Suite",
  slug: "presidential-king-suite",
  description:
    "The hotel's most luxurious accommodation, featuring a spacious bedroom, separate living area, dining space, and premium amenities.",
  sizeSqFt: 900,
  maxGuests: 4,
  adults: 2,
  children: 2,
  basePrice: 14999,
  currency: "INR",
  bedType: "KING",
  bedCount: 1,
  smokingAllowed: false,
  petsAllowed: false,
  images: [
    {
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      altText: "Presidential king suite",
      isPrimary: true,
      sortOrder: 0,
    },
    {
      url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      altText: "Luxury presidential suite living room",
      isPrimary: false,
      sortOrder: 1,
    },
    {
      url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      altText: "Luxury suite interior",
      isPrimary: false,
      sortOrder: 2,
    },
  ],
  amenities: [
    {
      id: "amenity-wifi",
      name: "High-Speed Wi-Fi",
      icon: "Wifi",
    },
    {
      id: "amenity-ac",
      name: "Air Conditioning",
      icon: "Snowflake",
    },
    {
      id: "amenity-tv",
      name: "Smart TV",
      icon: "Tv",
    },
    {
      id: "amenity-mini-bar",
      name: "Mini Bar",
      icon: "Refrigerator",
    },
    {
      id: "amenity-coffee",
      name: "Coffee Maker",
      icon: "Coffee",
    },
    {
      id: "amenity-bath",
      name: "Bathtub",
      icon: "Bath",
    },
    {
      id: "amenity-safe",
      name: "Electronic Safe",
      icon: "LockKeyhole",
    },
    {
      id: "amenity-balcony",
      name: "Private Balcony",
      icon: "DoorOpen",
    },
    {
      id: "amenity-breakfast",
      name: "Complimentary Breakfast",
      icon: "Utensils",
    },
    {
      id: "amenity-service",
      name: "Room Service",
      icon: "ConciergeBell",
    },
  ],
  availability: {
    isAvailable: false,
  },
};
