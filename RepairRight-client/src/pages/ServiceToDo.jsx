import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { apiService } from '../services/apiService'
import LoadingSpinner from '../ui/LoadingSpinner'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { FiCalendar, FiUser, FiDollarSign, FiClock, FiSettings, FiCheckCircle } from 'react-icons/fi'
import PageHelmet from '../components/PageHelmet'
import { toastSuccess, toastError } from '../ui/CustomHotToast'

const ServiceToDo = () => {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingStatus, setUpdatingStatus] = useState(null)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.5
      }
    }
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const statusVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    }
  }

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = await user.getIdToken()
        const data = await apiService.getProviderBookings(token)
        setBookings(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchBookings()
    }
  }, [user])

  const updateBookingStatus = async (bookingId, newStatus) => {
    setUpdatingStatus(bookingId)
    try {
      const token = await user.getIdToken()
      await apiService.updateBookingStatus(bookingId, newStatus, token)

      setBookings(bookings.map(booking =>
        booking._id === bookingId
          ? { ...booking, serviceStatus: newStatus }
          : booking
      ))

      toastSuccess(`Booking status updated to ${newStatus}`)
    } catch (err) {
      toastError(`Failed to update status: ${err.message}`)
    } finally {
      setUpdatingStatus(null)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-200'
      case 'working': return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200'
      case 'completed': return 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-200'
      default: return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FiClock className="w-4 h-4" />
      case 'working': return <FiSettings className="w-4 h-4 animate-spin" />
      case 'completed': return <FiCheckCircle className="w-4 h-4" />
      default: return <FiClock className="w-4 h-4" />
    }
  }
  if (loading) return <LoadingSpinner />

  return (
    <div className='bg-base-200'>
      <PageHelmet />
      <div className="container mx-auto px-4 py-12 md:px-14 lg:px-28">
        <motion.div
          className="text-center mb-12"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl font-extrabold mb-4 text-indigo-700"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Service Dashboard
          </motion.h1>
          <motion.p
            className="text-base-content/80 text-xl font-medium"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Manage your service requests and track progress
          </motion.p>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border-l-4 border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8 shadow-sm"
            >
              <span className="font-medium">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {bookings.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-8xl mb-6"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              📋
            </motion.div>
            <h3 className="text-3xl font-bold text-base-content/80 mb-3">No service requests yet</h3>
            <p className="text-base-content/70 text-lg">Your service bookings will appear here when customers book your services</p>
          </motion.div>
        ) : (
          <motion.div
            className="grid gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {bookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                variants={cardVariants}
                className="bg-base-100 rounded-xl shadow overflow-hidden backdrop-blur-sm"
              >
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-64 h-48 lg:h-auto relative overflow-hidden">
                    <motion.img
                      src={booking.serviceImage || booking.serviceImageUrl}
                      alt={booking.serviceName}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  <div className="flex-1 p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <motion.h3
                          className="text-2xl font-bold text-base-content mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                        >
                          {booking.serviceName}
                        </motion.h3>
                        <motion.div
                          className="flex items-center gap-2 text-base-content/90"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          <FiUser className="w-5 h-5 text-indigo-500" />
                          <span className="font-medium">Customer:</span>
                          <span className="font-semibold text-base-content/80">{booking.userName}</span>
                        </motion.div>
                      </div>
                      <motion.div
                        variants={statusVariants}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border-2 shadow-sm ${getStatusColor(booking.serviceStatus)}`}
                      >
                        {getStatusIcon(booking.serviceStatus)}
                        <span className="uppercase tracking-wide">{booking.serviceStatus}</span>
                      </motion.div>
                    </div>

                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      <div className="flex items-center gap-3 bg-base-200 rounded-xl p-4">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                          <FiCalendar className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-xs text-base-content/60 font-medium uppercase tracking-wide">Service Date</p>
                          <p className="font-bold text-base-content/80">{new Date(booking.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-base-200 rounded-xl p-4">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <FiDollarSign className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-xs text-base-content/60 font-medium uppercase tracking-wide">Price</p>
                          <p className="font-bold text-base-content/80">${booking.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-base-200 rounded-xl p-4">
                        <div className="p-2 bg-amber-100 rounded-lg">
                          <FiClock className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-xs text-base-content/60 font-medium uppercase tracking-wide">Booked Date</p>
                          <p className="font-bold text-base-content/80">{new Date(booking.bookedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </motion.div>

                    {booking.instruction && (
                      <motion.div
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-400 rounded-xl p-5 mb-6"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        <p className="text-slate-700">
                          <strong className="text-indigo-700">Customer Instructions:</strong>
                          <span className="ml-2">{booking.instruction}</span>
                        </p>
                      </motion.div>
                    )}

                    <motion.div
                      className="flex items-center gap-4 bg-base-200 rounded-xl p-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                    >
                      <label className="font-bold text-base-content/70 text-sm uppercase tracking-wide">
                        Update Status:
                      </label>
                      <div className="relative">
                        <motion.select
                          id={`status-${booking._id}`}
                          value={booking.serviceStatus}
                          onChange={e => updateBookingStatus(booking._id, e.target.value)}
                          disabled={updatingStatus === booking._id}
                          className="appearance-none bg-base-100 rounded-xl px-4 py-2 pr-8 font-medium text-base"
                          whileFocus={{ scale: 1.02 }}
                        >
                          <option value="pending">Pending</option>
                          <option value="working">Working</option>
                          <option value="completed">Completed</option>
                        </motion.select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </div>
                      <AnimatePresence>
                        {updatingStatus === booking._id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center gap-2 text-indigo-600"
                          >
                            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm font-medium">Updating...</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ServiceToDo