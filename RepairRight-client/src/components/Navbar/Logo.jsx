import React from 'react'
import { Link } from 'react-router'
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react'
import { FiMenu, FiX } from 'react-icons/fi'
import logo from '/logo.png'

const Logo = ({ isMenuOpen, toggleMenu }) => {
    return (
        <div className="relative">
            {/* Mobile Logo with Menu Button */}
            <div className="lg:hidden">
                <motion.button
                    className="flex items-center text-2xl font-bold normal-case cursor-pointer -ml-2"
                    onClick={toggleMenu}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div
                        className="mr-3 p-2 rounded-lg hover:bg-base-200 transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <motion.div
                            animate={{ rotate: isMenuOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </motion.div>
                    </motion.div>

                    <motion.img
                        src={logo}
                        alt="logo"
                        className='w-10 h-10 -ml-4'
                        initial={{ rotate: -10, scale: 0.8 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover={{ rotate: 5 }}
                    />
                    <motion.span
                        className="hidden md:inline"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        Repair<span className='text-primary'>Right</span>
                    </motion.span>
                </motion.button>
            </div>

            {/* Desktop Logo */}
            <div className="hidden lg:block">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link
                        to="/"
                        className="flex items-center text-2xl font-bold normal-case cursor-pointer"
                    >
                        <motion.img
                            src={logo}
                            alt="logo"
                            className='w-16 h-16 -ml-2'
                            initial={{ rotate: -10, scale: 0.8 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            whileHover={{ rotate: 5 }}
                        />
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            Repair<span className='text-primary'>Right</span>
                        </motion.span>
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}

export default Logo
