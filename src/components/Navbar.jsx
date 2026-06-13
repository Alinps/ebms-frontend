import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

function Navbar() {

    const auth = useSelector(store => store.auth);
    const user = auth.user;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm">

            <div className="container-fluid px-4">

                <div>
                    <h5 className="mb-0 fw-bold">
                        Equipment Borrowing Management System
                    </h5>

                    <small className="text-muted">
                        Admin Dashboard
                    </small>
                </div>

                <div className="d-flex align-items-center">

                    <div className="text-end me-3">

                        <div className="fw-semibold">
                            {user?.name || "Administrator"}
                        </div>

                        <small className="text-muted">
                            {user?.email || "Admin User"}
                        </small>

                    </div>

                    <div
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                        style={{
                            width: "42px",
                            height: "42px"
                        }}
                    >
                        <i className="bi bi-person-fill"></i>
                    </div>

                    <button
                        className="btn btn-outline-danger"
                        onClick={handleLogout}
                    >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;