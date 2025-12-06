import React from "react";
import { getCookies } from "../utils/util.js";
import { Navigate, Outlet } from "react-router";

function ProtectedRoutes() {
  const isAuthenticated = getCookies("isAuthenticated");
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
export default ProtectedRoutes;
