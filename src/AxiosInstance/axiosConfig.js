import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "https://iti-node-js-ecommerce.vercel.app",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

axiosInstance.interceptors.request.use(
    (config) => {

        console.log('📤 Request interceptor:', {
            method: config.method?.toUpperCase(),
            url: `${config.baseURL}${config.url}`,
            data: config.data
        });

        // Only add auth header for non-login requests
        if (!config.url.includes('/auth/login')) {
            const token = localStorage.getItem('authToken');
            console.log('Token from localStorage:', token ? '***exists***' : 'null');

            if (token) {
                config.headers.Authorization = `admin ${token}`;
                console.log('Authorization header added');
            } else {
                console.warn('No token found in localStorage for protected route');
            }
        } else {
            console.log('Login request - skipping auth header');
        }

        return config;
    },
    (error) => {
        console.error('❌ Request interceptor error:', error);
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        console.log('📥 Response interceptor - Success:', {
            status: response.status,
            url: response.config.url,
            dataType: typeof response.data
        });
        return response;
    },
    (error) => {
        console.error('📥 Response interceptor - Error:', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            url: error.config?.url,
            errorData: error.response?.data
        });

        // Don't modify the error structure too much
        // Let the original axios error through with some enhancements
        if (error.response) {
            // Add custom message but keep original structure
            const customMessage = error.response.data?.message ||
                error.response.data?.error ||
                error.response.statusText ||
                'Request failed';

            error.customMessage = customMessage;
        }

        return Promise.reject(error);
    }
);

export default axiosInstance