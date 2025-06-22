import React, { useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'motion/react'
import { FiShield, FiClock, FiAward, FiThumbsUp, FiZap, FiCheckCircle } from 'react-icons/fi'

const WhyChooseUs = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    }

    const features = [
        {
            icon: FiShield,
            title: "Verified Professionals",
            description: "All service providers are background-checked and verified for your safety and peace of mind."
        },
        {
            icon: FiClock,
            title: "24/7 Support",
            description: "Round-the-clock customer support to help you with any questions or issues you may encounter."
        },
        {
            icon: FiAward,
            title: "Quality Guarantee",
            description: "We guarantee the quality of work performed by our professionals with our satisfaction promise."
        },
        {
            icon: FiThumbsUp,
            title: "Easy Booking",
            description: "Simple and intuitive booking process that gets you connected with the right professional quickly."
        },
        {
            icon: FiZap,
            title: "Fast Response",
            description: "Quick turnaround times with most service requests being matched within 24 hours."
        },
        {
            icon: FiCheckCircle,
            title: "Secure Payments",
            description: "Safe and secure payment processing with multiple payment options for your convenience."
        }
    ]

    return (
        <motion.section
            ref={ref}
            className="py-16 bg-base-100 relative overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <div className="px-4 md:px-14 lg:px-28 container mx-auto relative z-10">
                {/* Features Section */}
                <motion.div
                    className="mb-12"
                    variants={itemVariants}
                >
                    <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                        <motion.div
                            className="inline-block mb-4"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                                <FiZap />
                                Why Choose Us
                            </span>
                        </motion.div>
                        <h2 className="max-w-lg mb-6 text-3xl font-bold leading-none tracking-tight text-base-content sm:text-4xl md:mx-auto">
                            <span className="relative inline-block">
                                <motion.span
                                    className="relative text-primary"
                                    animate={{
                                        color: ['#4f46e5', '#7c3aed', '#ec4899', '#f59e0b', '#10b981', '#4f46e5']
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                >
                                    Professional
                                </motion.span>
                            </span>{' '}
                            repair services you can trust
                        </h2>
                        <p className="text-base text-base-content/70 md:text-lg">
                            Experience reliable, high-quality repair services with verified professionals who care about your satisfaction.
                        </p>
                    </div>

                    <motion.div
                        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
                        variants={containerVariants}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="p-5 duration-300 transform bg-base-100/80 backdrop-blur-sm border border-base-300/20 rounded-xl shadow-lg hover:-translate-y-2 hover:shadow-xl"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/20"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <feature.icon className="w-6 h-6 text-primary" />
                                </motion.div>
                                <h6 className="mb-2 font-semibold leading-5 text-base-content">{feature.title}</h6>
                                <p className="text-sm text-base-content/70 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    )
}

export default WhyChooseUs