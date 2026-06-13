import { useState } from "react";
import api from "../api/api";

function DeleteEquipmentModal({
    equipmentId,
    equipmentName,
    show,
    onClose,
    onDeleteSuccess
}) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleDelete = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.delete(`/equipment/delete/${equipmentId}`);

            alert(response.data.message);

            onDeleteSuccess();

            onClose();

        } catch (error) {

            setError(
                error?.response?.data?.message ||
                error.message ||
                "Failed to delete equipment"
            );

        } finally {

            setLoading(false);

        }

    };

    if (!show) return null;

    return (

        <div
            className="modal d-block"
            tabIndex="-1"
            style={{
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog modal-dialog-centered">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title text-danger">
                            Delete Equipment
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
                                {error}
                            </div>

                        )}

                        <p>
                            Are you sure you want to delete:
                        </p>

                        <strong>
                            {equipmentName}
                        </strong>

                        <p className="text-danger mt-3 mb-0">
                            This action cannot be undone.
                        </p>

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
                                : "Delete"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default DeleteEquipmentModal;