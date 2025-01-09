import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext/AuthContext";
import React from "react";

interface PrivateRouteProps {
  requiredRole?: string;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  requiredRole,
  children,
}) => {
  const { isAuthenticated, user } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user?.rol !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
