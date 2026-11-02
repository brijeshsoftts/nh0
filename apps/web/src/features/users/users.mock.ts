import { DEMO_STAFF } from "../shared/demo-hotel-data";

import type { User } from "./users.types";

export const MOCK_USER: User = {
  id: DEMO_STAFF.admin.id,
  fullName: DEMO_STAFF.admin.fullName,
  email: DEMO_STAFF.admin.email,
  phone: DEMO_STAFF.admin.phone,
  role: "ADMIN",
  isActive: true,
  avatar: null,
};
