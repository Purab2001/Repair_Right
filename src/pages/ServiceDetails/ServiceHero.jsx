import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { FiMapPin, FiCalendar, FiDollarSign, FiClock, FiShield, FiAward, FiUser, FiCheck } from 'react-icons/fi'

const ServiceHero = ({ service, onBookNow, isServiceProvider, hasAlreadyBooked, existingBooking }) => {
    return (
      <div className="rounded-xl shadow bg-base-100 overflow-hidden mb-6 grid grid-cols-1 xl:grid-cols-2">
        <div className="xl:col-span-1 relative group">
          <div className="relative overflow-hidden h-72 md:h-96 xl:h-full">
            <img
              src={service.imageUrl}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2">
              <div className="flex items-center gap-2 text-white">
                <FiDollarSign className="text-lg" />
                <span className="text-xl font-bold">${service.price}</span>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 flex gap-2">
              <div className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                Professional Service
              </div>
              <div className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm border border-white/20">
                <FiShield className="inline mr-1" />
                Verified
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 p-8 flex flex-col">
          <div className="space-y-6 flex flex-col flex-grow">
            <div>
              <div className="flex items-center gap-2 text-primary mb-2">
                <FiMapPin className="text-lg" />
                <span className="text-sm font-medium">{service.area}</span>
              </div>
              <h1 className="text-3xl xl:text-4xl font-bold text-base-content leading-tight">
                {service.name}
              </h1>
            </div>
            <p className="text-base-content/80 leading-relaxed text-lg">
              {service.description}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10">
                <FiClock className="text-primary text-2xl mx-auto mb-2" />
                <div className="text-sm text-base-content/70">
                  Quick Service
                </div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10">
                <FiAward className="text-primary text-2xl mx-auto mb-2" />
                <div className="text-sm text-base-content/70">
                  Quality Assured
                </div>
              </div>{" "}
            </div>{" "}
            {isServiceProvider ? (
              <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                <div className="flex items-center gap-2 text-info mb-2">
                  <FiUser className="text-lg" />
                  <span className="font-medium">This is your service</span>
                </div>
                <p className="text-sm text-base-content/70">
                  You cannot book your own service. You can manage it from the
                  <a
                    href="/manage-service"
                    className="text-primary hover:underline ml-1"
                  >
                    Manage Services
                  </a>{" "}
                  page.
                </p>
              </div>
            ) : hasAlreadyBooked ? (
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <div className="flex items-center gap-2 text-success mb-2">
                  <FiCheck className="text-lg" />
                  <span className="font-medium">Already Booked</span>
                </div>
                <p className="text-sm text-base-content/70">
                  You have already booked this service
                  {existingBooking?.date &&
                    ` for ${new Date(
                      existingBooking.date
                    ).toLocaleDateString()}`}
                  . Check your bookings in your profile.
                </p>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBookNow}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <FiCalendar className="mr-2 text-lg" />
                Book This Service
              </motion.button>
            )}
          </div>
        </div>
      </div>
    );
}

export default ServiceHero
