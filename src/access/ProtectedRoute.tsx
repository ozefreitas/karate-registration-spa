import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./GlobalAuthProvider";

export default function ProtectedRoute({
  element,
  allowedRoles,
  allowUnauthenticated,
}: Readonly<{
  element: JSX.Element;
  allowedRoles: string[];
  allowUnauthenticated?: boolean;
}>) {
  const { user, isAuthLoading } = useAuth();

  if (!isAuthLoading) {
    if (user?.data.role === "superuser") {
      return element;
    }

    if (!user?.data.role && allowUnauthenticated) {
      return element;
    }

    if (!user?.data.role) {
      return <Navigate to="/login/" />;
    }

    if (!allowedRoles.includes(user?.data.role)) {
      return <Navigate to="/unauthorized/" />;
    }

    return element;
  }
}
