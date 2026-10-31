import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

import { FullScreenLoader } from "../common/Loader";

export const AuthLayout = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <FullScreenLoader />;

  if (isAuthenticated) return <Navigate to={"/dashboard"} />;

  return <Outlet />;
};
