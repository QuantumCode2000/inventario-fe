import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext/AuthContext";

const PublicRoute = () => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PublicRoute;
