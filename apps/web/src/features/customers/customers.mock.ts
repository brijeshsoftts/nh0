import { RefreshCw, UserCheck, UserPlus, Users } from "lucide-react";

import type { KpiItem } from "@/types/shared.types";

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

export const dummyCustomerList: SearchCustomer[] = [
  {
    id: "customer-001",
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
  },
  {
    id: "customer-002",
    fullName: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+91 98765 43211",
  },
  {
    id: "customer-003",
    fullName: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+91 98765 43212",
  },
  {
    id: "customer-004",
    fullName: "Emily Johnson",
    email: "emily.johnson@example.com",
    phone: "+91 98765 43213",
  },
  {
    id: "customer-005",
    fullName: "David Miller",
    email: "david.miller@example.com",
    phone: "+91 98765 43214",
  },
  {
    id: "customer-006",
    fullName: "Olivia Davis",
    email: "olivia.davis@example.com",
    phone: "+91 98765 43215",
  },
  {
    id: "customer-007",
    fullName: "James Anderson",
    email: "james.anderson@example.com",
    phone: "+91 98765 43216",
  },
  {
    id: "customer-008",
    fullName: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    phone: "+91 98765 43217",
  },
  {
    id: "customer-009",
    fullName: "Daniel Taylor",
    email: "daniel.taylor@example.com",
    phone: "+91 98765 43218",
  },
  {
    id: "customer-010",
    fullName: "Emma Thomas",
    email: "emma.thomas@example.com",
    phone: "+91 98765 43219",
  },
];
