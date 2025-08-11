import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import PageHelmet from "../components/PageHelmet";
import { FiImage, FiSave, FiUser } from "react-icons/fi";
import Button from "../ui/Button";
import { toastError, toastSuccess } from "../ui/CustomHotToast";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile({ displayName: name, photoURL });
      toastSuccess("Profile updated successfully!");
    } catch (err) {
      toastError(`Failed to update profile: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
          className="space-y-6 bg-white rounded-xl"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Custom alert using toast, so no inline alert needed */}

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

          <Button type="submit" loading={loading} fullWidth icon={<FiSave />}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </motion.form>
      </div>
    </div>
  );
};

export default Profile;
