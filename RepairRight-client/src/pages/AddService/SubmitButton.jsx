import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const buttonVariants = {
  idle: { scale: 1 },
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 30px rgba(79, 70, 229, 0.4)",
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
}

const SubmitButton = ({ loading, onSubmit }) => {
  return (
    <motion.button
      type="submit"
      onClick={onSubmit}
      className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      variants={buttonVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      disabled={loading}
    >
      <div className="flex items-center justify-center gap-3 relative z-10 cursor-pointer">
        {loading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </motion.div>
            <span>Adding Service...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Service</span>
          </>
        )}
      </div>

      {/* Button shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  )
}

export default SubmitButton