import { useLocation } from 'react-router'

export const usePageTitle = (customTitle = null) => {
    const location = useLocation()

    return getRouteMetadata(location.pathname, customTitle)
}

export const getRouteMetadata = (pathname, customTitle = null) => {
    const metadataMap = {
        '/': {
            title: 'Professional Home Repair Services',
            description: 'Connect with skilled professionals for all your home repair needs. Fast, reliable, and affordable services with verified experts.',
            keywords: 'home repair, professional services, maintenance, skilled professionals, repair experts',
        },
        '/services': {
            title: 'All Services',
            description: 'Browse all available home repair and maintenance services. Find the perfect professional for your specific needs.',
            keywords: 'repair services, home maintenance, professional services, service listings',
        },
        '/login': {
            title: 'Login',
            description: 'Sign in to your RepairRight account to access services, manage bookings, and connect with professionals.',
            keywords: 'login, sign in, account access, RepairRight',
        },
        '/register': {
            title: 'Register',
            description: 'Create your RepairRight account to book services, offer your expertise, or manage your repair business.',
            keywords: 'register, sign up, create account, join RepairRight',
        },
        '/add-service': {
            title: 'Add Service',
            description: 'Add your professional service to RepairRight. Share your expertise and connect with customers.',
            keywords: 'add service, offer service, professional service provider, business listing',
        },
        '/manage-service': {
            title: 'Manage Services',
            description: 'Manage your service listings, update information, and track your business performance.',
            keywords: 'manage services, service management, business dashboard, service updates',
        },
        '/booked-services': {
            title: 'My Bookings',
            description: 'View and manage your service bookings. Track appointment status and service progress.',
            keywords: 'bookings, appointments, service tracking, my services',
        },
        '/service-to-do': {
            title: 'Service Dashboard',
            description: 'Manage incoming service requests, update booking status, and communicate with customers.',
            keywords: 'service dashboard, service requests, booking management, customer management',
        },
        '/faqs': {
            title: 'FAQs',
            description: 'Find answers to common questions about booking, providing, and managing services on RepairRight.',
            keywords: 'faqs, frequently asked questions, help, support, RepairRight',
        },
        '/about': {
            title: 'About Us',
            description: 'Learn more about RepairRight, our mission, and our commitment to quality home repair services.',
            keywords: 'about us, company, RepairRight, mission, home repair, professional services',
        },
    }

    if (pathname.startsWith('/services/') && pathname !== '/services') {
        const baseMetadata = {
            title: 'Service Details',
            description: 'View detailed information about this service and book your appointment with a verified professional.',
            keywords: 'service details, book service, professional service, repair booking',
        }

        if (customTitle) {
            baseMetadata.title = customTitle
        }

        return baseMetadata
    }

    const metadata = metadataMap[pathname] || metadataMap['/']

    if (customTitle) {
        return {
            ...metadata,
            title: customTitle
        }
    }

    return metadata
}
