import React from 'react'
import { Link } from 'react-router'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react'
import User from '../../assets/user.png'

const UserProfile = ({ user, isProfileOpen, setIsProfileOpen, dropdownRef, handleLogout }) => {
    return (
        <div className="relative" ref={dropdownRef}>
            <motion.button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center cursor-pointer"
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
            >
                <motion.div
                    className="w-10 h-10 rounded-full overflow-hidden"
                    whileHover={{
                        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)"
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <img
                        className="w-full h-full object-cover"
                        alt={user.displayName || "User Avatar"}
                        src={user.photoURL || User}
                    />
                </motion.div>
            </motion.button>

            {/* Dropdown menu */}
            <AnimatePresence>
                {isProfileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 z-[9999] bg-base-100 divide-y divide-gray-100 rounded-lg shadow-lg w-56 border border-base-300"
                    >
                        {/* User info section */}
                        <motion.div
                            className="px-4 py-3 text-sm text-base-content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="font-medium">{user.displayName || "User"}</div>
                            <div className="font-medium truncate">{user.email || ""}</div>
                        </motion.div>

                        {/* Menu items */}
                        <motion.ul
                            className="py-2 text-sm text-base-content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                        >
                            <li>
                                <Link to="/profile" className="block px-4 py-2 hover:bg-base-200">
                                    Profile
                                </Link>
                            </li>
                        </motion.ul>
                        <motion.div
                            className="py-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-base-200 cursor-pointer"
                            >
                                Sign out
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default UserProfile
