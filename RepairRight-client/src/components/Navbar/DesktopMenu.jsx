import React from 'react'
import { NavLink } from 'react-router'
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react'

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

            {user && (
                <li>
                    <motion.button
                        className="text-base-content bg-base-100 hover:bg-base-200 focus:ring-4 focus:outline-none focus:ring-base-300 font-medium rounded-lg text-md px-3 py-2 text-center inline-flex items-center gap-2"
                        popoverTarget="dashboard-dropdown"
                        style={{ anchorName: "--dashboard-anchor" }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                        Dashboard
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
                        <motion.li whileHover={{ scale: 1.02 }} transition={{ duration: 0.1 }}>
                            <NavLink to="/add-service" className="flex items-center gap-3 p-3 rounded-md hover:bg-primary hover:text-primary-content transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add Service
                            </NavLink>
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.02 }} transition={{ duration: 0.1 }}>
                            <NavLink to="/manage-service" className="flex items-center gap-3 p-3 rounded-md hover:bg-primary hover:text-primary-content transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                                Manage Service
                            </NavLink>
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.02 }} transition={{ duration: 0.1 }}>
                            <NavLink to="/booked-services" className="flex items-center gap-3 p-3 rounded-md hover:bg-primary hover:text-primary-content transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                Booked Services
                            </NavLink>
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.02 }} transition={{ duration: 0.1 }}>
                            <NavLink to="/service-to-do" className="flex items-center gap-3 p-3 rounded-md hover:bg-primary hover:text-primary-content transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Service To-Do
                            </NavLink>
                        </motion.li>
                    </motion.ul>
                </li>
            )}
        </ul>
    )
}

export default DesktopMenu
