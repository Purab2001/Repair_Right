import React from "react";
import { NavLink } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import {
  FiHome,
  FiTool,
  FiPlus,
  FiSettings,
  FiCalendar,
  FiCheckSquare,
} from "react-icons/fi";
import ThemeToggleButton from "./ThemeToggleButton";

const MobileMenu = ({ isMenuOpen, toggleMenu, user }) => {
  const mobileMenuItems = [
    { to: "/", label: "Home", icon: FiHome },
    { to: "/services", label: "Services", icon: FiTool },
    { to: "/faqs", label: "FAQs", icon: FiCheckSquare },
    { to: "/about", label: "About Us", icon: FiHome },
    ...(user
      ? [
          { to: "/add-service", label: "Add Service", icon: FiPlus },
          { to: "/manage-service", label: "Manage Service", icon: FiSettings },
          {
            to: "/booked-services",
            label: "Booked Services",
            icon: FiCalendar,
          },
          { to: "/service-to-do", label: "Service To-Do", icon: FiCheckSquare },
        ]
      : []),
  ];

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute top-full left-0 mt-4 w-72 bg-base-100/95 backdrop-blur-lg shadow-2xl rounded-2xl z-50 lg:hidden border border-base-300/20 overflow-hidden"
        >
          <div className="p-2">
            {mobileMenuItems.map((item, index) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <NavLink
                  to={item.to}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-primary text-primary-content shadow-lg"
                        : "hover:bg-base-200 text-base-content hover:scale-105"
                    }`
                  }
                >
                  <motion.div
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <item.icon size={20} />
                  </motion.div>
                  <span className="font-medium">{item.label}</span>
                  <motion.div
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                  >
                    <FiHome size={16} className="rotate-45" />
                  </motion.div>
                </NavLink>
              </motion.div>
            ))}

            {/* Theme Switch in Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: mobileMenuItems.length * 0.1,
                duration: 0.3,
              }}
              className="mt-4 pt-4 border-t border-base-300/30"
            >
              <div className="flex items-center justify-between px-4 py-3">
                <span className="font-medium text-base-content">Theme</span>
                <ThemeToggleButton />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
