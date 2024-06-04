import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "../hooks/useAuthStatus";
export default function PrivateRoute() {
  const {loggedIn,checking}=useAuthStatus();
  if(checking)
    return <h1>Loading....</h1>
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}