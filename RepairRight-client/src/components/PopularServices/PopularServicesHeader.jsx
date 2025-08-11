import React, { memo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const PopularServicesHeader = memo(function PopularServicesHeader() {
  return (
    <motion.div
      className="text-center mb-12"
      variants={headerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-4xl font-bold text-base-content mb-4"
      >
        Popular Services
      </motion.h2>
      <motion.p
        className="text-base-content/70 max-w-2xl mx-auto text-lg leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        viewport={{ once: true }}
      >
        Discover our most requested home repair and maintenance services with expert professionals
      </motion.p>
    </motion.div>
  );
});

export default PopularServicesHeader;