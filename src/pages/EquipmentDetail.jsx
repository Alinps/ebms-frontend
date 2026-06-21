import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from "../api/api";

const ViewEquipment = () => {


const { id } = useParams();

const navigate = useNavigate();

const [equipment, setEquipment] = useState(null);

const [loading, setLoading] = useState(true);

const [error, setError] = useState('');

useEffect(() => {

    fetchEquipment();

}, []);

const fetchEquipment = async () => {

    try {

        setLoading(true);

        const response =
            await api.get(
                `/equipment/get-equipment/${id}`
            );

        setEquipment(
            response.data.data
        );

    } catch (error) {

        setError(

            error.response?.data?.message ||

            'Failed to load equipment'

        );

    } finally {

        setLoading(false);

    }

};

const getStatusBadge = (status) => {

    switch (status) {

        case 'Available':
            return 'bg-success';

        case 'Maintenance':
            return 'bg-warning text-dark';

        case 'Retired':
            return 'bg-danger';

        default:
            return 'bg-secondary';
    }

};

if (loading) {

    return (

        <div className="container mt-4">

            <div className="text-center">

                <div
                    className="spinner-border"
                    role="status"
                >
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>

            </div>

        </div>

    );

}

if (error) {

    return (

        <div className="container mt-4">

            <div
                className="alert alert-danger"
            >
                {error}
            </div>

            <button
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
            >
                Back
            </button>

        </div>

    );

}

return (

    <div className="container mt-4">

        <div className="card shadow">

            <div className="card-header d-flex justify-content-between align-items-center">

                <h4 className="mb-0">
                    Equipment Details
                </h4>

                <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>

            </div>

            <div className="card-body">

                <div className="row mb-3">

                    <div className="col-md-4 fw-bold">
                        Equipment Name
                    </div>

                    <div className="col-md-8">
                        {equipment.name}
                    </div>

                </div>

                <hr />

                <div className="row mb-3">

                    <div className="col-md-4 fw-bold">
                        Category
                    </div>

                    <div className="col-md-8">
                        {equipment.catogory}
                    </div>

                </div>

                <hr />

                <div className="row mb-3">

                    <div className="col-md-4 fw-bold">
                        Serial Number
                    </div>

                    <div className="col-md-8">
                        {equipment.serialNumber}
                    </div>

                </div>

                <hr />

                <div className="row mb-3">

                    <div className="col-md-4 fw-bold">
                        Total Quantity
                    </div>

                    <div className="col-md-8">
                        {equipment.totalQuantity}
                    </div>

                </div>

                <hr />

                <div className="row mb-3">

                    <div className="col-md-4 fw-bold">
                        Available Quantity
                    </div>

                    <div className="col-md-8">
                        {equipment.availableQuantity}
                    </div>

                </div>

                <hr />

                <div className="row">

                    <div className="col-md-4 fw-bold">
                        Status
                    </div>

                    <div className="col-md-8">

                        <span
                            className={`badge ${getStatusBadge(
                                equipment.status
                            )}`}
                        >
                            {equipment.status}
                        </span>

                    </div>

                </div>

            </div>

        </div>

    </div>

);


};

export default ViewEquipment;
