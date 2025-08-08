import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { apiService } from '../services/apiService'

export const useAddService = () => {
  const { user } = useAuth()
  const [form, setForm] = useState({
    imageUrl: '',
    name: '',
    price: '',
    area: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
    setSuccess('')
  }

  const resetForm = () => {
    setForm({
      imageUrl: '',
      name: '',
      price: '',
      area: '',
      description: ''
    })
  }

  const validateForm = () => {
    if (!form.name || !form.price || !form.area || !form.description) {
      setError('Please fill in all fields.')
      return false
    }

    if (!user) {
      setError('You must be logged in to add a service.')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (!validateForm()) {
      setLoading(false)
      return
    } try {
      const idToken = await user.getIdToken()

      const serviceData = {
        imageUrl: form.imageUrl,
        name: form.name,
        price: Number(form.price),
        area: form.area,
        description: form.description,
        provider: {
          name: user.displayName || user.name || "Unknown",
          email: user.email,
          image: user.photoURL || ""
        }
      }

      await apiService.createService(serviceData, idToken)

      setSuccess('Service added successfully!')
      resetForm()

      setTimeout(() => {
        setSuccess('')
      }, 3000)
    } catch (error) {
      console.error('Error adding service:', error)
      setError(error.message || 'Failed to add service. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return {
    form,
    loading,
    success,
    error,
    handleChange,
    handleSubmit,
    resetForm
  }
}