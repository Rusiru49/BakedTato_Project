import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ProductDetails from "./components/ProductDetails";
import AllUsers from "./Admin/AllUsers";

function App() {

  const user = JSON.parse(localStorage.getItem('user'));
  const userMail = user ? user.email : null;

  const admin = userMail === 'rusiruxz@gmail.com';
  return (
    <Router>
      <Navbar />
      <Routes>

        {admin && (
          <>
            <Route path="/showusers" element={<AllUsers />} />
          </>
        )}

        <Route path="/" element={<ProductList />} />
        <Route path="/create" element={<ProductForm />} />
        <Route path="/edit/:id" element={<ProductForm />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;