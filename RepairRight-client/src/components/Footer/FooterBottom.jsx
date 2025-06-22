import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react'
import {
    FiFacebook,
    FiTwitter,
    FiInstagram,
    FiLinkedin,
    FiHeart,
    FiArrowUp
} from 'react-icons/fi'

const FooterBottom = ({ containerVariants, itemVariants }) => {
    const socialLinks = [
        { icon: FiFacebook, href: "#", color: "hover:text-blue-500" },
        { icon: FiTwitter, href: "#", color: "hover:text-sky-400" },
        { icon: FiInstagram, href: "#", color: "hover:text-pink-500" },
        { icon: FiLinkedin, href: "#", color: "hover:text-blue-600" }
    ]

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <>
            <motion.div
                className="border-t border-base-content/10"
                variants={itemVariants}
            />

            <motion.div
                className="py-6 flex flex-col md:flex-row items-center justify-between gap-4"
                variants={containerVariants}
            >
                <motion.div
                    className="flex items-center gap-2 text-base-content/70 text-sm"
                    variants={itemVariants}
                >
                    <span>© {new Date().getFullYear()} RepairRight. Made with</span>
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        <FiHeart className="text-red-500" />
                    </motion.div>
                    <span>for better repairs</span>
                </motion.div>

                <motion.div
                    className="flex items-center gap-4"
                    variants={containerVariants}
                >
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={index}
                            href={social.href}
                            className={`w-10 h-10 bg-base-100/50 rounded-lg flex items-center justify-center text-base-content/70 transition-colors ${social.color}`}
                            variants={itemVariants}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <social.icon className="text-lg" />
                        </motion.a>
                    ))}
                </motion.div>

                <motion.button
                    onClick={scrollToTop}
                    className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FiArrowUp className="text-lg" />
                </motion.button>
            </motion.div>
        </>
    )
}

export default FooterBottom
