import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(role)) {
    if (role === "admin") {
      return <Navigate to="/admin" />;
    } else if (role === "doctor") {
      return <Navigate to="/deshboard" />;
    } else if (role === "patient") {
      return <Navigate to="/home" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
