import React from "react";
import { NavLink, Outlet } from "react-router";
import PageHelmet from "../../components/PageHelmet";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { MdAdd, MdEdit, MdEventAvailable, MdChecklist } from "react-icons/md";
import { FiUser } from "react-icons/fi";

const linkBase = "flex items-center gap-3 p-3 rounded-md transition-colors";
const linkClass = ({ isActive }) =>
  `${linkBase} ${
    isActive ? "bg-primary text-primary-content" : "hover:bg-base-200"
  }`;

const DashboardLayout = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-base-200">
      <PageHelmet customTitle="Dashboard" />
      <div className="container mx-auto px-4 py-8 md:px-14 lg:px-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3 bg-base-100 rounded-xl border border-base-300 p-4 lg:min-h-[calc(100vh-144px)]">
            <div className="flex items-center gap-2 mb-4 font-semibold">
              <RiDashboardHorizontalFill />
              Dashboard
            </div>
            <nav className="flex flex-col gap-2">
              <NavLink to="/dashboard" end className={linkClass}>
                <RiDashboardHorizontalFill className="w-5 h-5" /> Overview
              </NavLink>
              <NavLink to="/dashboard/add-service" className={linkClass}>
                <MdAdd className="w-5 h-5" /> Add Service
              </NavLink>
              <NavLink to="/dashboard/manage-service" className={linkClass}>
                <MdEdit className="w-5 h-5" /> Manage Service
              </NavLink>
              <NavLink to="/dashboard/booked-services" className={linkClass}>
                <MdEventAvailable className="w-5 h-5" /> Booked Services
              </NavLink>
              <NavLink to="/dashboard/service-to-do" className={linkClass}>
                <MdChecklist className="w-5 h-5" /> Service To-Do
              </NavLink>
              <NavLink to="/dashboard/profile" className={linkClass}>
                <FiUser className="w-5 h-5" /> Profile
              </NavLink>
            </nav>
          </aside>

          <main className="lg:col-span-9">
            <div className="bg-base-100 rounded-xl border border-base-300 lg:min-h-[calc(100vh-144px)]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
