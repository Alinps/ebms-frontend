import { useEffect, useState } from "react";
import api from "../api/api";

function BorrowHistory() {

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {

        try {

            const response = await api.get("/borrow/borrower-records");

            setRecords(response.data);

        } catch (error) {

            setError(error?.response?.data?.message || error.message);

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

    return (

        <div className="container-fluid py-4">
            <div className="card border-0 shadow-sm rounded-4">
                <div className="card-header bg-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="mb-0">Borrow History</h4>
                            <small className="text-muted">View all equipment borrowing records</small>
                        </div>
                        <span className="badge bg-primary fs-6">{records.length} Records</span>
                    </div>
                </div>

                <div className="card-body">
                    {error && (
                        <div className="alert alert-danger">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
                        </div>
                    )}

                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Borrower</th>
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
                                    (record, index) => (

                                        <tr key={record._id}>
                                            <td>
                                                {index + 1}
                                            </td>

                                            <td>

                                                {record.borrower ? (
                                                    <>
                                                        <div className="fw-semibold">{record.borrower.name}</div>
                                                        <small className="text-muted">{record.borrower.department}</small>
                                                    </>

                                                ) : (

                                                    <span className="text-danger">Deleted Borrower</span>
                                                )}

                                            </td>

                                            <td>

                                                {record.equipment ? (

                                                    <>
                                                        <div className="fw-semibold">{record.equipment.name}</div>
                                                        <small className="text-muted">
                                                            {record.equipment.catogory}
                                                        </small>
                                                    </>

                                                ) : (

                                                    <span className="text-danger">
                                                        Deleted Equipment
                                                    </span>

                                                )}

                                            </td>

                                            <td>{record.quantity}</td>

                                            <td>{ new Date(record.borrowedAt).toLocaleDateString()}</td>

                                            <td>{new Date(record.expectedReturnDate).toLocaleDateString()}</td>

                                            <td>
                                                <span
                                                    className={`badge ${
                                                        record.status ===
                                                        "BORROWED"
                                                            ? "bg-warning text-dark"
                                                            : "bg-success"
                                                    }`}
                                                >{record.status}
                                                </span>
                                            </td>

                                            <td>{record.remarks || "-"}</td>
                                        </tr>))}
                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default BorrowHistory;