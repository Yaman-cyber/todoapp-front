import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import auth from "../../services/authService";

const PrivateRoute = ({ role }) => {
  const token = auth.getJwt();

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page

  if (role) return role === "admin" ? <Outlet /> : <Navigate to="/todo" />;
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
