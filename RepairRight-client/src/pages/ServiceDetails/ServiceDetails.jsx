import React from 'react'
import { useLoaderData } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import PageHelmet from '../../components/PageHelmet'
import LoadingSpinner from '../../ui/LoadingSpinner'
import BookingModal from './BookingModal'
import ServiceHero from './ServiceHero'
import ProviderInfo from './ProviderInfo'
import { useBooking } from '../../hooks/useBooking'

const ServiceDetails = () => {
  const service = useLoaderData()
  const { user } = useAuth()
  const {
    showModal,
    isLoading,
    form,
    hasAlreadyBooked,
    existingBooking,
    handleBookNow,
    handleCloseModal,
    handleChange,
    handlePurchase
  } = useBooking(service)

  const isServiceProvider = user?.email === service?.provider?.email
  if (!service) return <LoadingSpinner />

  return (
    <div className="bg-base-200">
      <PageHelmet
        customTitle={service?.serviceName}
        customDescription={`${service?.serviceName} - ${service?.description} Price: $${service?.price}`}
      />
      <div className="container mx-auto px-4 py-12 md:px-14 lg:px-28 relative z-10">
        <ServiceHero
          service={service}
          onBookNow={handleBookNow}
          isServiceProvider={isServiceProvider}
          hasAlreadyBooked={hasAlreadyBooked}
          existingBooking={existingBooking}
        />
        <ProviderInfo provider={service.provider} />
      </div>

      {!isServiceProvider && (
        <BookingModal
          isOpen={showModal}
          onClose={handleCloseModal}
          service={service}
          user={user}
          formData={form}
          onFormChange={handleChange}
          onSubmit={() => handlePurchase(service)}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

export default ServiceDetails