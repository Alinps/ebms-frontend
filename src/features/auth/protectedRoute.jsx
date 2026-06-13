import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute() {

    const token = localStorage.getItem("token");

    return token
        ? <Outlet />
        : <Navigate to="/" replace />;
}

export default ProtectedRoute;