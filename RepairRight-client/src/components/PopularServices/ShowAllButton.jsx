import React, { memo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const buttonVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2
    }
  }
};

const ShowAllButton = memo(function ShowAllButton({ onClick }) {
  return (
    <motion.div
      className="text-center"
      variants={buttonVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.button
        onClick={onClick}
        className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 rounded-xl font-semibold text-lg shadow-lg cursor-pointer text-white"
        whileHover={{
          scale: 1.05,
          boxShadow: "0 15px 30px -5px rgba(99, 102, 241, 0.5)",
          y: -2
        }}
        whileTap={{ scale: 0.97 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15
        }}
      >
        <span>Show All Services</span>
        <motion.div
          initial={{ x: 0 }}
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <FaArrowRight />
        </motion.div>
      </motion.button>
    </motion.div>
  );
});

export default ShowAllButton;