import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { apiService } from '../../services/apiService'
import LoadingSpinner from '../../ui/LoadingSpinner'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { FiEdit, FiTrash2, FiDollarSign, FiMapPin, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router'
import PageHelmet from '../../components/PageHelmet'
import { toastSuccess, toastError } from '../../ui/CustomHotToast'
import { confirmDelete } from '../../ui/CustomSwal'
import EditServiceModal from './EditServiceModal'

const ManageService = () => {
  const { user } = useAuth()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingServiceId, setEditingServiceId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [updating, setUpdating] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = await user.getIdToken()
        const data = await apiService.getUserServices(token)
        setServices(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchServices()
    }
  }, [user])

  const handleEdit = (service) => {
    setEditingServiceId(service._id)
    setEditForm({
      name: service.name,
      price: service.price,
      area: service.area,
      description: service.description,
      imageUrl: service.imageUrl
    })
    setShowEditModal(true)
  }

  const handleCloseModal = () => {
    setShowEditModal(false)
    setEditForm({})
    setEditingServiceId(null)
  }

  const handleUpdate = async () => {
    if (!editingServiceId) return

    setUpdating(true)
    try {
      const token = await user.getIdToken()
      await apiService.updateService(editingServiceId, editForm, token)

      setServices(services.map(service =>
        service._id === editingServiceId
          ? { ...service, ...editForm }
          : service
      ))

      setShowEditModal(false)
      setEditingServiceId(null)
      toastSuccess('Service updated successfully!')
    } catch (err) {
      toastError(`Failed to update service: ${err.message}`)
    } finally {
      setUpdating(false)
    }
  }
  const handleDelete = async (serviceId, serviceName) => {
    const confirmed = await confirmDelete(`service "${serviceName}"`)

    if (confirmed) {
      try {
        const token = await user.getIdToken()
        await apiService.deleteService(serviceId, token)

        setServices(services.filter(service => service._id !== serviceId))
        toastSuccess('Service deleted successfully!')
      } catch (err) {
        toastError(`Failed to delete service: ${err.message}`)
      }
    }
  }

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    })
  }
  if (loading) return <LoadingSpinner />

  return (
    <div className='bg-base-200'>
      <PageHelmet />
      <div className="container mx-auto px-4 py-12 md:px-14 lg:px-28">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">My Services</h1>
            <p className="text-base-content/70">Manage and update your service offerings</p>
          </div>
          <Link
            to="/add-service"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 transform"
          >
            <FiPlus className="w-4 h-4" />
            Add New Service
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <span>{error}</span>
          </div>
        )}

        {services.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔧</div>
            <h3 className="text-xl font-semibold mb-2">No services yet</h3>
            <p className="text-base-content/70 mb-4">Start by adding your first service</p>
            <Link
              to="/add-service"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              <FiPlus className="w-4 h-4" />
              Add Service
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-base-100 rounded-xl shadow p-6"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-48 h-32 rounded-lg overflow-hidden bg-gray-200">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-base-content mb-1">
                          {service.name}
                        </h3>
                        <p className="text-base-content/70 flex items-center gap-1">
                          <FiMapPin className="w-4 h-4" />
                          {service.area}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-indigo-600 font-bold text-lg">
                        <FiDollarSign className="w-5 h-5" />
                        {service.price}
                      </div>
                    </div>

                    <p className="text-base-content/80 mb-4 line-clamp-3">
                      {service.description}
                    </p>

                    <div className="flex gap-3">
                      <motion.button
                        onClick={() => handleEdit(service)}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiEdit className="w-4 h-4" />
                        Edit
                      </motion.button>                    <motion.button
                        onClick={() => handleDelete(service._id, service.name)}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-red-500 text-red-500 font-medium rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiTrash2 className="w-4 h-4" />
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Edit Service Modal */}
        <EditServiceModal
          isOpen={showEditModal}
          onClose={handleCloseModal}
          editForm={editForm}
          onFormChange={handleEditChange}
          onSubmit={handleUpdate}
          isLoading={updating}
        />
      </div>
    </div>
  )
}

export default ManageService