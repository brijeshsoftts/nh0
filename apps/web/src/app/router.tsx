import { createBrowserRouter } from "react-router-dom";

import { PublicLayout } from "@/components/layout/PublicLayout";

import LandingPage from "@/pages/public/Landing";
import AboutPage from "@/pages/public/About";
import ContactPage from "@/pages/public/Contact";
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
]);
