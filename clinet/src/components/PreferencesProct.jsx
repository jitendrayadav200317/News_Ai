import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PreferencesProct() {
  const preference = useSelector((state) => state.auth?.preference || []);
  if (preference.length > 0) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}
export default PreferencesProct;
