import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "https://iti-node-js-ecommerce.vercel.app",
    timeout: 10000, // Add timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        console.log('Token from localStorage:', {token});
        
        if (token) {
            config.headers.Authorization = `admin ${token}`;
            console.log('Authorization header set:', config.headers.Authorization);
        } else {
            console.warn('No token found in localStorage');
        }
        
        // IMPORTANT: Must return config
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response received:', response.status);
        return response;
    },
    (error) => {
        const errorMessage = error.response?.data?.status_message || error.message;
        
        // console.error('API Error Details:', {
        //     message: errorMessage,
        //     status: error.response?.status,
        //     statusText: error.response?.statusText,
        //     data: error.response?.data,
        //     url: error.config?.url,
        //     method: error.config?.method
        // });

        return Promise.reject({
            message: errorMessage,
            status: error.response?.status,
            data: error.response?.data
        });
    }
);