import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import DeleteBorrowerModal from "../components/DeleteBorrowerModal";
import { Link } from "react-router-dom";

function BorrowerList() {

    const [borrowers, setBorrowers] = useState([]);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBorrower, setSelectedBorrower] = useState(null);

    const [success, setSuccess] = useState("");

    const [debounceSearch, setDebounceSearch] = useState('');
    const [search, setSearch] = useState('');

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // fetching the data based on the debounce search state
    useEffect(() => {

        fetchBorrowers();

    }, [debounceSearch]);

    // function for updating the search state to collect date from the search input
    const handleSearch = (e) => {

        setSearch(e.target.value);
        setPage(1);

    }

    // for applying a delay of 500 ms for every search input key strok to avoid multiple api calling
    useEffect(() => {

        const timer = setTimeout(() => {

            setDebounceSearch(search);

        }, 500);

        return () => clearTimeout(timer);
    }, [search]);


    // function for fetching the api date
    const fetchBorrowers = async () => {

        try {

            const response = await api.get(`/admin/list-borrower?search=${debounceSearch}&page=${page}&limit=10`);

            setBorrowers(response.data.data);
            setTotalPages(response.data.totalPages);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    const handleDeleteClick = (borrower) => {

        setSelectedBorrower(borrower);
        setShowDeleteModal(true);

    };

    if (loading) {

        return (
            <div className="text-center mt-5">
                <div className="spinner-border"></div>
            </div>
        );
    }

    return (

        <div className="container-fluid">

            <div className="card shadow-sm border-0">

              <div className="card-header bg-white border-bottom py-3">
                <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="mb-0 fw-semibold"> Borrowers</h4>
                            <small className="text-muted"> Manage all registered borrowers</small>
                        </div>
                            <div className="d-flex align-items-center gap-3">
                                <span className="badge rounded-pill bg-primary px-3 py-2">{borrowers.length} Borrowers </span>
                                    <button className="btn btn-primary" onClick={()=> navigate("/admin/add-borrower")}>
                                        <i className="bi bi-plus-lg me-2"></i>
                                        Add Borrower
                                    </button>
                            </div>
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
                        {
                            success && (

                                <div className="alert alert-success">
                                    <i className="bi bi-check-circle-fill me-2"></i>
                                    {success}
                                </div>

                            )
                        }


                    {/* table ui */}
                    <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Borrower</th>
                                    <th>Contact</th>
                                    <th>Department</th>
                                    <th>Created</th>
                                    <th className="text-center">
                                        Actions
                                    </th>
                                </tr>
                        </thead>
                            <tbody>
                                {borrowers.length === 0 ? (

                                <tr>
                                    <td
                                        colSpan="8"
                                        className="text-center text-muted py-4"
                                    >
                                        No active borrowers found
                                    </td>
                                </tr>

                            ) : borrowers.map((borrower, index) => (
                                    <tr key={borrower._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div>
                                                <div className="fw-semibold">
                                                    {borrower.name}
                                                </div>
                                                <small className="text-muted">
                                                    {borrower.email}
                                                </small>
                                            </div>
                                        </td>

                                        <td>{borrower.phoneNumber}</td>

                                        <td>
                                            <span className="badge rounded-pill bg-info-subtle text-dark">
                                                {borrower.department}
                                            </span>
                                        </td>

                                        <td>
                                            {new Date(
                                                borrower.createdAt
                                            ).toLocaleDateString()}
                                        </td>

                                        <td className="text-center">

                                            <div className="d-flex justify-content-center gap-2">

                                                 <Link
                                                to={`/admin/borrower/history/${borrower._id}`}
                                                className="btn btn-outline-info btn-sm me-2"
                                            >
                                                <i className="bi bi-clock-history"></i>
                                             </Link>
                                            <button
                                                className="btn btn-outline-warning btn-sm me-2"
                                                title="Edit"
                                                onClick={()=> navigate(`/admin/edit-borrower/${borrower._id}`)}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>

                                            <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() =>
                                                        handleDeleteClick(borrower)
                                                    }
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>

                                            </div>

                                           
                                        </td>

                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


                {/* Pagination ui */}
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

            {/* delete modal component */}
            <DeleteBorrowerModal 
                show={showDeleteModal}
                borrowerId={ selectedBorrower?._id }
                borrowerName={ selectedBorrower?.name }
                onClose={() => setShowDeleteModal(false) }
                onDeleteSuccess={(message) => {
                    setSuccess(message);
                    fetchBorrowers();
                }}/>

        </div>
    );
}

export default BorrowerList;