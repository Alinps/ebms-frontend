import { NavLink } from "react-router-dom";
import '../styles/sidebar.css';
function Sidebar({ isOpen }) {

    const menuItems = [
        {
            name: "Dashboard",
            path: "/admin/dashboard/stats",
            icon: "bi-speedometer2"
        },
        {
            name: "Equipment",
            path: "/admin/equipment/list",
            icon: "bi-laptop"
        },
        {
            name: "Borrowers",
            path: "/admin/borrowers",
            icon: "bi-people"
        },
        {
            name:"Borrow Equipments",
            path:"/admin/borrow-equipment/",
            icon: "bi-arrow-repeat"
        },
        {
            name: "Borrow History",
            path: "/admin/borrow-history",
            icon: "bi-clock-history"
        },
        {
            name:"Active Borrowings",
            path: "/admin/borrow/history/active",
            icon: "bi-arrow-left-right"
        }
    ];

    return (
        <div
            className="bg-white border-end shadow-sm"
            style={{
                width: isOpen ? "250px" : "75px",
                minHeight: "100vh",
                transition: "all 0.3s ease"
            }}
        >

            {/* Logo Section */}

            <div className="border-bottom p-3">

                <div className="d-flex align-items-center">

                    <i className="bi bi-box-seam fs-4 text-primary"></i>

                    {isOpen && (
                        <span className="ms-2 fw-bold fs-5">
                            EBMS
                        </span>
                    )}

                </div>

            </div>

            {/* Menu */}

            <ul className="nav flex-column p-2">

                {menuItems.map((item) => (

                    <li
                        className="nav-item mb-2"
                        key={item.path}
                    >

                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `nav-link rounded-3 d-flex align-items-center ${
                                    isActive
                                        ? "bg-primary text-white"
                                        : "text-dark"
                                }`
                            }
                        >

                            <i
                                className={`bi ${item.icon} fs-5`}
                            ></i>

                            {isOpen && (
                                <span className="ms-3">
                                    {item.name}
                                </span>
                            )}

                        </NavLink>

                    </li>

                ))}

            </ul>

        </div>
    );
}

export default Sidebar;