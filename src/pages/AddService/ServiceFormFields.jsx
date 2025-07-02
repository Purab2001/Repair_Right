import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const inputVariants = {
  hidden: { opacity: 0, x: -30, rotateX: -15 },
  visible: i => ({
    opacity: 1,
    x: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut"
    }
  })
}

const ServiceFormFields = ({ form, handleChange }) => {
  return (
    <>
      {/* Image URL Field */}
      <motion.div custom={0} variants={inputVariants} initial="hidden" animate="visible">
        <label className="block text-sm font-medium text-slate-300 mb-2">Image URL</label>
        <div className="relative group">
          <input
            type="url"
            name="imageUrl"
            className="input w-full bg-white/5 border border-white/20 text-white placeholder-slate-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 group-hover:bg-white/10"
            placeholder="https://example.com/image.jpg"
            value={form.imageUrl}
            onChange={handleChange}
            required
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </motion.div>

      {/* Service Name Field */}
      <motion.div custom={1} variants={inputVariants} initial="hidden" animate="visible">
        <label className="block text-sm font-medium text-slate-300 mb-2">Service Name</label>
        <div className="relative group">
          <input
            type="text"
            name="name"
            className="input w-full bg-white/5 border border-white/20 text-white placeholder-slate-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 group-hover:bg-white/10"
            placeholder="Service Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </motion.div>

      {/* Price Field */}
      <motion.div custom={2} variants={inputVariants} initial="hidden" animate="visible">
        <label className="block text-sm font-medium text-slate-300 mb-2">Price</label>
        <div className="relative group">
          <input
            type="number"
            name="price"
            className="input w-full bg-white/5 border border-white/20 text-white placeholder-slate-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 group-hover:bg-white/10"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
            min="0"
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </motion.div>

      {/* Service Area Field */}
      <motion.div custom={3} variants={inputVariants} initial="hidden" animate="visible">
        <label className="block text-sm font-medium text-slate-300 mb-2">Service Area</label>
        <div className="relative group">
          <input
            type="text"
            name="area"
            className="input w-full bg-white/5 border border-white/20 text-white placeholder-slate-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 group-hover:bg-white/10"
            placeholder="e.g. Dhaka, Chattogram"
            value={form.area}
            onChange={handleChange}
            required
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </motion.div>

      {/* Description Field */}
      <motion.div custom={4} variants={inputVariants} initial="hidden" animate="visible">
        <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
        <div className="relative group">
          <textarea
            name="description"
            className="textarea w-full bg-white/5 border border-white/20 text-white placeholder-slate-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 group-hover:bg-white/10 resize-none"
            placeholder="Describe the service"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </motion.div>
    </>
  )
}

export default ServiceFormFields