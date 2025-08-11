import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiService } from "../services/apiService";
import LoadingSpinner from "../ui/LoadingSpinner";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiCalendar, FiUser, FiMapPin, FiDollarSign } from "react-icons/fi";
import PageHelmet from "../components/PageHelmet";
import Alert from "../ui/Alert";

const BookedServices = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = await user.getIdToken();
        const data = await apiService.getUserBookings(token);
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "badge-warning";
      case "working":
        return "badge-info";
      case "completed":
        return "badge-success";
      default:
        return "badge-neutral";
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="">
      <PageHelmet />
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-secondary mb-2 tracking-tight">
            My Booked Services
          </h1>
          <p className="text-base-content/70 text-lg">
            Track and manage your service bookings
          </p>
        </div>

        <Alert type="error" message={error} className="mb-6" />

        {bookings.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-7xl mb-4">📅</div>
            <h3 className="text-2xl font-semibold mb-2 text-base-content">
              No bookings yet
            </h3>
            <p className="text-base-content/70 text-lg">
              Start by booking a service from our services page
            </p>
          </div>
        ) : (
          <>
            {/* Mobile Card Layout */}
            <div className="block md:hidden space-y-4">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-base-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg text-base-content">
                      {booking.serviceName}
                    </h3>
                    <span
                      className={`badge ${getStatusColor(
                        booking.serviceStatus
                      )}`}
                    >
                      {booking.serviceStatus}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-base-content/70">
                      <FiUser className="w-4 h-4" />
                      <span>{booking.providerName}</span>
                    </div>

                    <div className="flex items-center gap-2 text-base-content/70">
                      <FiCalendar className="w-4 h-4" />
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <FiDollarSign className="w-4 h-4" />
                      <span>${booking.price}</span>
                    </div>

                    {booking.instruction && (
                      <div className="pt-2 border-t border-base-300">
                        <p className="text-sm text-base-content/70">
                          <span className="font-medium">Instructions:</span>{" "}
                          {booking.instruction}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop Table Layout */}
            <div className="hidden md:block overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Service Name</th>
                    <th>Provider</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Instructions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <motion.tr
                      key={booking._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <th>{index + 1}</th>
                      <td className="font-semibold">{booking.serviceName}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <FiUser className="w-4 h-4" />
                          {booking.providerName}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <FiCalendar className="w-4 h-4" />
                          {new Date(booking.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2 text-primary font-semibold">
                          <FiDollarSign className="w-4 h-4" />${booking.price}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge ${getStatusColor(
                            booking.serviceStatus
                          )}`}
                        >
                          {booking.serviceStatus}
                        </span>
                      </td>
                      <td>
                        {booking.instruction ? (
                          <div
                            className="tooltip"
                            data-tip={booking.instruction}
                          >
                            <span className="text-sm truncate max-w-xs block">
                              {booking.instruction.substring(0, 30)}...
                            </span>
                          </div>
                        ) : (
                          <span className="text-base-content/50">None</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookedServices;
