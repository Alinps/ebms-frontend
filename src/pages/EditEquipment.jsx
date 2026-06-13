import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function EditEquipment() {

    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        catogory: "",
        serialNumber: "",
        availableQuantity: "",
        status: ""
    });

    useEffect(() => {
        fetchEquipment();
    }, []);

    const fetchEquipment = async () => {

        try {

            setLoading(true);

            const response = await api.get(
                `/equipment/get-equipment/${id}`
            );

            const equipment =
                response.data.data;

            setFormData({
                name:
                    equipment.name || "",
                catogory:
                    equipment.catogory || "",
                serialNumber:
                    equipment.serialNumber || "",
                availableQuantity:
                    equipment.availableQuantity || "",
                status:
                    equipment.status || ""
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
                    `/equipment/update/${id}`,
                    formData
                );

            setSuccess(
                response.data.message
            );

        } catch (error) {

            setError(
                error?.response?.data?.message ||
                error.message ||
                "Failed to update equipment"
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
                                Edit Equipment
                            </h4>

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

                                        <label className="form-label">
                                            Equipment Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Category
                                        </label>

                                        <select
                                            className="form-select"
                                            name="catogory"
                                            value={formData.catogory}
                                            onChange={handleChange}
                                        >

                                            <option value="Laptop">
                                                Laptop
                                            </option>

                                            <option value="Desktop">
                                                Desktop
                                            </option>

                                            <option value="Printer">
                                                Printer
                                            </option>

                                            <option value="Projector">
                                                Projector
                                            </option>

                                        </select>

                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Serial Number
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="serialNumber"
                                            value={formData.serialNumber}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Available Quantity
                                        </label>

                                        <input
                                            type="number"
                                            className="form-control"
                                            name="availableQuantity"
                                            value={formData.availableQuantity}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">
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

                                <div className="text-end">

                                    <button
                                        className="btn btn-primary"
                                        disabled={saving}
                                    >

                                        {saving
                                            ? "Updating..."
                                            : "Update Equipment"}

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

export default EditEquipment;