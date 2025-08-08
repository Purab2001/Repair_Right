import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import PageHelmet from "../components/PageHelmet";
import { FiImage, FiSave, FiUser } from "react-icons/fi";

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

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      await updateProfile({ displayName: name, photoURL });
      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setError(`Failed to update profile: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-200">
      <PageHelmet title="Profile" />
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-secondary mb-2 tracking-tight">
            Profile
          </h1>
          <p className="text-base-content/70 text-lg">
            Update your profile information below
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
              className="alert bg-red-500/10 border border-red-500/30 text-red-600 py-3 px-4 rounded-lg"
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
              className="alert bg-green-500/10 border border-green-500/30 text-green-700 py-3 px-4 rounded-lg"
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

          <div className="flex flex-col items-center gap-4">
            <img
              src={photoURL || "/user.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200 shadow"
            />
            <label className="w-full">
              <span className="block mb-1 font-medium text-base-content">
                Profile Image URL
              </span>
              <div className="relative">
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="Image URL"
                />
                <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/60" />
              </div>
            </label>
          </div>

          <label className="block">
            <span className="block mb-1 font-medium text-base-content">
              Name
            </span>
            <div className="relative">
              <input
                type="text"
                className="input input-bordered w-full pl-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
              />
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/60" />
            </div>
          </label>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed w-full justify-center cursor-pointer"
            disabled={loading}
          >
            <FiSave /> {loading ? "Saving..." : "Save Changes"}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Profile;
