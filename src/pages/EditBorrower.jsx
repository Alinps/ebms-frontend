import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function EditBorrower() {

    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        department: ""
    });

    useEffect(() => {
        fetchBorrower();
    }, []);

    const fetchBorrower = async () => {

        try {

            setLoading(true);

            const response = await api.get(`/admin/borrower/${id}`);

            const borrower = response.data.data;

            setFormData({
                name:
                    borrower.name || "",
                email:
                    borrower.email || "",
                phoneNumber:
                    borrower.phoneNumber || "",
                department:
                    borrower.department || ""
            });

        } catch (error) {

            setError(
                error?.response?.data?.message ||
                error.message
            );

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);
            setError("");
            setSuccess("");

            const response =
                await api.put(
                    `/admin/edit-borrower/${id}`,
                    formData
                );

            setSuccess(
                "Borrower updated successfully"
            );

        } catch (error) {

            setError(
                error?.response?.data?.message ||
                error.message ||
                "Failed to update borrower"
            );

        } finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (
            <div className="text-center mt-5">
                <div className="spinner-border"></div>
            </div>
        );

    }

    return (

        <div className="container-fluid py-4">

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-header bg-white">

                            <h4 className="mb-0">
                                Edit Borrower
                            </h4>

                            <small className="text-muted">
                                Update borrower details
                            </small>

                        </div>

                        <div className="card-body">

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

                            <form
                                onSubmit={handleSubmit}
                            >

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label fw-semibold">
                                            Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label fw-semibold">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
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

                                            <option value="CSE">
                                                Computer Science
                                            </option>

                                            <option value="ECE">
                                                Electronics
                                            </option>

                                            <option value="EEE">
                                                Electrical
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

                                <div className="text-end">

                                    <button
                                        className="btn btn-primary"
                                        disabled={saving}
                                    >

                                        {saving
                                            ? "Updating..."
                                            : "Update Borrower"}

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

export default EditBorrower;