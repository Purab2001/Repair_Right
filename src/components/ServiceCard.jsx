import React from 'react'
import { Link } from 'react-router'
import { FiMapPin, FiDollarSign, FiUser } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

const ServiceCard = ({ service }) => {
    const { user } = useAuth()
    const isOwnService = user?.email === service?.provider?.email

    return (
        <div className="card bg-base-100 shadow overflow-hidden relative">
            {isOwnService && (
                <div className="absolute top-0 left-0 bg-primary text-white px-3 py-1 text-xs font-medium rounded-br-xl z-10">
                    <FiUser className="inline mr-1" />
                    Your Service
                </div>
            )}
            <figure className="relative">
                <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="object-cover w-full h-60 rounded-t-lg"
                    loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <FiDollarSign className="text-sm text-primary" />
                    <span className="text-primary font-bold">{service.price}</span>
                </div>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{service.name}</h2>
                <p className="flex items-center gap-1 text-base-content/70 mb-1">
                    <FiMapPin className="text-sm" />
                    {service.area}
                </p>
                <p className="line-clamp-3 text-base-content/80 text-sm mb-2">
                    {service.description}
                </p>
                <div className="card-actions justify-end">
                    <Link
                        to={`/services/${service._id}`}
                        className={`btn btn-primary btn-sm ${isOwnService ? 'btn-outline' : ''}`}
                    >
                        {isOwnService ? 'View Details' : 'Book Now'}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard
