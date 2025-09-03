import Login from "@/components/Login";
import Home from "@/pages/Home";
import Signup from "@/pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const AuthRoute = () => {
  const token = useSelector((state: RootState) => state.auth.token);

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
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AuthRoute;