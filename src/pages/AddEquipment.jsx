import { useState } from "react";
import api from "../api/api";

function AddEquipment() {

    const [formData, setFormData] = useState({
        name: "",
        catogory: "",
        serialNumber: "",
        availableQuantity: "",
        totalQuantity:"",
        status: "Available"
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
        console.log("data",formData)

        const response = await api.post(
            "/equipment/create",
            formData
        );

        setSuccess("Equipment added successfully");

        setFormData({
            name: "",
            catogory: "",
            serialNumber: "",
            availableQuantity: "",
            totalQuantity:"",
            status: "Available"
        });

    } catch (error) {

        console.error(error);

        const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong";

        setError(errorMessage);

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
                                Add Equipment
                            </h4>

                            <small className="text-muted">
                                Create a new equipment record
                            </small>

                        </div>

                        <div className="card-body p-4">
                            <div className="card-body p-4">

                                    {error && (
                                        <div
                                            className="alert alert-danger alert-dismissible fade show"
                                            role="alert"
                                        >
                                            <i className="bi bi-exclamation-triangle-fill me-2"></i>

                                            {error}

                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={() => setError("")}
                                            ></button>
                                        </div>
                                    )}

                                    {success && (
                                        <div
                                            className="alert alert-success alert-dismissible fade show"
                                            role="alert"
                                        >
                                            <i className="bi bi-check-circle-fill me-2"></i>

                                            {success}

                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={() => setSuccess("")}
                                            ></button>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit}>
                                        {/* Your Form */}
                                    </form>

                                </div>

                            <form onSubmit={handleSubmit}>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label fw-semibold">
                                            Equipment Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter equipment name"
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label fw-semibold">
                                            Category
                                        </label>

                                        <select
                                            className="form-select"
                                            name="catogory"
                                            value={formData.catogory}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">
                                                Select Category
                                            </option>

                                            <option value="Laptop">
                                                Laptop
                                            </option>

                                            <option value="Desktop">
                                                Desktop
                                            </option>

                                            <option value="Projector">
                                                Projector
                                            </option>

                                            <option value="Printer">
                                                Printer
                                            </option>

                                            <option value="Network Device">
                                                Network Device
                                            </option>

                                        </select>

                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label fw-semibold">
                                            Serial Number
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="serialNumber"
                                            value={formData.serialNumber}
                                            onChange={handleChange}
                                            placeholder="SN001"
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label fw-semibold">
                                            Available Quantity
                                        </label>

                                        <input
                                            type="number"
                                            className="form-control"
                                            name="availableQuantity"
                                            value={formData.availableQuantity}
                                            onChange={handleChange}
                                            placeholder="100"
                                            min="0"
                                            required
                                        />

                                         <label className="form-label fw-semibold">
                                            Total Quantity
                                        </label>

                                        <input
                                            type="number"
                                            className="form-control"
                                            name="totalQuantity"
                                            value={formData.totalQuantity}
                                            onChange={handleChange}
                                            placeholder="100"
                                            min="0"
                                            required
                                        />

                                    </div>

                                </div>

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Status
                                    </label>

                                    <select
                                        className="form-select"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="Available">
                                            Available
                                        </option>

                                        <option value="Unavailable">
                                            Unavailable
                                        </option>
                                    </select>

                                </div>

                                <div className="d-flex justify-content-end gap-2">

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
                                            : "Add Equipment"}
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

export default AddEquipment;