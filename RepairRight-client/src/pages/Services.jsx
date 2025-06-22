import React, { useState, useMemo, useRef, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLoaderData, useNavigate } from 'react-router'
import { FiSearch, FiX } from 'react-icons/fi'
import PageHelmet from '../components/PageHelmet'

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
}

const Services = () => {
  const services = useLoaderData()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef(null)
  const dropdownRef = useRef(null)

  const searchSuggestions = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return []

    const suggestions = []
    const addedNames = new Set()
    
    services.forEach(service => {
      if (service.name?.toLowerCase().includes(searchTerm.toLowerCase()) && !addedNames.has(service.name)) {
        suggestions.push({
          text: service.name,
          type: 'service',
          serviceId: service._id,
          service: service
        })
        addedNames.add(service.name)
      }
      
      if (service.area?.toLowerCase().includes(searchTerm.toLowerCase()) && !addedNames.has(service.area)) {
        suggestions.push({
          text: service.area,
          type: 'area',
          serviceId: null
        })
        addedNames.add(service.area)
      }
      
      if (service.provider?.name?.toLowerCase().includes(searchTerm.toLowerCase()) && !addedNames.has(service.provider.name)) {
        suggestions.push({
          text: service.provider.name,
          type: 'provider',
          serviceId: null
        })
        addedNames.add(service.provider.name)
      }
    })

    return suggestions.slice(0, 6) // Limit to 6 suggestions
  }, [services, searchTerm])

  const filteredServices = useMemo(() => {
    if (!searchTerm) return services

    return services.filter(service =>
      service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.area?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.provider?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [services, searchTerm])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setShowDropdown(true)
    setSelectedIndex(-1)
  }

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'service' && suggestion.serviceId) {
      navigate(`/services/${suggestion.serviceId}`)
    } else {
      setSearchTerm(suggestion.text)
      setShowDropdown(false)
      setSelectedIndex(-1)
    }
  }

  const handleKeyDown = (e) => {
    if (!showDropdown || searchSuggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < searchSuggestions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : searchSuggestions.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSuggestionClick(searchSuggestions[selectedIndex])
        }
        break
      case 'Escape':
        setShowDropdown(false)
        setSelectedIndex(-1)
        break
    }
  }

  const clearSearch = () => {
    setSearchTerm('')
    setShowDropdown(false)
    setSelectedIndex(-1)
  }

  const handleInputFocus = () => {
    if (searchTerm.length >= 2) {
      setShowDropdown(true)
    }
  }

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowDropdown(false)
      setSelectedIndex(-1)
    }, 200)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'service':
        return '🔧'
      case 'area':
        return '📍'
      case 'provider':
        return '👤'
      default:
        return '🔍'
    }
  }

  return (
    <div className='bg-base-200'>
      <PageHelmet />
      <div className="px-4 md:px-14 lg:px-28 container mx-auto py-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold mb-4 text-indigo-700">All Services</h2>
          <p className="text-base-content/70 mb-6">Find the perfect service for your needs</p>

          {/* Search Input with Dropdown */}
          <div className="max-w-2xl mx-auto mb-8" ref={searchRef}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-base-content/60" />
              </div>
              <input
                type="text"
                placeholder="Search services by name, description, area, or provider..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className={`w-full pl-10 pr-10 py-3 input input-bordered bg-base-100 border-base-300 text-base-content focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 rounded-lg ${
                  searchTerm ? 'text-left' : 'text-center'
                } placeholder:text-center`}
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/60 hover:text-base-content transition-colors duration-200"
                >
                  <FiX className="h-5 w-5" />
                </button>
              )}

              {/* Dropdown Suggestions */}
              <AnimatePresence>
                {showDropdown && searchSuggestions.length > 0 && (
                  <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
                  >
                    {searchSuggestions.map((suggestion, index) => (
                      <motion.button
                        key={`${suggestion.type}-${suggestion.text}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`w-full text-left px-4 py-3 hover:bg-indigo-50 border-b border-gray-100 last:border-b-0 transition-colors duration-150 ${
                          selectedIndex === index ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'
                        } cursor-pointer`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{getSuggestionIcon(suggestion.type)}</span>
                          <div className="flex-1">
                            <span className="truncate font-medium">{suggestion.text}</span>
                            {suggestion.type === 'service' && suggestion.service && (
                              <div className="text-xs text-gray-500 mt-1">
                                {suggestion.service.area} • ৳{suggestion.service.price}
                              </div>
                            )}
                          </div>
                          {suggestion.type === 'service' && (
                            <span className="text-xs text-indigo-600 font-medium">View Details</span>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Search Results Info */}
          {searchTerm && (
            <div className="mb-6 text-center">
              <p className="text-base-content/70">
                {filteredServices.length === 0
                  ? `No services found for "${searchTerm}"`
                  : `Found ${filteredServices.length} service${filteredServices.length !== 1 ? 's' : ''} for "${searchTerm}"`
                }
              </p>
            </div>
          )}
        </div>

        {/* Services List */}
        <div className="space-y-8">
          {filteredServices.length === 0 && searchTerm ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-base-content mb-2">No Services Found</h3>
              <p className="text-base-content/70 mb-4">
                We couldn't find any services matching "{searchTerm}". Try adjusting your search terms.
              </p>
              <button
                onClick={clearSearch}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
              >
                Clear Search
              </button>
            </motion.div>
          ) : (
            filteredServices.map((service, i) => (
              <motion.div
                key={service._id}
                className="bg-base-100 rounded-xl shadow p-6 flex flex-col md:flex-row gap-6 items-center"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-full h-32 md:w-1/3 md:h-52 object-cover rounded-lg"
                />
                <div className="flex-1 w-full">
                  <h3 className="text-xl font-semibold">{service.name}</h3>
                  <p className="text-base-content/70 mb-2">
                    {service.description?.length > 100
                      ? service.description.slice(0, 100) + '...'
                      : service.description}
                  </p>
                  <div className="flex items-center gap-3 mb-2">
                    {service.provider?.image ? (
                      <img
                        src={service.provider.image}
                        alt={service.provider.name}
                        className="w-8 h-8 rounded-full object-cover border-2 border-indigo-600"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                        {service.provider?.name?.charAt(0) || 'U'}
                      </div>
                    )}
                    <span className="font-medium">{service.provider?.name || 'Unknown'}</span>
                  </div>
                  <div className="text-sm text-base-content/60 mb-1">
                    <span className="font-semibold">Area:</span> {service.area}
                  </div>
                  <div className="text-lg font-bold text-indigo-600 mb-3">
                    ৳{service.price}
                  </div>
                  <Link
                    to={`/services/${service._id}`}
                    className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Services
