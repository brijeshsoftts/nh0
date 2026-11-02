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
    guestName: "Saim Khan",
    guestLocation: "Lucknow, Uttar Pradesh",
    stay: "3 nights, Executive Room",
    rating: 5,
    quote:
      "The room was clean, the check-in was straightforward, and the team was helpful throughout our stay.",
  },
  {
    id: "t2",
    guestName: "Priya Srivastava",
    guestLocation: "Kanpur, Uttar Pradesh",
    stay: "2 nights, Deluxe Room",
    rating: 5,
    quote:
      "Booking was clear, the room matched the details, and the location worked well for our visit to Lucknow.",
  },
  {
    id: "t3",
    guestName: "Ankit Mishra",
    guestLocation: "Prayagraj, Uttar Pradesh",
    stay: "2 nights, Premium Room",
    rating: 5,
    quote:
      "The stay was comfortable and the staff answered our questions promptly.",
  },
];

/** Replace with the real API response. Shape matches AvailableRoomListItemResponse. */
export const MOCK_ROOMS = [
  {
    name: "Deluxe Room",
    slug: "deluxe-room",
    description:
      "A comfortable room with a king bed, work desk, air conditioning and attached bathroom.",
    sizeSqFt: 320,
    maxGuests: 3,
    adults: 2,
    children: 1,
    basePrice: 6200,
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
    name: "Premium Room",
    slug: "premium-room",
    description:
      "A well-appointed room with twin beds, a tea and coffee maker and space to work.",
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
    name: "Luxury Suite",
    slug: "luxury-suite",
    description:
      "A spacious suite with a separate sitting area, king bed and work desk for a longer stay.",
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
  name: "Luxury Suite",
  slug: "luxury-suite",
  description:
    "A spacious suite with a separate sitting area, king bed and work desk.",
  sizeSqFt: 680,
  maxGuests: 4,
  adults: 2,
  children: 2,
  basePrice: 14500,
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
      name: "Complimentary Drinking Water",
      icon: "Refrigerator",
    },
    {
      id: "amenity-coffee",
      name: "Tea and Coffee Maker",
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
      name: "24-Hour Room Service",
      icon: "ConciergeBell",
    },
  ],
  availability: {
    isAvailable: false,
  },
};

export const rooms = [
  {
    id: "room_001",
    slug: "deluxe-room",
    title: "Deluxe Room",
    price: 6200,
    description:
      "A comfortable king room with air conditioning, a work desk and attached bathroom.",
    maxGuests: 3,
    bedCount: 1,
    image: {
      url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
      altText: "Illustrative king room with a comfortable bed",
    },
    amenities: [
      { name: "Complimentary Wi-Fi", icon: "wifi" },
      { name: "Air Conditioning", icon: "air-vent" },
      { name: "King Bed", icon: "bed-double" },
      { name: "Smart TV", icon: "tv" },
      { name: "Attached Bathroom", icon: "bath" },
      { name: "24-Hour Room Service", icon: "bell" },
    ],
  },
  {
    id: "room_002",
    slug: "premium-room",
    title: "Premium Room",
    price: 7800,
    description:
      "A twin room with a work desk, smart television and tea and coffee maker.",
    maxGuests: 3,
    bedCount: 2,
    image: {
      url: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      altText: "Illustrative twin room with two beds",
    },
    amenities: [
      { name: "Complimentary Wi-Fi", icon: "wifi" },
      { name: "Air Conditioning", icon: "air-vent" },
      { name: "Twin Beds", icon: "bed-double" },
      { name: "Work Desk", icon: "laptop" },
      { name: "Smart Television", icon: "tv" },
    ],
  },
  {
    id: "room_003",
    slug: "family-suite",
    title: "Family Suite",
    price: 12000,
    description:
      "A family suite with separate sleeping space, a sitting area and practical in-room amenities.",
    maxGuests: 5,
    bedCount: 2,
    image: {
      url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
      altText: "Spacious family hotel suite with elegant furnishings",
    },
    amenities: [
      { name: "Complimentary Wi-Fi", icon: "wifi" },
      { name: "Air Conditioning", icon: "air-vent" },
      { name: "Queen Beds", icon: "bed-double" },
      { name: "Living Area", icon: "sofa" },
      { name: "Mini Refrigerator", icon: "refrigerator" },
      { name: "Smart TV", icon: "tv" },
      { name: "Tea and Coffee Maker", icon: "coffee" },
    ],
  },
  {
    id: "room_004",
    slug: "executive-room",
    title: "Executive Room",
    price: 8500,
    description:
      "An executive room with a king bed, work desk, smart television and room service.",
    maxGuests: 3,
    bedCount: 1,
    image: {
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
      altText: "Illustrative executive hotel room",
    },
    amenities: [
      { name: "Complimentary Wi-Fi", icon: "wifi" },
      { name: "Air Conditioning", icon: "air-vent" },
      { name: "King Bed", icon: "bed-double" },
      { name: "Attached Bathroom", icon: "bath" },
      { name: "Tea and Coffee Maker", icon: "coffee" },
      { name: "Work Desk", icon: "laptop" },
      { name: "Complimentary Drinking Water", icon: "glass-water" },
    ],
  },
  {
    id: "room_005",
    slug: "luxury-suite",
    title: "Luxury Suite",
    price: 14500,
    description:
      "A suite with a separate sitting area, king bed, wardrobe and attached bathroom.",
    maxGuests: 4,
    bedCount: 1,
    image: {
      url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0",
      altText: "Illustrative hotel suite",
    },
    amenities: [
      { name: "Complimentary Wi-Fi", icon: "wifi" },
      { name: "Air Conditioning", icon: "air-vent" },
      { name: "King Bed", icon: "bed-single" },
      { name: "Smart Television", icon: "tv" },
      { name: "Attached Bathroom", icon: "bath" },
    ],
  },
];

export const testimonials = [
  {
    id: "testimonial-001",
    name: "Saim Khan",
    location: "Lucknow, Uttar Pradesh",
    content:
      "The room was clean, check-in was straightforward, and the team was helpful throughout our stay.",
    rating: 5,
    avatarUrl: "",
  },
  {
    id: "testimonial-002",
    name: "Priya Srivastava",
    location: "Kanpur, Uttar Pradesh",
    content:
      "Booking was clear, and the location worked well for our visit to Lucknow.",
    rating: 5,
    avatarUrl: "",
  },
  {
    id: "testimonial-003",
    name: "Ankit Mishra",
    location: "Prayagraj, Uttar Pradesh",
    content:
      "The stay was comfortable, and the staff answered our questions promptly.",
    rating: 4,
    avatarUrl: "",
  },
  {
    id: "testimonial-004",
    name: "Neha Gupta",
    location: "Lucknow, Uttar Pradesh",
    content:
      "The room was comfortable, and the team helped us with our questions during the stay.",
    rating: 5,
    avatarUrl: "",
  },
  {
    id: "testimonial-005",
    name: "Arjun Pandey",
    location: "Ayodhya, Uttar Pradesh",
    content:
      "The room details were clear before arrival, and the stay suited our family visit.",
    rating: 5,
    avatarUrl: "",
  },
  {
    id: "testimonial-006",
    name: "Pooja Shukla",
    location: "Sitapur, Uttar Pradesh",
    content:
      "The room details were clear before arrival, and the stay was comfortable for our family visit.",
    rating: 4,
    avatarUrl: "",
  },
];
