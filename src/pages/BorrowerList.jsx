import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function BorrowerList() {

    const [borrowers, setBorrowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBorrowers();
    }, []);

    const fetchBorrowers = async () => {

        try {

            const response = await api.get("/admin/list-borrower");

            setBorrowers(response.data.data);

        } catch (error) {

            console.error(error);

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
        <div className="container-fluid">

            <div className="card shadow-sm border-0">

              <div className="card-header bg-white border-bottom py-3">

    <div className="d-flex justify-content-between align-items-center">

        <div>
            <h4 className="mb-0 fw-semibold">
                Borrowers
            </h4>

            <small className="text-muted">
                Manage all registered borrowers
            </small>
        </div>

        <div className="d-flex align-items-center gap-3">

            <span className="badge rounded-pill bg-primary px-3 py-2">
                {borrowers.length} Borrowers
            </span>

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
                placeholder="Search borrower..."
            />

        </div>

    </div>

</div>

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

        {borrowers.map((borrower, index) => (

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

                    <button
                        className="btn btn-outline-warning btn-sm me-2"
                        title="Edit"
                    >
                        <i className="bi bi-pencil-square"></i>
                    </button>

                    <button
                        className="btn btn-outline-danger btn-sm"
                        title="Delete"
                    >
                        <i className="bi bi-trash"></i>
                    </button>

                </td>

            </tr>

        ))}

    </tbody>

</table>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default BorrowerList;