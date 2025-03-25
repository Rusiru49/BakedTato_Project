import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
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
      path: "/home",
      element: (
        <>
          <NavbarThiruni />
          <ApprovedRawMaterials />
        </>
      )
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
    {
      path:"/add-raw-material",
      element:(
        <>
          <NavbarThiruni/>
          <AddRawMaterial/>
        </>
      )
    },
    {
      path:"/raw-materials/pending",
      element:(
        <>
          <NavbarThiruni/>
          <PendingRawMaterials/>
        </>
      )
    },
    {
      path:"/updateRawMaterials/:id",
      element:(
        <>
          <NavbarThiruni/>
          <UpdateRawMaterials/>
        </>
      )
    },
    {
      path:"/manage-stock",
      element:(
        <>
          <NavbarThiruni/>
          <ManageStock/>
        </>
      )
    },
    {
      path:"/add-stock",
      element:(
        <>
          <NavbarThiruni/>
          <AddStock/>
        </>
      )
    }
    
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

  //return <RouterProvider router={route} />;
  return(
    <div className="App">
      <RouterProvider router = {route}></RouterProvider>
    </div>
  )

}

export default App;
