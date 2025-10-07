import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ children }) => {
  const {  token } = useSelector((state: RootState) => state.auth);
   const { _persist } = useSelector((state: any) => state);
   if (!_persist || !_persist.rehydrated) {
    // Wait until persistence finishes
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
