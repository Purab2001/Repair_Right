import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const inputVariants = {
  hidden: { opacity: 0, x: -30, rotateX: -15 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const ServiceFormFields = ({ form, handleChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Image URL Field */}
      <motion.div
        custom={0}
        variants={inputVariants}
        initial="hidden"
        animate="visible"
      >
        <label className="block text-sm font-medium text-base-content mb-2">
          Image URL
        </label>
        <input
          type="url"
          name="imageUrl"
          className="input input-bordered w-full"
          placeholder="https://example.com/image.jpg"
          value={form.imageUrl}
          onChange={handleChange}
          required
        />
      </motion.div>

      {/* Service Name Field */}
      <motion.div
        custom={1}
        variants={inputVariants}
        initial="hidden"
        animate="visible"
      >
        <label className="block text-sm font-medium text-base-content mb-2">
          Service Name
        </label>
        <input
          type="text"
          name="name"
          className="input input-bordered w-full"
          placeholder="Service Name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </motion.div>

      {/* Price Field */}
      <motion.div
        custom={2}
        variants={inputVariants}
        initial="hidden"
        animate="visible"
      >
        <label className="block text-sm font-medium text-base-content mb-2">
          Price
        </label>
        <input
          type="number"
          name="price"
          className="input input-bordered w-full"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          min="0"
        />
      </motion.div>

      {/* Service Area Field */}
      <motion.div
        custom={3}
        variants={inputVariants}
        initial="hidden"
        animate="visible"
      >
        <label className="block text-sm font-medium text-base-content mb-2">
          Service Area
        </label>
        <input
          type="text"
          name="area"
          className="input input-bordered w-full"
          placeholder="e.g. Dhaka, Chattogram"
          value={form.area}
          onChange={handleChange}
          required
        />
      </motion.div>

      {/* Description Field */}
      <motion.div
        custom={4}
        variants={inputVariants}
        initial="hidden"
        animate="visible"
        className="md:col-span-2"
      >
        <label className="block text-sm font-medium text-base-content mb-2">
          Description
        </label>
        <textarea
          name="description"
          className="textarea textarea-bordered w-full resize-none"
          placeholder="Describe the service"
          value={form.description}
          onChange={handleChange}
          required
          rows={4}
        />
      </motion.div>
    </div>
  );
};

export default ServiceFormFields;
