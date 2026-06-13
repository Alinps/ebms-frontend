import { useState } from "react";
import api from "../api/api";

function AddBorrower() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        department: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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
            setSuccess("");

            const response = await api.post(
                "/admin/create-borrower",
                formData
            );

            setSuccess(
                response.data.message
            );

            setFormData({
                name: "",
                email: "",
                phoneNumber: "",
                department: ""
            });

        } catch (error) {

            console.log(error);

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to create borrower";

            setError(message);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container-fluid py-4">

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-header bg-white border-bottom py-3">

                            <h4 className="mb-0 fw-semibold">
                                Add Borrower
                            </h4>

                            <small className="text-muted">
                                Register a new borrower
                            </small>

                        </div>

                        <div className="card-body p-4">

                            {error && (
                                <div className="alert alert-danger">
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success">
                                    <i className="bi bi-check-circle-fill me-2"></i>
                                    {success}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label fw-semibold">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter borrower name"
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label fw-semibold">
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="example@gmail.com"
                                            required
                                        />

                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label fw-semibold">
                                            Phone Number
                                        </label>

                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="9876543210"
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label fw-semibold">
                                            Department
                                        </label>

                                        <select
                                            className="form-select"
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">
                                                Select Department
                                            </option>

                                            <option value="CSE">
                                                Computer Science
                                            </option>

                                            <option value="ECE">
                                                Electronics & Communication
                                            </option>

                                            <option value="EEE">
                                                Electrical & Electronics
                                            </option>

                                            <option value="ME">
                                                Mechanical
                                            </option>

                                            <option value="CE">
                                                Civil
                                            </option>

                                        </select>

                                    </div>

                                </div>

                                <div className="d-flex justify-content-end gap-2 mt-3">

                                    <button
                                        type="reset"
                                        className="btn btn-outline-secondary"
                                    >
                                        Clear
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Saving..."
                                            : "Add Borrower"}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default AddBorrower;