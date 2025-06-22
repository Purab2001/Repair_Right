import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { apiService } from '../services/apiService'
import LoadingSpinner from '../ui/LoadingSpinner'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { FiCalendar, FiUser, FiMapPin, FiDollarSign, FiClock } from 'react-icons/fi'
import PageHelmet from '../components/PageHelmet'

const BookedServices = () => {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = await user.getIdToken()
        const data = await apiService.getUserBookings(token)
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'working': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  if (loading) return <LoadingSpinner />

  return (
    <div className='bg-base-200'>
      <PageHelmet />
      <div className="container mx-auto px-4 py-12 md:px-14 lg:px-28">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-2 tracking-tight">My Booked Services</h1>
          <p className="text-base-content/70 text-lg">Track and manage your service bookings</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
            <span>{error}</span>
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-7xl mb-4">📅</div>
            <h3 className="text-2xl font-semibold mb-2 text-base-content">No bookings yet</h3>
            <p className="text-base-content/70 text-lg">Start by booking a service from our services page</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-base-100 rounded-2xl shadow hover:shadow-2xl transition-shadow duration-200 flex flex-col"
              >
                <div className="relative">
                  <img
                    src={booking.serviceImage || booking.serviceImageUrl}
                    alt={booking.serviceName}
                    className="w-full h-44 object-cover rounded-t-2xl"
                  />
                  <span
                    className={`absolute top-4 right-4 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow ${getStatusColor(booking.serviceStatus)} bg-opacity-90`}
                  >
                    {booking.serviceStatus}
                  </span>
                </div>
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="text-xl font-bold text-indigo-700 mb-1">{booking.serviceName}</h3>
                  <div className="flex items-center gap-2 text-base-content/70 mb-2">
                    <FiUser className="w-4 h-4" />
                    <span className="font-medium">Provider:</span>
                    <span>{booking.providerName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-base-content/70 mb-2">
                    <FiMapPin className="w-4 h-4" />
                    <span className="font-medium">Area:</span>
                    <span>{booking.serviceArea || 'N/A'}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2 mt-2 mb-4">
                    <div className="flex items-center gap-2 text-base-content/70">
                      <FiCalendar className="w-4 h-4" />
                      <span>Date: <span className="font-semibold">{new Date(booking.date).toLocaleDateString()}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-base-content/70">
                      <FiDollarSign className="w-4 h-4" />
                      <span>Price: <span className="font-semibold text-indigo-600">${booking.price}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-base-content/70">
                      <FiClock className="w-4 h-4" />
                      <span>Booked: <span className="font-semibold">{new Date(booking.bookedAt).toLocaleDateString()}</span></span>
                    </div>
                  </div>
                  {booking.instruction && (
                    <div className="bg-indigo-50 border-l-4 border-indigo-400 rounded-lg p-3 mb-2">
                      <p className="text-sm text-indigo-700">
                        <strong>Instructions:</strong> {booking.instruction}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookedServices