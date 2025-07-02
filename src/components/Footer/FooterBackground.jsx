import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react'
import { FiShield } from 'react-icons/fi'

const FooterBackground = ({ isInView }) => {
    return (
        <>
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
                <motion.div
                    className="absolute top-10 left-10 w-20 h-20 border-2 border-primary/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute bottom-10 right-10 w-16 h-16 border-2 border-secondary/20 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <motion.div
                className="absolute top-6 right-6 flex items-center gap-2 bg-base-100/80 backdrop-blur-sm px-3 py-2 rounded-full text-xs font-semibold text-base-content border border-base-content/10"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <FiShield className="text-green-500" />
                <span>Trusted & Secure</span>
            </motion.div>
        </>
    )
}

export default FooterBackground
