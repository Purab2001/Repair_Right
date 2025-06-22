import React from 'react'
import { Link } from 'react-router'
import { FiMapPin, FiDollarSign, FiUser } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

const ServiceCard = ({ service }) => {
    const { user } = useAuth()
    const isOwnService = user?.email === service?.provider?.email

    return (
        <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {isOwnService && (
                <div className="bg-primary text-white px-3 py-1 text-xs font-medium">
                    <FiUser className="inline mr-1" />
                    Your Service
                </div>
            )}

            <div className="relative h-48 overflow-hidden">
                <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-primary font-bold flex items-center gap-1">
                        <FiDollarSign className="text-sm" />
                        {service.price}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-semibold text-base-content mb-2 line-clamp-2">
                    {service.name}
                </h3>

                <p className="text-base-content/70 mb-3 flex items-center gap-1">
                    <FiMapPin className="text-sm" />
                    {service.area}
                </p>

                <p className="text-base-content/80 text-sm mb-4 line-clamp-3">
                    {service.description}
                </p>

                <div className="flex justify-between items-center">
                    <div className="text-sm text-base-content/60">
                        by {service.provider?.name}
                    </div>
                    <Link
                        to={`/services/${service._id}`}
                        className={`btn btn-sm ${isOwnService ? 'btn-outline btn-primary' : 'btn-primary'}`}
                    >
                        {isOwnService ? 'View Details' : 'Book Now'}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard
