import { useEffect, useState } from "react";
import api from "../api/api";

function BorrowEquipment() {

    const [borrowers, setBorrowers] = useState([]);
    const [equipments, setEquipments] = useState([]);

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        borrowerId: "",
        equipmentId: "",
        quantity: 1,
        expectedReturnDate: "",
        remarks: ""
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        try {

            const [borrowerRes, equipmentRes] = await Promise.all([
                    api.get("/borrow/list-borrower"),
                    api.get("/equipment/list-equipment")
                ]);
            
            setBorrowers(
                borrowerRes.data.data
            );
 

            setEquipments(
                equipmentRes.data.data
            );
            console.log(borrowers);


        } catch (error) {

            setError(
                error?.response?.data?.message ||
                error.message
            );

        } finally {

            setPageLoading(false);

        }

    };

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

            const response =
                await api.post(
                    "/borrow/create",
                    formData
                );

            setSuccess(
                response.data.message
            );

            setFormData({
                borrowerId: "",
                equipmentId: "",
                quantity: 1,
                expectedReturnDate: "",
                remarks: ""
            });

        } catch (error) {

            setError(
                error?.response?.data?.message ||
                error.message ||
                "Failed to borrow equipment"
            );

        } finally {

            setLoading(false);

        }

    };

    if (pageLoading) {

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
                                Borrow Equipment
                            </h4>

                            <small className="text-muted">
                                Assign equipment to a borrower
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

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Borrower
                                    </label>

                                    <select
                                        className="form-select"
                                        name="borrowerId"
                                        value={formData.borrowerId}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">
                                            Select Borrower
                                        </option>

                                        {borrowers.map(
                                            borrower => (

                                                <option
                                                    key={borrower._id}
                                                    value={borrower._id}
                                                >
                                                    {borrower.name}
                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Equipment
                                    </label>

                                    <select
                                        className="form-select"
                                        name="equipmentId"
                                        value={formData.equipmentId}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">
                                            Select Equipment
                                        </option>

                                        {equipments.map(
                                            equipment => (

                                                <option
                                                    key={equipment._id}
                                                    value={equipment._id}
                                                >
                                                    {equipment.name}
                                                    {" "}
                                                    (
                                                    Available:
                                                    {" "}
                                                    {equipment.availableQuantity}
                                                    )
                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label fw-semibold">
                                            Quantity
                                        </label>

                                        <input
                                            type="number"
                                            min="1"
                                            className="form-control"
                                            name="quantity"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label fw-semibold">
                                            Expected Return Date
                                        </label>

                                        <input
                                            type="date"
                                            className="form-control"
                                            name="expectedReturnDate"
                                            value={
                                                formData.expectedReturnDate
                                            }
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                </div>

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Remarks
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        name="remarks"
                                        value={formData.remarks}
                                        onChange={handleChange}
                                        placeholder="Optional remarks"
                                    ></textarea>

                                </div>

                                <div className="text-end">

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >

                                        {loading
                                            ? "Processing..."
                                            : "Borrow Equipment"}

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

export default BorrowEquipment;