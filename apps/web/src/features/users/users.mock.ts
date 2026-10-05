import type { User } from "./users.types";

export const MOCK_USER: User = {
  id: "u1",
  fullName: "John Doe",
  email: "john@example.com",
  phone: "123-456-7890",
  role: "ADMIN",
  category: "HOUSEKEEPER",
  avatar: {
    id: "u1p",
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    altText: "John Doe",
  },
};
