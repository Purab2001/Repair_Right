import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react'
import { Link } from 'react-router'
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiZap,
  FiDroplet,
  FiHome,
  FiSettings,
  FiSend
} from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'

const FooterContent = ({ itemVariants, containerVariants }) => {
  const { user } = useAuth()

  const services = [
    { name: "Electrical Repair", icon: FiZap },
    { name: "Plumbing Services", icon: FiDroplet },
    { name: "Home Maintenance", icon: FiHome },
    { name: "General Repairs", icon: FiSettings }
  ]

  return (
    <motion.div
      className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      variants={containerVariants}
    >
      {/* Brand Section */}
      <motion.div
        className="lg:col-span-1"
        variants={itemVariants}
      >
        <motion.div
          className="flex items-center mb-4"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/logo.png"
              alt="RepairRight Logo"
              className="w-full h-full object-contain -ml-2"
            />
          </motion.div>
          <span className="text-xl font-bold text-base-content">RepairRight</span>
        </motion.div>

        <p className="text-base-content/70 mb-6 leading-relaxed">
          Your trusted partner for professional repair services. Connecting you with verified experts for all your home maintenance needs.
        </p>

        <motion.div
          className="space-y-3"
          variants={itemVariants}
        >
          <p className="text-sm font-semibold text-base-content">Stay Updated</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-sm flex-1 bg-base-100/50 border-base-content/20 focus:border-primary"
            />
            <motion.button
              className="btn btn-primary btn-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiSend className="text-sm" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Services Section */}
      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-semibold text-base-content mb-4">Our Services</h3>
        <ul className="space-y-3">
          {services.map((service, index) => (
            <motion.li
              key={index}
              className="flex items-center gap-2 text-base-content/70 hover:text-primary cursor-pointer transition-colors"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <service.icon className="text-sm" />
              <span className="text-sm">{service.name}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Quick Links Section */}
      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-semibold text-base-content mb-4">Quick Links</h3>
        <ul className="space-y-3">
          {user && (
            <>
              <motion.li
                className="text-base-content/70 hover:text-primary cursor-pointer transition-colors text-sm"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/add-service">Add Service</Link>
              </motion.li>
              <motion.li
                className="text-base-content/70 hover:text-primary cursor-pointer transition-colors text-sm"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/manage-service">Manage Service</Link>
              </motion.li>
              <motion.li
                className="text-base-content/70 hover:text-primary cursor-pointer transition-colors text-sm"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/booked-services">Booked Services</Link>
              </motion.li>
              <motion.li
                className="text-base-content/70 hover:text-primary cursor-pointer transition-colors text-sm"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/service-to-do">Service To-Do</Link>
              </motion.li>
            </>
          )}

          <motion.li
            className="text-base-content/70 hover:text-primary cursor-pointer transition-colors text-sm"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/about-us">About Us</Link>
          </motion.li>
          <motion.li
            className="text-base-content/70 hover:text-primary cursor-pointer transition-colors text-sm"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/terms-of-service">Terms of Service</Link>
          </motion.li>
        </ul>
      </motion.div>

      {/* Contact Section */}
      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-semibold text-base-content mb-4">Contact Us</h3>
        <div className="space-y-3">
          <motion.div
            className="flex items-center gap-3 text-base-content/70"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <FiMapPin className="text-primary text-sm" />
            </div>
            <span className="text-sm">123 Repair Street, Fix City, FC 12345</span>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 text-base-content/70"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <FiPhone className="text-primary text-sm" />
            </div>
            <span className="text-sm">+1 (555) 123-4567</span>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 text-base-content/70"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <FiMail className="text-primary text-sm" />
            </div>
            <span className="text-sm">support@repairright.com</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default FooterContent
