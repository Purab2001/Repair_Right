import React from 'react'
import { Link } from 'react-router'
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { FiTool, FiUsers, FiShield, FiArrowRight } from 'react-icons/fi'
import headerImage from '../assets/header.jpg'

const Header = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const fadeInUpVariants = {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    }

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const imageVariants = {
        hidden: {
            opacity: 0,
            scale: 1.1
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1.2,
                ease: "easeOut"
            }
        }
    }

    return (
        <motion.div
            ref={ref}
            className="relative min-h-[50vh] lg:min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {/* Background Image */}
            <motion.div
                className="absolute inset-0 z-0"
                variants={imageVariants}
            >
                <img
                    src={headerImage}
                    alt="Professional repair services"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
            </motion.div>

            {/* Content */}
            <div className="relative z-10 px-4 md:px-14 lg:px-28 container mx-auto py-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        className="text-white space-y-2"
                        variants={fadeInUpVariants}
                    >
                        <motion.div
                            className="inline-block"
                            variants={fadeInUpVariants}
                        >
                            <span className="inline-block px-4 py-2 bg-primary backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                                🔧 RepairRight Platform
                            </span>
                        </motion.div>

                        <motion.h1
                            className="text-4xl md:text-5xl font-bold leading-tight"
                            variants={fadeInUpVariants}
                        >
                            Expert Repair Services
                            <br />
                            <motion.span
                                className="text-indigo-400"
                                animate={{
                                    color: ['#60a5fa', '#a78bfa', '#f472b6', '#fbbf24', '#34d399', '#60a5fa']
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            >
                                You Can Trust
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed"
                            variants={fadeInUpVariants}
                        >
                            Connect with skilled professionals, share your expertise, or find the perfect repair service for your needs. Our platform makes booking reliable services simple and secure.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4"
                            variants={fadeInUpVariants}
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    to="/services"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-secondary text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl group"
                                >
                                    <FiTool className="mr-2" />
                                    Browse Services
                                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                                </Link>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    to="/add-service"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-all duration-200"
                                >
                                    Offer Your Service
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            className="grid grid-cols-3 gap-8 pt-8"
                            variants={containerVariants}
                        >
                            <motion.div
                                className="text-center"
                                variants={fadeInUpVariants}
                            >
                                <div className="text-2xl md:text-3xl font-bold text-indigo-400">500+</div>
                                <div className="text-sm text-gray-300">Expert Professionals</div>
                            </motion.div>
                            <motion.div
                                className="text-center"
                                variants={fadeInUpVariants}
                            >
                                <div className="text-2xl md:text-3xl font-bold text-indigo-400">10k+</div>
                                <div className="text-sm text-gray-300">Services Completed</div>
                            </motion.div>
                            <motion.div
                                className="text-center"
                                variants={fadeInUpVariants}
                            >
                                <div className="text-2xl md:text-3xl font-bold text-indigo-400">98%</div>
                                <div className="text-sm text-gray-300">Customer Satisfaction</div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Feature Cards */}
                    <motion.div
                        className="space-y-6"
                        variants={containerVariants}
                    >
                        <motion.div
                            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
                            variants={fadeInUpVariants}
                            whileHover={{ scale: 1.02, y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                                    <FiTool className="text-white text-xl" />
                                </div>
                                <div className="text-white">
                                    <h3 className="font-semibold text-lg">Professional Services</h3>
                                    <p className="text-gray-300">Certified experts for all your repair needs</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
                            variants={fadeInUpVariants}
                            whileHover={{ scale: 1.02, y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                                    <FiUsers className="text-white text-xl" />
                                </div>
                                <div className="text-white">
                                    <h3 className="font-semibold text-lg">Trusted Community</h3>
                                    <p className="text-gray-300">Connect with verified service providers</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
                            variants={fadeInUpVariants}
                            whileHover={{ scale: 1.02, y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                                    <FiShield className="text-white text-xl" />
                                </div>
                                <div className="text-white">
                                    <h3 className="font-semibold text-lg">Quality Guaranteed</h3>
                                    <p className="text-gray-300">Satisfaction guarantee on every service</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Floating Elements */}
            <motion.div
                className="absolute top-20 left-10 w-16 h-16 bg-indigo-500/20 rounded-full blur-xl"
                animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
                animate={{
                    y: [0, 20, 0],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />
        </motion.div>
    )
}

export default Header