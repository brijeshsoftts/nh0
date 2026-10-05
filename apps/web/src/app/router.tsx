import { createBrowserRouter } from "react-router-dom";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PublicLayout } from "@/components/layout/PublicLayout";
import AuditLogsPage from "@/pages/protect/AuditLogs";
import BookingsPage from "@/pages/protect/Bookings";
import CustomersPage from "@/pages/protect/Customers";
import DashboardPage from "@/pages/protect/Dashboard";
import IssuesPage from "@/pages/protect/Issues";
import NewBookingPage from "@/pages/protect/NewBooking";
import PaymentsPage from "@/pages/protect/Payments";
import ProfilePage from "@/pages/protect/Profile";
import PRoomsPage from "@/pages/protect/Rooms";
import StaffPage from "@/pages/protect/Staff";
import TasksPage from "@/pages/protect/Tasks";
import AboutPage from "@/pages/public/About";
import ContactPage from "@/pages/public/Contact";
import LandingPage from "@/pages/public/Landing";
import RoomsPage from "@/pages/public/Rooms";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "rooms", element: <RoomsPage /> },
    ],
  },
  {
    element: <DashboardLayout />,
    path: "dashboard",
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "staff", element: <StaffPage /> },
      { path: "customers", element: <CustomersPage /> },
      { path: "rooms", element: <PRoomsPage /> },
      { path: "bookings", element: <BookingsPage /> },
      { path: "bookings/new", element: <NewBookingPage /> },
      { path: "issues", element: <IssuesPage /> },
      { path: "tasks", element: <TasksPage /> },
      { path: "payments", element: <PaymentsPage /> },
      { path: "audit-logs", element: <AuditLogsPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);
