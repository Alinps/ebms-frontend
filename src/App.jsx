import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import EquipmentList from "./pages/EquipmentList";
import BorrowerList from "./pages/BorrowerList";
import Navbar from "./components/Navbar";
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./features/auth/protectedRoute";
import AddEquipment from "./pages/AddEquipment";
import AddBorrower from "./pages/AddBorrower";
import EditEquipment from "./pages/EditEquipment";
import { useSelector } from "react-redux";

function Dashboard() {

  
      const user  = useSelector(store=> store.auth.user);


    return (
        <div className="container mt-5">
            <h2>Welcome {user}</h2>
        </div>
    );
}

function App() {

    return (
       <BrowserRouter>
                        <Routes>

                <Route path="/" element={<AdminLogin />} />

                <Route element={<ProtectedRoute />}>

                    <Route element={<AdminLayout />}>

                        <Route
                            path="/admin/dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/admin/equipment/list"
                            element={<EquipmentList />}
                        />

                        <Route
                            path="/admin/borrowers"
                            element={<BorrowerList />}
                        />

                        <Route
                            path="/admin/add-equipment"
                            element={<AddEquipment />}
                        />


                        <Route
                            path="/admin/add-borrower"
                            element={<AddBorrower />}
                        />

                        <Route
                            path="/admin/edit-equipment/:id"
                            element={<EditEquipment />}
                        />

                    </Route>

                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default App;