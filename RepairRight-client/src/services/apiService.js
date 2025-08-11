import axios from 'axios';

const API_BASE_URL = 'https://repair-right-server.vercel.app';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.error || error.message || 'An error occurred';
        throw new Error(message);
    }
);

export const apiService = {
    // Check if user has already booked a service
    checkExistingBooking: async (serviceId, userEmail, token) => {
        return api.get(`/bookings/check/${serviceId}/${userEmail}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    // Booking endpoints
    createBooking: async (bookingData, token) => {
        return api.post('/bookings', bookingData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    getUserBookings: async (token) => {
        return api.get('/my-bookings', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    getProviderBookings: async (token) => {
        return api.get('/service-to-do', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    updateBookingStatus: async (bookingId, status, token) => {
        return api.patch(`/bookings/${bookingId}/status`,
            { serviceStatus: status },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    },

    // Service endpoints
    getServices: async () => {
        return api.get('/services');
    },

    getService: async (id) => {
        return api.get(`/services/${id}`);
    },

    createService: async (serviceData, token) => {
        return api.post('/services', serviceData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    getUserServices: async (token) => {
        return api.get('/my-services', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    updateService: async (id, serviceData, token) => {
        return api.put(`/services/${id}`, serviceData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    deleteService: async (id, token) => {
        return api.delete(`/services/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};
