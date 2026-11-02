import { RefreshCw, UserCheck, UserPlus, Users } from "lucide-react";

import type { KpiItem } from "@/types/shared.types";

import { DEMO_CUSTOMERS } from "../shared/demo-hotel-data";

import type { SearchCustomer } from "./customers.types";

export const customerKpiData: KpiItem[] = [
  {
    id: 1,
    iconKey: Users,
    title: "Total Customers",
    value: "2,486",
    details: "+12.5% this month",
  },
  {
    id: 2,
    iconKey: UserCheck,
    title: "Active Customers",
    value: "1,842",
    details: "74% of total customers",
  },
  {
    id: 3,
    iconKey: UserPlus,
    title: "New This Month",
    value: "186",
    details: "+18 from last month",
  },
  {
    id: 4,
    iconKey: RefreshCw,
    title: "Returning Guests",
    value: "68%",
    details: "+6.2% booking retention",
  },
];

export const dummyCustomerList: SearchCustomer[] = Object.values(
  DEMO_CUSTOMERS
).map(({ id, fullName, email, phone }) => ({
  id,
  fullName,
  email,
  phone,
}));
