// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
// import type { RootState } from "../redux/store";

// const ProtectedRoute = () => {
//   const { user, token } = useSelector((state: RootState) => state.auth);

//   if (!user || !token) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;
import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ children }) => {
  const {  token } = useSelector((state: RootState) => state.auth);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
