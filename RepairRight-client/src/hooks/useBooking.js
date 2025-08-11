import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { apiService } from '../services/apiService'
import { toastSuccess, toastError, toastWarning } from '../ui/CustomHotToast'

export const useBooking = (service) => {
    const { user } = useAuth()
    const [showModal, setShowModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [hasAlreadyBooked, setHasAlreadyBooked] = useState(false)
    const [existingBooking, setExistingBooking] = useState(null)
    const [form, setForm] = useState({
        date: '',
        instruction: ''
    })

    // Check if user has already booked this service when component mounts
    useEffect(() => {
        const checkExistingBooking = async () => {
            if (service && user) {
                try {
                    const token = await user.getIdToken()
                    const result = await apiService.checkExistingBooking(service._id, user.email, token)
                    setHasAlreadyBooked(result.hasBooked)
                    setExistingBooking(result.booking)
                } catch (error) {
                    console.error('Error checking existing booking:', error)
                }
            }
        }

        checkExistingBooking()
    }, [service, user])

    const handleBookNow = () => {
        if (hasAlreadyBooked) {
            toastWarning('⚠️ You have already booked this service!')
            return
        }
        setShowModal(true)
    }

    const handleCloseModal = () => setShowModal(false)
    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handlePurchase = async (service) => {
        // Check if user is trying to book their own service
        if (user?.email === service?.provider?.email) {
            toastError('❌ You cannot book your own service!')
            return
        }

        if (hasAlreadyBooked) {
            toastWarning('⚠️ You have already booked this service!')
            return
        }

        setIsLoading(true)
        try {
            const booking = {
                serviceId: service._id,
                serviceName: service.name,
                serviceImage: service.imageUrl,
                providerEmail: service.provider.email,
                providerName: service.provider.name,
                userEmail: user.email,
                userName: user.displayName,
                currentUserEmail: user.email, // Add this field to match server expectations
                date: form.date,
                instruction: form.instruction || '',
                price: service.price,
                serviceStatus: 'pending',
                bookedAt: new Date().toISOString()
            }

            const token = await user.getIdToken()
            await apiService.createBooking(booking, token)

            toastSuccess('🎉 Service booked successfully!')
            setShowModal(false)
            setForm({ date: '', instruction: '' })
            setHasAlreadyBooked(true) // Update state to reflect booking
        } catch (error) {
            console.error('Booking error:', error)
            if (error.message.includes('already booked')) {
                toastWarning('⚠️ You have already booked this service!')
                setHasAlreadyBooked(true)
            } else {
                toastError(`❌ Failed to book service: ${error.message}`)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return {
        showModal,
        isLoading,
        form,
        hasAlreadyBooked,
        existingBooking,
        handleBookNow,
        handleCloseModal,
        handleChange,
        handlePurchase
    }
}
