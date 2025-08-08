import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiService } from "../services/apiService";
import LoadingSpinner from "../ui/LoadingSpinner";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiCalendar, FiUser, FiDollarSign } from "react-icons/fi";
import PageHelmet from "../components/PageHelmet";
import { toastSuccess, toastError } from "../ui/CustomHotToast";
import Alert from "../ui/Alert";

const ServiceToDo = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = await user.getIdToken();
        const data = await apiService.getProviderBookings(token);
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

  const updateBookingStatus = async (bookingId, newStatus) => {
    setUpdatingStatus(bookingId);
    try {
      const token = await user.getIdToken();
      await apiService.updateBookingStatus(bookingId, newStatus, token);

      setBookings(
        bookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, serviceStatus: newStatus }
            : booking
        )
      );

      toastSuccess(`Booking status updated to ${newStatus}`);
    } catch (err) {
      toastError(`Failed to update status: ${err.message}`);
    } finally {
      setUpdatingStatus(null);
    }
  };

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
    <div className="bg-base-200">
      <PageHelmet />
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-secondary mb-2 tracking-tight">
            Service Dashboard
          </h1>
          <p className="text-base-content/70 text-lg">
            Manage your service requests and track progress
          </p>
        </div>

        <Alert type="error" message={error} className="mb-6" />

        {bookings.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-7xl mb-4">📋</div>
            <h3 className="text-2xl font-semibold mb-2 text-base-content">
              No service requests yet
            </h3>
            <p className="text-base-content/70 text-lg">
              Your service bookings will appear here when customers book your
              services
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Service Name</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Instructions</th>
                  <th>Actions</th>
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
                        {booking.userName}
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
                        <div className="tooltip" data-tip={booking.instruction}>
                          <span className="text-sm truncate max-w-xs block">
                            {booking.instruction.substring(0, 30)}...
                          </span>
                        </div>
                      ) : (
                        <span className="text-base-content/50">None</span>
                      )}
                    </td>
                    <td>
                      <select
                        value={booking.serviceStatus}
                        onChange={(e) =>
                          updateBookingStatus(booking._id, e.target.value)
                        }
                        disabled={updatingStatus === booking._id}
                        className="select select-sm select-bordered"
                      >
                        <option value="pending">Pending</option>
                        <option value="working">Working</option>
                        <option value="completed">Completed</option>
                      </select>
                      {updatingStatus === booking._id && (
                        <span className="loading loading-spinner loading-md"></span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceToDo;
