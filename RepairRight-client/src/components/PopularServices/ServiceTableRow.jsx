import React, { memo, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaEye, FaUser } from 'react-icons/fa';

const tableRowVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const ServiceTableRow = memo(function ServiceTableRow({ service, index, onViewDetail }) {
  // Memoize truncated description for performance
  const description = useMemo(() => {
    const maxLength = 100;
    return service.description.length > maxLength
      ? service.description.substring(0, maxLength) + '...'
      : service.description;
  }, [service.description]);

  return (
    <motion.tr
      key={service._id}
      variants={tableRowVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.1 }}
      className="hover"
    >
      <td className="py-4 px-6">
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-16 h-16">
              <img
                src={service.imageUrl}
                alt={service.serviceName}
                loading="lazy"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{service.serviceName}</div>
            <div className="text-xs opacity-70">{service.serviceArea}</div>
          </div>
        </div>
      </td>
      <td className="py-4 px-6 max-w-xs">
        <span className="text-sm opacity-90">
          {description}
        </span>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          {service.provider?.image ? (
            <img
              src={service.provider.image}
              alt={service.provider.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-600"
              loading="lazy"
            />
          ) : (
            <div className="rounded-full bg-indigo-600 p-3 text-white">
              <FaUser />
            </div>
          )}
          <div>
            <div className="font-bold">{service.provider?.name || "Unknown"}</div>
            <div className="text-xs badge badge-success badge-outline">
              {"Verified"}
            </div>
          </div>
        </div>
      </td>
      <td className="py-4 px-6 font-bold text-lg">
        <div>
          ৳{service.price}
        </div>
      </td>
      <td className="py-4 px-6 text-center">
        <motion.button
          onClick={() => onViewDetail(service._id)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium text-sm shadow-md cursor-pointer"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 25px -5px rgba(var(--p)/0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10
          }}
        >
          <span className="hidden lg:inline">View Details</span>
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="text-base"
          >
            <FaEye />
          </motion.div>
        </motion.button>
      </td>
    </motion.tr>
  );
});

export default ServiceTableRow;