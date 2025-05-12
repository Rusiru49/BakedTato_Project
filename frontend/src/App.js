import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { default as AllUsers, default as UsersPage } from "./Admin/AllUsers";
import AddRawMaterial from "./components/addOperationsThiruni/AddRawMaterial";
import AddStock from "./components/addOperationsThiruni/AddStock";
import ManageStock from "./components/addOperationsThiruni/ManageStockPage";
import AdminDashboard from "./components/AdminDashboard";
import ProductAnalysis from "./components/ProductAnalysis";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import NavbarHome from "./components/NavbarHome";
import NavbarThiruni from "./components/navbarThiruni/navbar";
import ProductDetails from "./components/ProductDetails";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Sidebar from "./components/Sidebar";
import UpdateRawMaterials from "./components/updateOperationsThiruni/updateRawMaterials";
import ApprovedRawMaterials from "./components/ViewOperationsThiruni/viewApprovedRawMaterials";
import PendingRawMaterials from "./components/ViewOperationsThiruni/viewPendingRawMaterials";
import Orders from "./pages/Orders";
import AllOrders from "./pages/AllOrders";
import FreshIngredients from "./components/FreshIngredients";
import CustomizeOptions from "./components/CustomizeOptions";
import FastDelivery from "./components/FastDelivery";
import BuyProductPage from "./components/BuyProduct";
import AdminRawStockView from "./components/adminTasks_Supplier/rawMaterial_Stock";
import RawMaterialsApprovals from "./components/adminTasks_Supplier/rawMaterial_Approvals";
import ManageStockAdmin from "./components/adminTasks_Supplier/stockUpdates_admin";
import UpdateRemainingStock from "./components/updateOperationsThiruni/updateStock";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userMail = user ? user.email : null;

  const admin = userMail === "rus@gmail.com";
  const supplier = userMail === "thiruniWije@gmail.com";

  return (
    <Router>
      {/* Navbar */}
      {admin ? <Navbar /> : <NavbarHome />}

      <div style={{ display: "flex" }}>
        {/* Sidebar only for Admin */}
        {admin && <Sidebar />}

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/products" element={<ProductAnalysis />} />

            {/* Admin Routes */}
            {admin && (
              <>
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/showusers" element={<AllUsers />} />
                <Route
                  path="/supplierHome"
                  element={
                    <>
                      <ApprovedRawMaterials />
                      <NavbarThiruni />
                    </>
                  }
                />
                <Route
                  path="/add-raw-material"
                  element={
                    <>
                      <AddRawMaterial />
                      <NavbarThiruni />
                    </>
                  }
                />
                <Route
                  path="/raw-materials/pending"
                  element={
                    <>
                      <PendingRawMaterials />
                      <NavbarThiruni />
                    </>
                  }
                />
                <Route
                  path="/updateRawMaterials/:id"
                  element={
                    <>
                      <UpdateRawMaterials />
                      <NavbarThiruni />
                    </>
                  }
                />
                <Route
                  path="/manage-stock"
                  element={
                    <>
                      <ManageStock />
                      <NavbarThiruni />
                    </>
                  }
                />
                <Route
                  path="/add-stock"
                  element={
                    <>
                      <AddStock />
                      <NavbarThiruni />
                    </>
                  }
                />
                <Route
                  path="/rawmaterial-stock-view-admin"
                  element={
                    <>
                      <AdminRawStockView />
                    </>
                  }
                />
                <Route
                  path="/rawmaterial-approve-reject-admin"
                  element={
                    <>
                      <RawMaterialsApprovals />
                    </>
                  }
                />
                <Route
                  path="/manage-stock-admin"
                  element={
                    <>
                      <ManageStockAdmin />
                    </>
                  }
                />
              </>
            )}

            {/* Supplier Routes */}
            {supplier && !admin && (
              <>
                <Route
                  path="/supplierHome"
                  element={
                    <>
                      <ApprovedRawMaterials />
                      <NavbarThiruni />
                    </>
                  }
                />
                <Route
                  path="/add-raw-material"
                  element={
                    <>
                      <AddRawMaterial />
                      <NavbarThiruni />
                    </>
                  }
                />
                <Route
                  path="/raw-materials/pending"
                  element={
                    <>
                      <PendingRawMaterials />
                      <NavbarThiruni />
                    </>
                  }
                />
                <Route
                  path="/updateRawMaterials/:id"
                  element={
                    <>
                      <UpdateRawMaterials />
                      <NavbarThiruni />
                    </>
                  }
                />
                <Route
                  path="/manage-stock"
                  element={
                    <>
                      <ManageStock />
                      <NavbarThiruni />
                    </>
                  }
                />
                <Route
                  path="/add-stock"
                  element={
                    <>
                      <AddStock />
                      <NavbarThiruni />
                    </>
                  }
                />
                <Route
                  path="/update-stock/:id"
                  element={
                    <>
                      <UpdateRemainingStock />
                      <NavbarThiruni />
                    </>
                  }
                />
              </>
            )}

            {(user || admin) && <Route path="/orders" element={<Orders />} />}
            {(user || admin) && (
              <Route path="/all-orders" element={<AllOrders />} />
            )}
            {(user || admin) && (
              <Route path="/buyproducts" element={<BuyProductPage />} />
            )}

            <Route path="/fresh-ingredients" element={<FreshIngredients />} />
            <Route path="/customize-options" element={<CustomizeOptions />} />
            <Route path="/fast-delivery" element={<FastDelivery />} />

            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/viewProducts" element={<ProductList />} />
            <Route path="/create" element={<ProductForm />} />
            <Route path="/edit/:id" element={<ProductForm />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
