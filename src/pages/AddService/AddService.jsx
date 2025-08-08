import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useAddService } from "../../hooks/useAddService";
import PageHelmet from "../../components/PageHelmet";
import ServiceFormFields from "./ServiceFormFields";
import SubmitButton from "./SubmitButton";

const formVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 100,
    },
  },
};

const AddService = () => {
  const { form, loading, success, error, handleChange, handleSubmit } =
    useAddService();
  return (
    <div className="bg-base-200">
      <PageHelmet />
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-secondary mb-2 tracking-tight">
            Add Service
          </h1>
          <p className="text-base-content/70 text-lg">
            Fill in the details below to add a new service
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-xl"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          {error && (
            <motion.div
              className="alert bg-red-500/20 border border-red-500/30 text-red-300 py-3 px-4 rounded-lg backdrop-blur-sm"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            </motion.div>
          )}

          {success && (
            <motion.div
              className="alert bg-green-500/20 border border-green-500/30 text-green-300 py-3 px-4 rounded-lg backdrop-blur-sm"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {success}
              </div>
            </motion.div>
          )}

          <ServiceFormFields form={form} handleChange={handleChange} />

          <SubmitButton loading={loading} onSubmit={handleSubmit} />
        </motion.form>
      </div>
    </div>
  );
};

export default AddService;
