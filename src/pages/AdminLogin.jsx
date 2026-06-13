import { useState } from "react";
import { useNavigate } from "react-router-dom";
import publicApi  from "../api/api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";

function AdminLogin() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);
            setError("");

            const response = await publicApi.post("/admin/login", formData);

            if (response.data.success) {


                dispatch(
                    loginSuccess({
                        token: response.data.token,
                        user: response.data.user,
                    })
                );
                console.log(response.data);
                navigate("/admin/dashboard");
            }

        } catch (err) {
            console.log(err)

            setError(
                err.response?.data?.message || err.message ||
                "Login Failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div
                className="row justify-content-center align-items-center"
                style={{ minHeight: "100vh" }}
            >
                <div className="col-md-5">

                    <div className="card shadow-lg">
                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                Admin Login
                            </h2>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Logging In..."
                                        : "Login"}
                                </button>

                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AdminLogin;