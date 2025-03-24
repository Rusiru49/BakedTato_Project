import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ProductDetails from "./components/ProductDetails";
import AllUsers from "./Admin/AllUsers";

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userMail = user ? user.email : null;
  const admin = userMail === 'rusiruxz@gmail.com';

  const route = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <ProductList />
        </>
      ),
    },
    {
      path: "/create",
      element: (
        <>
          <Navbar />
          <ProductForm />
        </>
      ),
    },
    {
      path: "/edit/:id",
      element: (
        <>
          <Navbar />
          <ProductForm />
        </>
      ),
    },
    {
      path: "/product/:id",
      element: (
        <>
          <Navbar />
          <ProductDetails />
        </>
      ),
    },
    
  ]);

  if (admin) {
    route.routes.push({
      path: "/showusers",
      element: (
        <>
          <Navbar />
          <AllUsers />
        </>
      ),
    });
  }

  return <RouterProvider router={route} />;
}

export default App;

