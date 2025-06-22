import React, { memo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ServiceTableRow from './ServiceTableRow';

const tableVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

const ServicesTable = memo(function ServicesTable({ services, onViewDetail }) {
  return (
    <motion.div
      className="overflow-x-auto mb-12 rounded-lg shadow-lg scrollbar-hide"
      variants={tableVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      <table className="table w-full">
        <thead>
          <tr className="bg-indigo-600 text-primary-content">
            <th className="text-left py-5 px-6 font-bold text-base">Service</th>
            <th className="text-left py-5 px-6 font-bold text-base">Description</th>
            <th className="text-left py-5 px-6 font-bold text-base">Provider</th>
            <th className="text-left py-5 px-6 font-bold text-base">Price</th>
            <th className="text-center py-5 px-6 font-bold text-base">Action</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, i) => (
            <ServiceTableRow
              key={service._id}
              service={service}
              index={i}
              onViewDetail={onViewDetail}
            />
          ))}
        </tbody>
      </table>
    </motion.div>
  );
});

export default ServicesTable;