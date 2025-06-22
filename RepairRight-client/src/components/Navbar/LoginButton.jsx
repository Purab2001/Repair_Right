import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const LoginButton = () => {
    return (
        <motion.button
            whileHover={{ scale: 1, boxShadow: "0 4px 24px 0 rgba(99,102,241,0.18)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 cursor-pointer"
        >
            <span className="transition-all duration-300">Login</span>
            <motion.svg
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
            >
                <path clipRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" fillRule="evenodd" />
            </motion.svg>
        </motion.button>
    );
}

export default LoginButton;