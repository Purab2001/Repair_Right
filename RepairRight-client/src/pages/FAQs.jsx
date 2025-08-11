import React from 'react'
import PageHelmet from '../components/PageHelmet'

const FAQs = () => {
  return (
    <>
      <PageHelmet />
      <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-16">
        <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <div>
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-primary uppercase rounded-full bg-primary/20">
                FAQs
              </p>
            </div>
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-base-content sm:text-4xl md:mx-auto">
              <span className="relative inline-block">
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                >
                  <defs>
                    <pattern
                      id="faq-pattern"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                    >
                      <circle cx="1" cy="1" r=".7" />
                    </pattern>
                  </defs>
                  <rect fill="url(#faq-pattern)" width="52" height="24" />
                </svg>
                <span className="relative">Frequently</span>
              </span>{" "}
              Asked Questions
            </h2>
            <p className="text-base text-base-content/70 md:text-lg">
              Find answers to common questions about booking, providing, and
              managing services on RepairRight.
            </p>
          </div>
        </div>
        <div className="max-w-screen-xl sm:mx-auto">
          <div className="grid grid-cols-1 gap-16 row-gap-8 lg:grid-cols-2">
            <div className="space-y-8">
              <div>
                <p className="mb-4 text-xl font-semibold">
                  How do I book a service on RepairRight?
                </p>
                <p className="text-base-content/70">
                  Browse available services, select the one you need, and click
                  "Book Now." You’ll be prompted to choose a date and provide
                  any special instructions. Once confirmed, you’ll receive a
                  booking confirmation.
                </p>
              </div>
              <div>
                <p className="mb-4 text-xl font-semibold">
                  Can I offer my own services on RepairRight?
                </p>
                <p className="text-base-content/70">
                  Yes! Register as a service provider, complete your profile,
                  and add your services. You can manage your listings and
                  bookings from your dashboard.
                </p>
              </div>
              <div>
                <p className="mb-4 text-xl font-semibold">
                  How do I manage my bookings?
                </p>
                <p className="text-base-content/70">
                  Go to the "My Bookings" section to view, track, or cancel your
                  bookings. Service providers can manage incoming requests in
                  the "Service Dashboard."
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <p className="mb-4 text-xl font-semibold">
                  What if I need to reschedule or cancel a booking?
                </p>
                <p className="text-base-content/70">
                  You can reschedule or cancel a booking from the "My Bookings"
                  page. Please note that cancellation policies may apply
                  depending on the service provider.
                </p>
              </div>
              <div>
                <p className="mb-4 text-xl font-semibold">
                  How are payments handled?
                </p>
                <p className="text-base-content/70">
                  Payments are securely processed through our platform. You’ll
                  see the total price before confirming your booking. Service
                  providers receive payments after the service is completed.
                </p>
              </div>
              <div>
                <p className="mb-4 text-xl font-semibold">
                  Who do I contact for support?
                </p>
                <p className="text-base-content/70">
                  If you need help, please visit our Contact page or email
                  support@repairright.com. Our team is here to assist you with
                  any questions or issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FAQs