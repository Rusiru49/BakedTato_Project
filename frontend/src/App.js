import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import LandingPage from "./components/LandingPage";
import ProductDetails from "./components/ProductDetails";
import AllUsers from "./Admin/AllUsers";
import NavbarThiruni from './components/navbarThiruni/navbar';
import AddRawMaterial from './components/addOperationsThiruni/AddRawMaterial';
import ApprovedRawMaterials from './components/ViewOperationsThiruni/viewApprovedRawMaterials'; 
import PendingRawMaterials from './components/ViewOperationsThiruni/viewPendingRawMaterials';
import UpdateRawMaterials from './components/updateOperationsThiruni/updateRawMaterials';
import ManageStock from './components/addOperationsThiruni/ManageStockPage';
import AddStock from './components/addOperationsThiruni/AddStock';

function App() {

  const user = JSON.parse(localStorage.getItem('user'));
  const userMail = user ? user.email : null;

  const admin = userMail === 'rusiruxz@gmail.com';
  const supplier = userMail === 'thiruniWije@gmail.com';


  return (
    <Router>
      <Navbar />
      <Routes>

        {admin && (
          <>
            <Route path="/showusers" element={<AllUsers />} />
            <Route path="/supplierHome" element={<><ApprovedRawMaterials /><NavbarThiruni/></>} />
            <Route path="/add-raw-material" element={<><AddRawMaterial /><NavbarThiruni/></>} />
            <Route path="/raw-materials/pending" element={<><PendingRawMaterials /><NavbarThiruni/></>} />
            <Route path="/updateRawMaterials/:id" element={<><UpdateRawMaterials /><NavbarThiruni/></>} />
            <Route path="/manage-stock" element={<><ManageStock /><NavbarThiruni/></>} />
            <Route path="/add-stock" element={<><AddStock /><NavbarThiruni/></>} />
          </>
        )}

        {supplier && (
          <>
            <Route path="/supplierHome" element={<><ApprovedRawMaterials /><NavbarThiruni/></>} />
            <Route path="/add-raw-material" element={<><AddRawMaterial /><NavbarThiruni/></>} />
            <Route path="/raw-materials/pending" element={<><PendingRawMaterials /><NavbarThiruni/></>} />
            <Route path="/updateRawMaterials/:id" element={<><UpdateRawMaterials /><NavbarThiruni/></>} />
            <Route path="/manage-stock" element={<><ManageStock /><NavbarThiruni/></>} />
            <Route path="/add-stock" element={<><AddStock /><NavbarThiruni/></>} />
          </>
        )}

        <Route path="/" element={<LandingPage />} />
        <Route path="/viewProducts" element={<ProductList />} />
        <Route path="/create" element={<ProductForm />} />
        <Route path="/edit/:id" element={<ProductForm />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;