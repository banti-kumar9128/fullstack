import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("userData");

  if (!user) {
    // ❌ Not logged in
    return <Navigate to="/signin" replace />;
  }

  // ✅ Logged in
  return children;
};

export default ProtectedRoute;
