import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-orange-500 font-semibold">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
