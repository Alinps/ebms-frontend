import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function BorrowerHistory() {

    const { id } = useParams();

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {

        try {

            const response = await api.get(
                `/borrow/borrower-records/${id}`
            );

            setRecords(response.data.data);

        } catch (error) {

            setError(
                error?.response?.data?.message ||
                error.message
            );

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <div className="text-center mt-5">
                <div className="spinner-border"></div>
            </div>
        );

    }

    const borrower = records[0]?.borrower;

    return (

        <div className="container-fluid py-4">

            {error && (

                <div className="alert alert-danger">

                    <i className="bi bi-exclamation-triangle-fill me-2"></i>

                    {error}

                </div>

            )}

            {/* Borrower Info Card */}

            {borrower && (

                <div className="card border-0 shadow-sm mb-4">

                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-3 text-center">

                                <div
                                    className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        fontSize: "2rem"
                                    }}
                                >
                                    <i className="bi bi-person-fill"></i>
                                </div>

                            </div>

                            <div className="col-md-9">

                                <h4>
                                    {borrower.name}
                                </h4>

                                <p className="mb-1">
                                    <strong>Email:</strong>
                                    {" "}
                                    {borrower.email}
                                </p>

                                <p className="mb-1">
                                    <strong>Phone:</strong>
                                    {" "}
                                    {borrower.phoneNumber}
                                </p>

                                <p className="mb-0">
                                    <strong>Department:</strong>
                                    {" "}
                                    {borrower.department}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            )}

            {/* Statistics */}

            <div className="row mb-4">

                <div className="col-md-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Total Borrowings
                            </h6>

                            <h3>
                                {records.length}
                            </h3>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Active Borrowings
                            </h6>

                            <h3 className="text-warning">

                                {
                                    records.filter(
                                        r =>
                                            r.status ===
                                            "BORROWED"
                                    ).length
                                }

                            </h3>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Returned
                            </h6>

                            <h3 className="text-success">

                                {
                                    records.filter(
                                        r =>
                                            r.status ===
                                            "RETURNED"
                                    ).length
                                }

                            </h3>

                        </div>

                    </div>

                </div>

            </div>

            {/* History Table */}

            <div className="card border-0 shadow-sm">

                <div className="card-header bg-white">

                    <h5 className="mb-0">
                        Borrow History
                    </h5>

                </div>

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle">

                            <thead className="table-light">

                                <tr>

                                    <th>#</th>
                                    <th>Equipment</th>
                                    <th>Quantity</th>
                                    <th>Borrowed On</th>
                                    <th>Expected Return</th>
                                    <th>Status</th>
                                    <th>Remarks</th>

                                </tr>

                            </thead>

                            <tbody>

                                {records.map(
                                    (
                                        record,
                                        index
                                    ) => (

                                        <tr
                                            key={
                                                record._id
                                            }
                                        >

                                            <td>
                                                {index + 1}
                                            </td>

                                            <td>

                                                {record.equipment ? (

                                                    <>
                                                        <div className="fw-semibold">

                                                            {
                                                                record
                                                                    .equipment
                                                                    .name
                                                            }

                                                        </div>

                                                        <small className="text-muted">

                                                            {
                                                                record
                                                                    .equipment
                                                                    .catogory
                                                            }

                                                        </small>
                                                    </>

                                                ) : (

                                                    <span className="text-danger">
                                                        Deleted Equipment
                                                    </span>

                                                )}

                                            </td>

                                            <td>
                                                {
                                                    record.quantity
                                                }
                                            </td>

                                            <td>

                                                {
                                                    new Date(
                                                        record.borrowedAt
                                                    ).toLocaleDateString()
                                                }

                                            </td>

                                            <td>

                                                {
                                                    new Date(
                                                        record.expectedReturnDate
                                                    ).toLocaleDateString()
                                                }

                                            </td>

                                            <td>

                                                <span
                                                    className={`badge ${
                                                        record.status ===
                                                        "RETURNED"
                                                            ? "bg-success"
                                                            : "bg-warning text-dark"
                                                    }`}
                                                >

                                                    {
                                                        record.status
                                                    }

                                                </span>

                                            </td>

                                            <td>

                                                {
                                                    record.remarks ||
                                                    "-"
                                                }

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default BorrowerHistory;