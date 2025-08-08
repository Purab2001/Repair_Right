import React from 'react'
import { FiUser, FiCalendar, FiX, FiCheckCircle } from 'react-icons/fi'

const BookingModal = ({ isOpen, onClose, service, user, formData, onFormChange, onSubmit, isLoading }) => {
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
              <FiCheckCircle className="text-primary text-xl" />
            </div>
            Complete Your Booking
          </h3>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="space-y-5"
        >
          {/* Service Summary Card */}
          <div className="bg-primary/10 p-6 rounded-2xl border border-primary/20">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={service.imageUrl}
                alt={service.name}
                className="w-16 h-16 object-cover rounded-xl"
              />
              <div>
                <h4 className="font-bold text-lg">{service.name}</h4>
                <p className="text-base-content/70">
                  by {service.provider.name}
                </p>
              </div>
              <div className="ml-auto text-right">
                <div className="text-2xl font-bold text-primary">
                  ${service.price}
                </div>
                <div className="text-sm text-base-content/70">Service Fee</div>
              </div>
            </div>
          </div>

          {/* Form Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Information */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <FiUser className="text-primary" />
                Your Information
              </h4>
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Email Address
                    </span>
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="input input-bordered bg-white/5 border-white/20"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Full Name</span>
                  </label>
                  <input
                    type="text"
                    value={user.displayName}
                    disabled
                    className="input input-bordered bg-white/5 border-white/20"
                  />
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <FiCalendar className="text-primary" />
                Booking Details
              </h4>
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Service Date *
                    </span>
                  </label>
                  <input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={onFormChange}
                    className="input input-bordered bg-base-100 border-none focus:border-primary"
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Special Instructions
                    </span>
                    <span className="label-text-alt">(Optional)</span>
                  </label>
                  <textarea
                    name="instruction"
                    placeholder="Address, specific requirements, or special notes..."
                    value={formData.instruction}
                    onChange={onFormChange}
                    className="textarea textarea-bordered h-24 resize-none bg-base-100 border-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !formData.date}
            className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer w-full"
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Processing Booking...
              </>
            ) : (
              <>
                <FiCheckCircle className="mr-2 text-lg" />
                Confirm Booking - ${service.price}
              </>
            )}
          </button>
        </form>
      </div>

      <div
        className="modal-backdrop bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
    </div>
  );
}

export default BookingModal