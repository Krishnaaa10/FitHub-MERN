// API configuration and axios instance
import axios from 'axios';

// Get API URL from environment variable
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Log API URL in development for debugging (will be removed in production build)
if (process.env.NODE_ENV === 'development') {
  console.log('🔗 API Base URL:', API_URL);
}

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error details in development
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', {
        message: error.message,
        code: error.code,
        response: error.response?.status,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
      });
    }

    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Export API URL for debugging
export const getApiUrl = () => API_URL;

// Health check function to test backend connectivity
export const checkBackendHealth = async () => {
  try {
    const baseURL = API_URL.replace('/api', ''); // Remove /api for health check
    const response = await axios.get(`${baseURL}/health`, {
      timeout: 5000,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      code: error.code,
      apiUrl: API_URL,
    };
  }
};

export default api;

