import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ children }) => {
  const {  token } = useSelector((state: RootState) => state.auth);
  // redux-persist injects _persist on root reducer; use any to avoid typing complexity here
  const rehydrated = useSelector((state: any) => state._persist?.rehydrated);

  // Wait for rehydration to finish to avoid false negative redirects on slow devices
  if (!rehydrated) {
    return null;
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
