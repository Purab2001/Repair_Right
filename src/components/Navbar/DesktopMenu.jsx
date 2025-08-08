import React from "react";
import { NavLink } from "react-router";

const linkClass =
  "text-base-content bg-base-100 hover:bg-base-200 focus:ring-4 focus:outline-none hover:scale-105 transition-all duration-200 ease-in-out focus:ring-base-300 font-medium rounded-lg text-md px-3 py-2 text-center inline-flex items-center";

const DesktopMenu = ({ user }) => {
  return (
    <ul className="menu menu-horizontal text-base font-medium px-1 flex items-center gap-2">
      <li>
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/services" className={linkClass}>
          Services
        </NavLink>
      </li>
      <li>
        <NavLink to="/faqs" className={linkClass}>
          FAQs
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={linkClass}>
          About Us
        </NavLink>
      </li>
      {user ? (
        <li>
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
        </li>
      ) : null}
    </ul>
  );
};

export default DesktopMenu;
