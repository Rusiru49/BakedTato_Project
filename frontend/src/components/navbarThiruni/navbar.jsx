import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaPlusCircle, FaBoxes, FaTasks, FaBell } from "react-icons/fa";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-links-container">
        <ul className="sidebar-links">
          <li>
            <NavLink exact to="/supplierHome" activeClassName="active">
              <FaHome className="icon" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-raw-material" activeClassName="active">
              <FaPlusCircle className="icon" />
              Add Raw Material
            </NavLink>
          </li>
          <li>
            <NavLink to="/raw-materials/pending" activeClassName="active">
              <FaTasks className="icon" />
              Manage Raw Materials
            </NavLink>
          </li>
          <li>
            <NavLink to="/manage-stock" activeClassName="active">
              <FaBoxes className="icon" />
              Manage Stock
            </NavLink>
          </li>
          <li>
            <NavLink to="/notifications" activeClassName="active">
              <FaBell className="icon" />
              Notifications
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
