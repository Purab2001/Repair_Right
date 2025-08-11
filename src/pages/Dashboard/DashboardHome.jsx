import React from "react";
import { Link } from "react-router";

const cards = [
  {
    to: "/dashboard/add-service",
    title: "Add Service",
    desc: "Create a new service",
  },
  {
    to: "/dashboard/manage-service",
    title: "Manage Service",
    desc: "Update your listings",
  },
  {
    to: "/dashboard/booked-services",
    title: "Booked Services",
    desc: "Your bookings",
  },
  {
    to: "/dashboard/service-to-do",
    title: "Service To-Do",
    desc: "Requests to fulfill",
  },
  { to: "/dashboard/profile", title: "Profile", desc: "Update your info" },
];

const DashboardHome = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-6">
      {cards.map((c) => (
        <Link
          key={c.to}
          to={c.to}
          className="p-5 rounded-xl border border-base-300 hover:border-primary transition"
        >
          <div className="text-lg font-semibold mb-1">{c.title}</div>
          <div className="text-base-content/70">{c.desc}</div>
        </Link>
      ))}
    </div>
  );
};

export default DashboardHome;
