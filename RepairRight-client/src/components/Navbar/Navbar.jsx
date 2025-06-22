import React, { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router'
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react'
import { useAuth } from '../../context/AuthContext'
import { confirmLogout } from '../../ui/CustomSwal'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import DesktopMenu from './DesktopMenu'
import UserProfile from './UserProfile'
import LoginButton from './LoginButton'
import Switch from './Switch'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleLogout = async () => {
    const confirmed = await confirmLogout()
    if (!confirmed) return
    try {
      await logout()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative"
    >
      <motion.div
        className="navbar bg-base-100 px-4 md:px-14 lg:px-28 container mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Logo and Mobile Menu */}
        <motion.div
          className="navbar-start"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Logo
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
          />
          <MobileMenu
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            user={user}
          />
        </motion.div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <DesktopMenu user={user} />
        </div>

        {/* User Profile and Actions */}
        <motion.div
          className="navbar-end"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            className="mr-4 hidden lg:block"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Switch />
          </motion.div>

          {user ? (
            <UserProfile
              user={user}
              isProfileOpen={isProfileOpen}
              setIsProfileOpen={setIsProfileOpen}
              dropdownRef={dropdownRef}
              handleLogout={handleLogout}
              onProfileClick={() => navigate('/profile')}
            />
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink to="/login">
                <LoginButton />
              </NavLink>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </motion.div>
  )
}

export default Navbar