import { useEffect, useState } from "react";
import api from "../api/api";

function ActiveBorrowings() {

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchActiveBorrowings();
    }, []);

    const fetchActiveBorrowings = async () => {

        try {

            const response = await api.get(
                "/borrow/borrow-records/active"
            );

            setRecords(
                response.data.data
            );

        } catch (error) {

            setError(
                error?.response?.data?.message ||
                error.message
            );

        } finally {

            setLoading(false);

        }

    };

    const isOverdue = (date) => {

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const returnDate = new Date(date);

        returnDate.setHours(0, 0, 0, 0);

        return returnDate < today;

    };


    const handleReturnEquipment = async (recordId) => {

    try {

        setError("");
        setSuccess("");

        const response = await api.put(`/borrow/return/${recordId}`);

        setSuccess(
            response.data.message
        );

        fetchActiveBorrowings();

    } catch (error) {

        setError(
            error?.response?.data?.message ||
            error.message
        );

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
                    {success && (<div className="alert alert-success">
                        <i className="bi bi-check-circle-fill me-2"></i>{success}</div>
                        )}

                    <div className="d-flex justify-content-between align-items-center">


                        <div>

                            <h4 className="mb-0">
                                Active Borrowings
                            </h4>

                            <small className="text-muted">
                                Equipment currently borrowed
                            </small>

                        </div>

                        <span className="badge bg-warning text-dark fs-6">
                            {records.length} Active
                        </span>

                    </div>

                </div>

                <div className="card-body">

                    {error && (

                        <div className="alert alert-danger">

                            <i className="bi bi-exclamation-triangle-fill me-2"></i>

                            {error}

                        </div>

                    )}
                    <div className="row mb-4">

                            <div className="col-md-4">
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body">
                                        <h6 className="text-muted">
                                            Active Borrowings
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
                                            Overdue
                                        </h6>

                                        <h3 className="text-danger">
                                            {
                                                records.filter(
                                                    r => isOverdue(
                                                        r.expectedReturnDate
                                                    )
                                                ).length
                                            }
                                        </h3>
                                    </div>
                                </div>
                            </div>

                        </div>

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
                                    <th>Action</th>
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
                                                        <div className="fw-semibold">
                                                            {record.borrower.name}
                                                        </div>

                                                        <small className="text-muted">
                                                            {record.borrower.department}
                                                        </small>
                                                    </>

                                                ) : (

                                                    <span className="text-danger">
                                                        Deleted Borrower
                                                    </span>

                                                )}

                                            </td>

                                            <td>

                                                {record.equipment ? (

                                                    <>
                                                        <div className="fw-semibold">
                                                            {record.equipment.name}
                                                        </div>

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

                                            <td>
                                                {record.quantity}
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

                                                {isOverdue(
                                                    record.expectedReturnDate
                                                ) ? (

                                                    <span className="badge bg-danger">
                                                        Overdue
                                                    </span>

                                                ) : (

                                                    <span className="badge bg-success">
                                                        Active
                                                    </span>

                                                )}

                                            </td>

                                            <td>
                                                {
                                                    record.remarks || "-"
                                                }
                                            </td>

                                            <td>
                                                    <button
                                                        className="btn btn-outline-success btn-sm"
                                                        onClick={() => {

                                                            const confirmed = window.confirm(
                                                                `Return ${record.equipment?.name}?`
                                                            );

                                                            if (confirmed) {

                                                                handleReturnEquipment(
                                                                    record._id
                                                                );

                                                            }

                                                        }}
                                                    >
                                                        <i className="bi bi-arrow-return-left me-1"></i>
                                                        Return
                                                    </button>

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

export default ActiveBorrowings;