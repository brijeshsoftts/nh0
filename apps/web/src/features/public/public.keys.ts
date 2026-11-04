import type { AvailableRoomsParams, InquiriesParams } from "./public.types";

export const publicKeys = {
  all: ["public"] as const,
  inquiryLists: () => [...publicKeys.all, "inquiries"] as const,
  inquiries: (params: InquiriesParams) =>
    [...publicKeys.inquiryLists(), params] as const,
  availableRooms: (params: AvailableRoomsParams) =>
    [...publicKeys.all, "available-rooms", params] as const,
  availableRoom: (slug: string, checkInDate?: string, checkOutDate?: string) =>
    [
      ...publicKeys.all,
      "available-room",
      slug,
      checkInDate ?? "",
      checkOutDate ?? "",
    ] as const,
  contactMessage: ["public", "contact-message"] as const,
} as const;

export const publicMutationKeys = {
  deleteInquiry: [...publicKeys.all, "delete-inquiry"] as const,
} as const;
