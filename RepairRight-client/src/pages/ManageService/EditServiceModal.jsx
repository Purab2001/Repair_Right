import React from 'react'
import { FiEdit, FiX, FiSave, FiImage, FiDollarSign, FiMapPin, FiFileText } from 'react-icons/fi'

const EditServiceModal = ({
    isOpen,
    onClose,
    editForm,
    onFormChange,
    onSubmit,
    isLoading
}) => {
    if (!isOpen) return null

    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-4xl w-full relative max-h-[90vh] overflow-y-auto bg-base-200 shadow-2xl">
                <button
                    onClick={onClose}
                    className="btn btn-sm btn-circle absolute right-4 top-4 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
                >
                    <FiX />
                </button>

                <div>
                    <h3 className="font-bold text-2xl mb-6 flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-xl">
                            <FiEdit className="text-primary text-xl" />
                        </div>
                        Edit Service Details
                    </h3>
                </div>

                <form onSubmit={e => { e.preventDefault(); onSubmit() }} className="space-y-6">
                    {/* Form Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <FiEdit className="text-primary" />
                                Basic Information
                            </h4>
                            <div className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Service Name *</span>
                                    </label>
                                    <input
                                        name="name"
                                        type="text"
                                        value={editForm.name || ''}
                                        onChange={onFormChange}
                                        className="input input-bordered bg-base-100 border-none focus:border-primary"
                                        required
                                        placeholder="Enter service name"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Service Area *</span>
                                    </label>
                                    <div className="relative">
                                        <FiMapPin
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-4 h-4 pointer-events-none z-10"
                                            style={{ fontSize: '16px' }}
                                        />
                                        <input
                                            name="area"
                                            type="text"
                                            value={editForm.area || ''}
                                            onChange={onFormChange}
                                            className="input input-bordered bg-base-100 border-none focus:border-primary pl-10"
                                            required
                                            placeholder="e.g., Downtown, Suburb Area"
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Price *</span>
                                    </label>
                                    <div className="relative">
                                        <FiDollarSign
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-4 h-4 pointer-events-none z-10"
                                            style={{ fontSize: '16px' }}
                                        />
                                        <input
                                            name="price"
                                            type="number"
                                            value={editForm.price || ''}
                                            onChange={onFormChange}
                                            className="input input-bordered bg-base-100 border-none focus:border-primary pl-10"
                                            required
                                            min="0"
                                            step="0.01"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Details */}
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <FiImage className="text-primary" />
                                Additional Details
                            </h4>
                            <div className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Image URL *</span>
                                    </label>
                                    <input
                                        name="imageUrl"
                                        type="url"
                                        value={editForm.imageUrl || ''}
                                        onChange={onFormChange}
                                        className="input input-bordered bg-base-100 border-none focus:border-primary"
                                        required
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Description *</span>
                                    </label>
                                    <div className="relative">
                                        <FiFileText
                                            className="absolute left-3 top-3 text-base-content/50 w-4 h-4 pointer-events-none z-10"
                                            style={{ fontSize: '16px' }}
                                        />
                                        <textarea
                                            name="description"
                                            value={editForm.description || ''}
                                            onChange={onFormChange}
                                            className="textarea textarea-bordered h-32 resize-none bg-base-100 border-none focus:border-primary pl-10 pt-3"
                                            required
                                            placeholder="Describe your service in detail..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer flex-1"
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Updating Service...
                                </>
                            ) : (
                                <>
                                    <FiSave className="mr-2 text-lg" />
                                    Save Changes
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex items-center justify-center px-6 py-3 bg-base-300 hover:bg-base-400 text-base-content font-semibold rounded-lg transition-all duration-200 cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            <div
                className="modal-backdrop bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
        </div>
    )
}

export default EditServiceModal