import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import Lottie from 'lottie-react'
import { useAuth } from '../context/AuthContext'
import { FaUser, FaEnvelope, FaLock, FaImage } from 'react-icons/fa'
import { FiEye, FiEyeOff, FiUserPlus } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import PageHelmet from '../components/PageHelmet'
import registerData from '../assets/register.json'
import { swalRegisterSuccess } from '../ui/CustomSwal'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
}

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 }
}

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photoURL: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { register, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { name, email, password, photoURL } = formData

    if (!name || !email || !password) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    if (name.length < 2) {
      setError('Name must be at least 2 characters long')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    if (photoURL && photoURL.trim()) {
      try {
        new URL(photoURL)
      } catch {
        setError('Please enter a valid photo URL')
        setLoading(false)
        return
      }
    }

    const result = await register(name, email, password, photoURL.trim() || null)

    if (result.success) {
      await swalRegisterSuccess(name)
      navigate('/')
    } else {
      setError(result.error)
    }

    setLoading(false)
  }

  const handleGoogleSignup = async () => {
    setError('')
    setLoading(true)

    const result = await loginWithGoogle()

    if (result.success) {
      navigate('/')
    } else {
      setError(result.error)
    }

    setLoading(false)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="py-6 flex items-center justify-center bg-base-200"
    >
      <PageHelmet />
      <div className="px-4 md:px-14 lg:px-28 container mx-auto">
        <div className="flex flex-col lg:flex-row bg-base-100/80 backdrop-blur-lg  rounded-xl overflow-hidden border border-base-300/20">
          <motion.div
            variants={itemVariants}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-6 bg-primary/90"
          >
            <Lottie
              animationData={registerData}
              loop={true}
              className="w-full max-w-xs lg:max-w-sm"
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full lg:w-1/2 p-4 lg:p-6 flex flex-col justify-center overflow-y-auto"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-base-content mb-1 text-center">Create Account</h2>
            <p className='text-center text-base-content/70 mb-4'>Join us today and start your journey.</p>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-base-content/80 mb-1">
                  Full Name <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-base-content/60" />
                  </span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="w-full pl-10 pr-3 py-2 input input-bordered bg-base-200/50 border-base-300 text-base-content focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-base-content/80 mb-1">
                  Email Address <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-base-content/60" />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full pl-10 pr-3 py-2 input input-bordered bg-base-200/50 border-base-300 text-base-content focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-base-content/80 mb-1">
                  Password <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-base-content/60" />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="w-full pl-10 pr-12 py-2 input input-bordered bg-base-200/50 border-base-300 text-base-content focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200"
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
                <p className="text-xs text-base-content/70 mt-1">
                  Password must be at least 6 characters long
                </p>
              </div>

              {/* Photo URL Field */}
              <div>
                <label htmlFor="photoURL" className="block text-sm font-medium text-base-content/80 mb-1">
                  Photo URL (Optional)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaImage className="text-base-content/60" />
                  </span>
                  <input
                    id="photoURL"
                    name="photoURL"
                    type="url"
                    className="w-full pl-10 pr-3 py-2 input input-bordered bg-base-200/50 border-base-300 text-base-content focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200"
                    placeholder="https://example.com/your-photo.jpg"
                    value={formData.photoURL}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="alert alert-error py-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}

              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-white font-semibold bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg hover:from-indigo-400 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    <>
                      <FiUserPlus />
                      Create Account
                    </>
                  )}
                </motion.button>
              </div>
            </form>

            <div className="divider my-3">OR</div>

            <div className="mb-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleGoogleSignup}
                disabled={loading}
                className="btn btn-outline w-full font-semibold border-base-300 hover:border-indigo-600 hover:bg-indigo-600 hover:text-primary-content shadow-none py-3 rounded-lg"
              >
                <FcGoogle className="text-lg" />
                Continue with Google
              </motion.button>
            </div>

            <motion.p
              variants={itemVariants}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-3 text-center text-sm text-base-content/70"
            >
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:text-primary-focus hover:underline">
                Sign In
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default Register