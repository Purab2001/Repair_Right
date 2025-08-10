import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { toastError } from '../ui/CustomHotToast';

export const useApi = (apiCall, dependencies = [], options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {
        onSuccess,
        onError,
        showErrorToast = true,
        immediate = true
    } = options;

    const execute = async (...args) => {
        try {
            setLoading(true);
            setError(null);

            const result = await apiCall(...args);
            setData(result);

            if (onSuccess) {
                onSuccess(result);
            }

            return result;
        } catch (err) {
            setError(err);

            if (showErrorToast) {
                toastError(err.message || 'An error occurred');
            }

            if (onError) {
                onError(err);
            }

            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (immediate && apiCall) {
            execute();
        }
    }, dependencies);

    return {
        data,
        loading,
        error,
        execute,
        refetch: execute
    };
};

// Specific hooks for common operations
export const useServices = () => {
    return useApi(() => apiService.getServices(), []);
};

export const useService = (id) => {
    return useApi(() => apiService.getService(id), [id], {
        immediate: !!id
    });
};

export const useMyServices = () => {
    return useApi(() => apiService.getUserServices(), []);
};

export const useMyBookings = () => {
    return useApi(() => apiService.getUserBookings(), []);
};

export const useServiceToDo = () => {
    return useApi(() => apiService.getProviderBookings(), []);
};
