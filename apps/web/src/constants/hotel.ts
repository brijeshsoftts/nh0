const configured = (value: string | undefined) => value?.trim() || undefined;

export const HOTEL_DETAILS = {
  name: configured(import.meta.env.VITE_HOTEL_NAME) ?? "Nivara",
  location:
    configured(import.meta.env.VITE_HOTEL_LOCATION) ??
    "Lucknow, Uttar Pradesh, India",
  address: configured(import.meta.env.VITE_HOTEL_ADDRESS),
  phone: configured(import.meta.env.VITE_HOTEL_PHONE),
  email: configured(import.meta.env.VITE_HOTEL_EMAIL),
  hours: configured(import.meta.env.VITE_HOTEL_HOURS),
};
