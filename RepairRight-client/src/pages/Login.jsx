import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import Lottie from "lottie-react";
import { useAuth } from "../context/AuthContext";
import { FiMail, FiLock, FiLogIn, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import PageHelmet from "../components/PageHelmet";
import loginData from "../assets/login.json";
import { toastSuccess, toastError } from "../ui/CustomHotToast";
import Alert from "../ui/Alert";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { loginWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const result = await loginWithEmail(email, password);

    if (result.success) {
      toastSuccess(`Welcome, ${result.user?.displayName || ""}!`);
      navigate(from, { replace: true });
    } else {
      setError(result.error || "Login failed");
      toastError(result.error || "Login failed");
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    const result = await loginWithGoogle();

    if (result.success) {
      toastSuccess(`Welcome, ${result.user?.displayName || ""}!`);
      navigate(from, { replace: true });
    } else {
      setError(result.error || "Login failed");
      toastError(result.error || "Login failed");
    }

    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-base-200"
    >
      <PageHelmet />
      <div className="px-4 md:px-14 lg:px-28 container mx-auto">
        <div className="flex flex-col lg:flex-row bg-base-100/80 backdrop-blur-lg  rounded-xl overflow-hidden border border-base-300/20">
          <motion.div
            variants={itemVariants}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-primary/90"
          >
            <Lottie
              animationData={loginData}
              loop={true}
              className="w-full max-w-md"
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold text-base-content mb-2 text-center">
              Welcome Back!
            </h2>
            <p className="text-center text-base-content/70 mb-8">
              Sign in to continue to your account.
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-base-content/80 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-base-content/60" />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full pl-10 pr-3 py-2.5 input input-bordered bg-base-200/50 border-base-300 text-base-content focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-base-content/80 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-base-content/60" />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="w-full pl-10 pr-12 py-2.5 input input-bordered bg-base-200/50 border-base-300 text-base-content focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/60 hover:text-base-content transition-colors duration-200"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <Alert type="error" message={error} />

              <div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white font-semibold bg-gradient-to-r from-indigo-500 to-primary rounded-lg hover:from-indigo-400 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <FiLogIn />
                      Sign In
                    </>
                  )}
                </motion.button>
              </div>
            </form>

            <div className="divider my-6">OR</div>

            <div className="mb-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="btn btn-outline w-full font-semibold border-base-300 hover:border-primary hover:bg-primary hover:text-primary-content rounded-lg py-3 shadow-none"
              >
                <FcGoogle className="text-xl" />
                Continue with Google
              </motion.button>
            </div>

            <motion.p
              variants={itemVariants}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 text-center text-sm text-base-content/70"
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-primary hover:text-primary-focus hover:underline"
              >
                Sign Up
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
