import { createBrowserRouter, Navigate } from "react-router-dom";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PublicLayout } from "@/components/layout/PublicLayout";
import ResetPasswordPage from "@/pages/auth/ResetPassword";
import AuditLogsPage from "@/pages/protect/AuditLogs";
import BookingsPage from "@/pages/protect/Bookings";
import CustomersPage from "@/pages/protect/Customers";
import DashboardPage from "@/pages/protect/Dashboard";
import InvoicesPage from "@/pages/protect/Invoices";
import IssuesPage from "@/pages/protect/Issues";
import NewBookingPage from "@/pages/protect/NewBooking";
import PaymentsPage from "@/pages/protect/Payments";
import ProfilePage from "@/pages/protect/Profile";
import PRoomsPage from "@/pages/protect/Rooms";
import StaffPage from "@/pages/protect/Staff";
import TasksPage from "@/pages/protect/Tasks";
import UsersPage from "@/pages/protect/Users";
import AboutPage from "@/pages/public/About";
import BookingCheckout from "@/pages/public/BookingCheckout";
import ContactPage from "@/pages/public/Contact";
import LandingPage from "@/pages/public/Landing";
import RoomDetails from "@/pages/public/RoomDetails";
import RoomsPage from "@/pages/public/Rooms";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "rooms", element: <RoomsPage /> },
      { path: "rooms/:slug", element: <RoomDetails /> },
      { path: "rooms/:slug/book", element: <BookingCheckout /> },
      { path: "checkout", element: <BookingCheckout /> },
      {
        path: "/login",
        element: <Navigate to="/" replace state={{ openAuth: true }} />,
      },
    ],
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    element: <DashboardLayout />,
    path: "dashboard",
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "staff", element: <StaffPage /> },
      { path: "customers", element: <CustomersPage /> },
      { path: "rooms", element: <PRoomsPage /> },
      { path: "bookings", element: <BookingsPage /> },
      { path: "bookings/new", element: <NewBookingPage /> },
      { path: "issues", element: <IssuesPage /> },
      { path: "tasks", element: <TasksPage /> },
      { path: "invoices", element: <InvoicesPage /> },
      { path: "payments", element: <PaymentsPage /> },
      { path: "audit-logs", element: <AuditLogsPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);
