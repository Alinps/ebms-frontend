import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import DeleteEquipmentModal from "../components/DeleteEquipmentModal";

function EquipmentList() {

    const [equipments, setEquipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedEquipment, setSelectedEquipment] = useState(null);

    useEffect(() => {
        fetchEquipments();
    }, []);

    const fetchEquipments = async () => {
        try {

            const response = await api.get("/equipment/list");

            setEquipments(response.data.data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const clickAddEquipment = ()=>{
        navigate("/admin/add-equipment");
    }

    const handleDeleteClick = (equipment) => {

    setSelectedEquipment(equipment);

    setShowDeleteModal(true);

};

    if (loading) {
        return (
            <div className="container mt-4">
                <h4>Loading...</h4>
            </div>
        );
    }

    return (
       <div className="container-fluid py-4">

    <div className="card border-0 shadow-sm rounded-4">

        <div className="card-header bg-white border-bottom py-3">

            <div className="d-flex justify-content-between align-items-center">

                <div>

                    <h4 className="mb-0 fw-semibold">
                        Equipment Inventory
                    </h4>

                    <small className="text-muted">
                        Manage all available equipment
                    </small>

                </div>

                <div className="d-flex align-items-center gap-3">

                    <span className="badge rounded-pill bg-primary px-3 py-2">
                        {equipments.length} Items
                    </span>

                    <button className="btn btn-primary" onClick={clickAddEquipment}>
                        <i className="bi bi-plus-lg me-2"></i>
                        Add Equipment
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
                            placeholder="Search equipment..."
                        />

                    </div>

                </div>

            </div>

            <div className="table-responsive">

                <table className="table table-hover align-middle">

                    <thead className="table-light">

                        <tr>
                            <th>#</th>
                            <th>Equipment</th>
                            <th>Category</th>
                            <th>Serial Number</th>
                            <th>Available Qty</th>
                            <th>Status</th>
                            <th className="text-center">
                                Actions
                            </th>
                        </tr>

                    </thead>

                    <tbody>

                        {equipments.map((equipment, index) => (

                            <tr key={equipment._id}>

                                <td>{index + 1}</td>

                                <td>
                                    <div className="fw-semibold">
                                        {equipment.name}
                                    </div>
                                </td>

                                <td>
                                    <span className="badge bg-secondary">
                                        {equipment.catogory}
                                    </span>
                                </td>

                                <td>
                                    {equipment.serialNumber}
                                </td>

                                <td>
                                    <span className="fw-semibold">
                                        {equipment.availableQuantity}
                                    </span>
                                </td>

                                <td>

                                    <span
                                        className={`badge rounded-pill ${
                                            equipment.status === "Available"
                                                ? "bg-success"
                                                : "bg-danger"
                                        }`}
                                    >
                                        {equipment.status}
                                    </span>

                                </td>

                                <td className="text-center">

                                    <button
                                        className="btn btn-outline-primary btn-sm me-2"
                                        title="View"
                                    >
                                        <i className="bi bi-eye"></i>
                                    </button>

                                    <button
                                        className="btn btn-outline-warning btn-sm me-2"
                                        title="Edit"
                                        onClick={()=> navigate(`/admin/edit-equipment/${equipment._id}`)}
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </button>

                                   <button className="btn btn-outline-danger btn-sm"
                                            onClick={() => handleDeleteClick(equipment) }>
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


    <DeleteEquipmentModal 
    show={showDeleteModal}
    equipmentId={selectedEquipment?._id}
    equipmentName={selectedEquipment?.name}
    onClose={() => setShowDeleteModal(false)}
    onDeleteSuccess={() => fetchEquipments() }
    />

</div>
    );
}

export default EquipmentList;