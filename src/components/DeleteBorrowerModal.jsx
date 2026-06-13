import { useState } from "react";
import api from "../api/api";

function DeleteBorrowerModal({
    show,
    borrowerId,
    borrowerName,
    onClose,
    onDeleteSuccess
}) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleDelete = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.delete(`/admin/delete/borrower/${borrowerId}`);

            onDeleteSuccess( response.data.message );

            onClose();

        } catch (error) {

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to delete borrower";

            setError(message);

        } finally {

            setLoading(false);

        }

    };

    if (!show) return null;

    return (

        <div
            className="modal d-block"
            style={{
                backgroundColor:
                    "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog modal-dialog-centered">

                <div className="modal-content border-0 shadow">

                    <div className="modal-header">

                        <h5 className="modal-title text-danger">
                            Delete Borrower
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>

                    </div>

                    <div className="modal-body">

                        {error && (

                            <div className="alert alert-danger">

                                <i className="bi bi-exclamation-triangle-fill me-2"></i>

                                {error}

                            </div>

                        )}

                        <div className="text-center">

                            <i
                                className="bi bi-trash-fill text-danger"
                                style={{
                                    fontSize: "3rem"
                                }}
                            ></i>

                            <h5 className="mt-3">
                                Are you sure?
                            </h5>

                            <p className="text-muted">

                                You are about to delete borrower

                                <strong>
                                    {" "}
                                    {borrowerName}
                                </strong>

                            </p>

                            <p className="text-danger mb-0">

                                This action cannot be undone.

                            </p>

                        </div>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={handleDelete}
                            disabled={loading}
                        >
                            {loading
                                ? "Deleting..."
                                : "Delete Borrower"}
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default DeleteBorrowerModal;