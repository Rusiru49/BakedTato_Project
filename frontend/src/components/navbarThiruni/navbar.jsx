import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <NavLink to="/home" activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/add-raw-material" activeClassName="active">Add Raw Material</NavLink>
        </li>
        <li>
          <NavLink to="/raw-materials/pending" activeClassName="active">Manage Raw Materials</NavLink>
        </li>
        <li>
          <NavLink to="/manage-stock" activeClassName="active">Manage Stock</NavLink>
        </li>
        <li>
          <NavLink to="/notifications" activeClassName="active">Notifications</NavLink>
        </li>
        <li>
          <NavLink to="/profile" activeClassName="active">Profile</NavLink>
        </li>
      </ul>

      <div className="navbar-footer">
        <div className="bakedtato">BAKEDTATO</div>
        <div className="supplier-dashboard">Supplier Dashboard</div>
      </div>
    </div>
  );
};

export default Navbar;
