import { useEffect, useState } from "react";
import api from "../api/api";

function BorrowHistory() {

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState('');
    const [debounceSearch, setDebounceSearch] = useState('');

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {

        fetchHistory();

    }, [debounceSearch]);

    useEffect(() => {
        
        const timer = setTimeout(() => {

            setDebounceSearch(search)

        }, 500)

        return () => {
            clearTimeout(timer);
        }
    }, [search])




    const fetchHistory = async () => {

        try {

            const response = await api.get(`/borrow/borrower-records?search=${search}`);

            setRecords(response.data.data);

        } catch (error) {

            setError(error?.response?.data?.message || error.message);

        } finally {

            setLoading(false);

        }

    };


    const handleSearch = (e) => {

        setSearch(e.target.value);
        setPage(1);
    }


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

                     <div className="row mb-3">

                        <div className="col-md-4">

                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={search}
                                    onChange={handleSearch}
                                    placeholder="Search borrower..."
                                />
                            </div>

                        </div>

                    </div>

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
                                    <th>Returned On</th>
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

                                            <td>{record.actualReturnDate?  new Date(record.actualReturnDate).toLocaleDateString(): "not returned"}</td>

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

            <nav>
                    <ul className="pagination justify-content-center mt-5">

                        <li
                            className={`page-item ${
                                page === 1 ? 'disabled' : ''
                            }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => setPage(page - 1)}
                            >
                                Previous
                            </button>
                        </li>

                        {[...Array(totalPages)].map((_, index) => (

                            <li
                                key={index}
                                className={`page-item ${
                                    page === index + 1
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() =>
                                        setPage(index + 1)
                                    }
                                >
                                    {index + 1}
                                </button>
                            </li>

                        ))}

                        <li
                            className={`page-item ${
                                page === totalPages
                                    ? 'disabled'
                                    : ''
                            }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </button>
                        </li>

                    </ul>
                </nav>

        </div>

    );
}

export default BorrowHistory;