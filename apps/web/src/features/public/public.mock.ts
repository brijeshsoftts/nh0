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

export const rooms = [
  {
    id: "room_001",
    slug: "deluxe-king-room",
    title: "Deluxe King Room",
    price: 4500,
    description:
      "Experience comfort and elegance in our spacious Deluxe King Room, featuring a king-size bed, modern interiors, air conditioning, and a private bathroom. Perfect for couples or solo travelers.",
    maxGuests: 2,
    bedCount: 1,
    image: {
      url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
      altText: "Luxury deluxe king hotel room with a comfortable bed",
    },
    amenities: [
      { name: "Free Wi-Fi", icon: "wifi" },
      { name: "Air Conditioning", icon: "snowflake" },
      { name: "King Size Bed", icon: "bed-double" },
      { name: "Smart TV", icon: "tv" },
      { name: "Private Bathroom", icon: "bath" },
      { name: "Room Service", icon: "bell" },
    ],
  },
  {
    id: "room_002",
    slug: "superior-twin-room",
    title: "Superior Twin Room",
    price: 3500,
    description:
      "A comfortable and stylish room featuring two separate single beds, contemporary furnishings, and all essential amenities. Ideal for friends or business travelers.",
    maxGuests: 2,
    bedCount: 2,
    image: {
      url: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      altText: "Superior twin hotel room with two single beds",
    },
    amenities: [
      { name: "Free Wi-Fi", icon: "wifi" },
      { name: "Air Conditioning", icon: "snowflake" },
      { name: "Twin Beds", icon: "bed-double" },
      { name: "Work Desk", icon: "laptop" },
      { name: "Smart TV", icon: "tv" },
    ],
  },
  {
    id: "room_003",
    slug: "family-suite",
    title: "Family Suite",
    price: 6500,
    description:
      "Enjoy a relaxing family getaway in our spacious Family Suite. Featuring separate sleeping arrangements, a cozy seating area, and premium amenities for a comfortable stay with your loved ones.",
    maxGuests: 4,
    bedCount: 2,
    image: {
      url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
      altText: "Spacious family hotel suite with elegant furnishings",
    },
    amenities: [
      { name: "Free Wi-Fi", icon: "wifi" },
      { name: "Air Conditioning", icon: "snowflake" },
      { name: "Two Double Beds", icon: "bed-double" },
      { name: "Living Area", icon: "sofa" },
      { name: "Mini Refrigerator", icon: "refrigerator" },
      { name: "Smart TV", icon: "tv" },
      { name: "Complimentary Breakfast", icon: "coffee" },
    ],
  },
  {
    id: "room_004",
    slug: "premium-ocean-view-suite",
    title: "Premium Ocean View Suite",
    price: 9500,
    description:
      "Indulge in luxury with breathtaking ocean views from your private balcony. This premium suite features a king-size bed, elegant interiors, a spacious living area, and exclusive guest amenities.",
    maxGuests: 3,
    bedCount: 1,
    image: {
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
      altText: "Premium luxury hotel suite overlooking the ocean",
    },
    amenities: [
      { name: "Free Wi-Fi", icon: "wifi" },
      { name: "Ocean View", icon: "waves" },
      { name: "Private Balcony", icon: "sun" },
      { name: "King Size Bed", icon: "bed-double" },
      { name: "Bathtub", icon: "bath" },
      { name: "Mini Bar", icon: "wine" },
      { name: "Room Service", icon: "bell" },
      { name: "Complimentary Breakfast", icon: "coffee" },
    ],
  },
  {
    id: "room_005",
    slug: "standard-single-room",
    title: "Standard Single Room",
    price: 2200,
    description:
      "A budget-friendly and thoughtfully designed room for solo travelers. Enjoy a comfortable single bed, a clean private bathroom, and essential modern amenities.",
    maxGuests: 1,
    bedCount: 1,
    image: {
      url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0",
      altText: "Cozy standard single hotel room",
    },
    amenities: [
      { name: "Free Wi-Fi", icon: "wifi" },
      { name: "Air Conditioning", icon: "snowflake" },
      { name: "Single Bed", icon: "bed-single" },
      { name: "Smart TV", icon: "tv" },
      { name: "Private Bathroom", icon: "bath" },
    ],
  },
];

export const testimonials = [
  {
    id: "testimonial-001",
    name: "Aarav Sharma",
    location: "Mumbai, India",
    content:
      "An absolutely wonderful experience! The rooms were spacious, clean, and beautifully designed. The staff was incredibly welcoming, and the service exceeded our expectations. Would definitely visit again!",
    rating: 5,
    avatarUrl: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "testimonial-002",
    name: "Priya Mehta",
    location: "Delhi, India",
    content:
      "We had a fantastic weekend getaway. The ambiance was peaceful, the food was delicious, and every little detail was taken care of. Highly recommended for couples and families!",
    rating: 5,
    avatarUrl: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: "testimonial-003",
    name: "Rahul Verma",
    location: "Bangalore, India",
    content:
      "Great value for money! The check-in process was smooth, the room was comfortable, and all amenities were exactly as advertised. Looking forward to staying here again.",
    rating: 4,
    avatarUrl: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "testimonial-004",
    name: "Emily Johnson",
    location: "London, United Kingdom",
    content:
      "One of the best hotel experiences I've ever had. The hospitality was outstanding, and the views from our room were breathtaking. Everything felt luxurious and thoughtfully arranged.",
    rating: 5,
    avatarUrl: "https://i.pravatar.cc/150?img=44",
  },
  {
    id: "testimonial-005",
    name: "Ananya Kapoor",
    location: "Jaipur, India",
    content:
      "A beautiful property with excellent hospitality. The interiors were elegant, the rooms were spotless, and the breakfast spread was amazing. A perfect place to relax and unwind.",
    rating: 5,
    avatarUrl: "https://i.pravatar.cc/150?img=45",
  },
  {
    id: "testimonial-006",
    name: "Daniel Smith",
    location: "New York, USA",
    content:
      "I stayed here during a business trip and was genuinely impressed. Fast Wi-Fi, comfortable beds, excellent room service, and a very professional team. Definitely worth recommending.",
    rating: 4,
    avatarUrl: "https://i.pravatar.cc/150?img=13",
  },
];
