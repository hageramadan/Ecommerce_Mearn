import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("authToken");
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />; 
};

export default ProtectedRoute;