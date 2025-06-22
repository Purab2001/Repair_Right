import React from 'react'
import { FiUser, FiStar } from 'react-icons/fi'

const ProviderInfo = ({ provider }) => {
    return (
        <div className="bg-base-100 rounded-xl shadow overflow-hidden">
            <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-xl">
                        <FiUser className="text-primary text-xl" />
                    </div>
                    Meet Your Service Provider
                </h2>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-primary/20 ring-offset-4 ring-offset-transparent">
                            {provider.image ? (
                                <img
                                    src={provider.image}
                                    alt={provider.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                            ) : null}
                            <div
                                className="w-full h-full bg-indigo-600 flex items-center justify-center"
                                style={{ display: provider.image ? 'none' : 'flex' }}
                            >
                                <span className="text-2xl font-bold text-white">
                                    {provider.name?.charAt(0)?.toUpperCase() || 'U'}
                                </span>
                            </div>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>

                    <div className="flex-grow">
                        <h3 className="text-xl font-bold text-base-content mb-1">
                            {provider.name}
                        </h3>
                        <p className="text-base-content/70 mb-3">Certified Professional • 5+ Years Experience</p>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="flex items-center gap-2">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i}>
                                        <FiStar
                                            className={`text-lg ${i < 4 ? 'text-yellow-400 fill-current' : 'text-base-content/30'}`}
                                        />
                                    </span>
                                ))}
                                <span className="text-base-content/70 ml-2 font-medium">4.8 (127 reviews)</span>
                            </div>

                            <div className="flex gap-2">
                                <div className="badge badge-primary badge-sm">Top Rated</div>
                                <div className="badge badge-outline badge-sm">Verified</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProviderInfo
