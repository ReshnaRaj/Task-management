 
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";  

const ProtectedRoute = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  if (!user || !token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;
