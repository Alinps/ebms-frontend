import { useEffect, useState } from "react";
import api from "../api/api";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            const response = await api.get(
                "/dashboard/stats"
            );

            setDashboard(response.data);

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

    return (

        <div className="container-fluid py-4">

            {error && (

                <div className="alert alert-danger">
                    {error}
                </div>

            )}

            {/* Statistics */}

            <div className="row g-4 mb-4">

                <div className="col-md-3">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Total Equipment
                            </h6>

                            <h2 className="text-primary">
                                {
                                    dashboard.stats
                                        .totalEquipment
                                }
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Borrowers
                            </h6>

                            <h2 className="text-success">
                                {
                                    dashboard.stats
                                        .totalBorrowers
                                }
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Active Borrowings
                            </h6>

                            <h2 className="text-warning">
                                {
                                    dashboard.stats
                                        .activeBorrowings
                                }
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Overdue
                            </h6>

                            <h2 className="text-danger">
                                {
                                    dashboard.stats
                                        .overdueBorrowings
                                }
                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            {/* Available Quantity */}

            <div className="row mb-4">

                <div className="col-md-12">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Available Equipment Quantity
                            </h6>

                            <h2 className="text-info">
                                {
                                    dashboard.stats
                                        .availableQuantity
                                }
                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            {/* Recent Borrowings */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-header bg-white">

                    <h5 className="mb-0">
                        Recent Borrowings
                    </h5>

                </div>

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-hover">

                            <thead>

                                <tr>

                                    <th>Borrower</th>
                                    <th>Equipment</th>
                                    <th>Quantity</th>
                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {dashboard.recentBorrowings.map(
                                    (record) => (

                                        <tr
                                            key={
                                                record._id
                                            }
                                        >

                                            <td>

                                                {
                                                    record
                                                        .borrower
                                                        ?.name ||
                                                    "Deleted"
                                                }

                                            </td>

                                            <td>

                                                {
                                                    record
                                                        .equipment
                                                        ?.name ||
                                                    "Deleted"
                                                }

                                            </td>

                                            <td>
                                                {
                                                    record.quantity
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

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            {/* Low Stock */}

            <div className="card border-0 shadow-sm">

                <div className="card-header bg-white">

                    <h5 className="mb-0">
                        Low Stock Equipment
                    </h5>

                </div>

                <div className="card-body">

                    {dashboard.lowStockEquipment
                        .length === 0 ? (

                        <div className="text-success">

                            <i className="bi bi-check-circle-fill me-2"></i>

                            No low stock equipment

                        </div>

                    ) : (

                        <table className="table">

                            <thead>

                                <tr>

                                    <th>
                                        Equipment
                                    </th>

                                    <th>
                                        Available
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {dashboard.lowStockEquipment.map(
                                    (
                                        equipment
                                    ) => (

                                        <tr
                                            key={
                                                equipment._id
                                            }
                                        >

                                            <td>
                                                {
                                                    equipment.name
                                                }
                                            </td>

                                            <td>

                                                <span className="badge bg-danger">

                                                    {
                                                        equipment.availableQuantity
                                                    }

                                                </span>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    )}

                </div>

            </div>

        </div>

    );
}

export default Dashboard;