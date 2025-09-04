import Login from "@/components/Login";
import Home from "@/pages/Home";
import UserDashboard from "@/pages/UserDashboard";
import Signup from "@/pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const AuthRoute = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);

  const DashboardComponent = () => {
    if ((user as any)?.role === "admin") {
      return <Home />;
    } else {
      return <UserDashboard />;
    }
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          token ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />
      <Route path="/register" element={<Signup />} />
      
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardComponent />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AuthRoute;