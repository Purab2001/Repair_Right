import { apiService } from '../services/apiService';

// Service loaders
export const serviceLoader = async ({ params }) => {
    try {
        const service = await apiService.getService(params.id);
        return service;
    } catch (error) {
        console.error('Failed to load service:', error);
        throw new Response('Service not found', { status: 404 });
    }
};

export const servicesLoader = async () => {
    try {
        const services = await apiService.getServices();
        return services;
    } catch (error) {
        console.error('Failed to load services:', error);
        return [];
    }
};
