import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function AdminLayout() {

    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            <Navbar />

            <div className="d-flex">

                <Sidebar isOpen={isOpen} />

                <div className="flex-grow-1">

                    <div className="p-2 border-bottom bg-light">

                        <button
                            className="btn btn-dark"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <i className="bi bi-list"></i>
                        </button>

                    </div>

                    <div className="p-4">
                        <Outlet />
                    </div>

                </div>

            </div>
        </>
    );
}

export default AdminLayout;