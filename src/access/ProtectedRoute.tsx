import { JSX } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  element,
  allowedRoles,
  userRole,
  allowUnauthenticated,
}: Readonly<{
  element: JSX.Element;
  allowedRoles: string[];
  userRole: string | undefined;
  allowUnauthenticated?: boolean;
}>) {
  if (userRole === "superuser") {
    return element;
  }

  if (!userRole && allowUnauthenticated) {
    return element
  }

  if (!userRole) {
    return <Navigate to="/login/" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized/" />;
  }

  return element;
}
