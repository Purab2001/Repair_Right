import React from "react";
import { NavLink } from "react-router";
import { RiArrowDropDownLine, RiDashboardHorizontalFill } from "react-icons/ri";
import { MdAdd, MdEdit, MdEventAvailable, MdChecklist } from "react-icons/md";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const DesktopMenu = ({ user }) => {
  return (
    <ul className="menu menu-horizontal text-base font-medium px-1 flex items-center gap-2">
      <li>
        <NavLink
          to="/"
          className="text-base-content bg-base-100 hover:bg-base-200 focus:ring-4 focus:outline-none hover:scale-105 transition-all duration-200 ease-in-out focus:ring-base-300 font-medium rounded-lg text-md px-3 py-2 text-center inline-flex items-center"
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/services"
          className="text-base-content bg-base-100 hover:bg-base-200 focus:ring-4 focus:outline-none hover:scale-105 transition-all duration-200 ease-in-out focus:ring-base-300 font-medium rounded-lg text-md px-3 py-2 text-center inline-flex items-center"
        >
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/faqs"
          className="text-base-content bg-base-100 hover:bg-base-200 focus:ring-4 focus:outline-none hover:scale-105 transition-all duration-200 ease-in-out focus:ring-base-300 font-medium rounded-lg text-md px-3 py-2 text-center inline-flex items-center"
        >
          FAQs
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className="text-base-content bg-base-100 hover:bg-base-200 focus:ring-4 focus:outline-none hover:scale-105 transition-all duration-200 ease-in-out focus:ring-base-300 font-medium rounded-lg text-md px-3 py-2 text-center inline-flex items-center"
        >
          About Us
        </NavLink>
      </li>

      {user && (
        <li>
          <motion.button
            className="text-base-content bg-base-100 hover:bg-base-200 focus:ring-4 focus:outline-none focus:ring-base-300 font-medium rounded-lg text-md px-3 py-2 text-center inline-flex items-center gap-2"
            popoverTarget="dashboard-dropdown"
            style={{ anchorName: "--dashboard-anchor" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RiDashboardHorizontalFill />
            Dashboard
            <RiArrowDropDownLine size={25} />
          </motion.button>

          <motion.ul
            className="dropdown menu w-56 rounded-lg bg-base-100 shadow-xl border border-base-300 p-2"
            popover="auto"
            id="dashboard-dropdown"
            style={{ positionAnchor: "--dashboard-anchor" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.li
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.1 }}
            >
              <NavLink
                to="/add-service"
                className="flex items-center gap-3 p-3 rounded-md hover:bg-primary hover:text-primary-content transition-colors"
              >
                <MdAdd className="w-5 h-5" />
                Add Service
              </NavLink>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.1 }}
            >
              <NavLink
                to="/manage-service"
                className="flex items-center gap-3 p-3 rounded-md hover:bg-primary hover:text-primary-content transition-colors"
              >
                <MdEdit className="w-5 h-5" />
                Manage Service
              </NavLink>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.1 }}
            >
              <NavLink
                to="/booked-services"
                className="flex items-center gap-3 p-3 rounded-md hover:bg-primary hover:text-primary-content transition-colors"
              >
                <MdEventAvailable className="w-5 h-5" />
                Booked Services
              </NavLink>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.1 }}
            >
              <NavLink
                to="/service-to-do"
                className="flex items-center gap-3 p-3 rounded-md hover:bg-primary hover:text-primary-content transition-colors"
              >
                <MdChecklist className="w-5 h-5" />
                Service To-Do
              </NavLink>
            </motion.li>
          </motion.ul>
        </li>
      )}
    </ul>
  );
};

export default DesktopMenu;
