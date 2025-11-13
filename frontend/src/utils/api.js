// API configuration and axios instance
import axios from 'axios';

// Get API URL from environment variable
// In production, this should be set in Render's environment variables
// Example: REACT_APP_API_URL=https://your-backend.onrender.com/api
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Always log API URL for debugging (helps identify configuration issues)
console.log('🔗 API Base URL:', API_URL);
console.log('🌍 Environment:', process.env.NODE_ENV || 'development');

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout (increased for Render's cold starts)
  withCredentials: false, // Don't send cookies
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
    // Always log error details for debugging
    console.error('API Error:', {
      message: error.message,
      code: error.code,
      response: error.response?.status,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      fullURL: error.config ? `${error.config.baseURL}${error.config.url}` : 'unknown',
    });

    // Enhance error message for network errors
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error' || error.code === 'ECONNREFUSED') {
      error.userMessage = `Cannot connect to backend server at ${error.config?.baseURL || API_URL}. Please check if the server is running and the API URL is configured correctly.`;
    } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      error.userMessage = `Request timeout. The server at ${error.config?.baseURL || API_URL} is taking too long to respond.`;
    }

    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Don't redirect if we're already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Export API URL for debugging
export const getApiUrl = () => API_URL;

// Health check function to test backend connectivity
export const checkBackendHealth = async () => {
  try {
    // Get base URL (remove /api if present)
    let baseURL = API_URL.replace('/api', '').replace(/\/$/, ''); // Remove trailing slash too
    
    // If API_URL is just localhost, try to construct proper URL
    if (baseURL.includes('localhost') && window.location.hostname !== 'localhost') {
      console.warn('⚠️ Using localhost API URL in production. Please set REACT_APP_API_URL environment variable.');
    }
    
    const healthUrl = `${baseURL}/health`;
    console.log('🏥 Checking backend health at:', healthUrl);
    
    const response = await axios.get(healthUrl, {
      timeout: 15000, // 15 second timeout for health check
      validateStatus: (status) => status < 500, // Accept 4xx as valid responses
    });
    
    return { 
      success: response.status === 200, 
      data: response.data,
      status: response.status,
      apiUrl: API_URL,
      healthUrl: healthUrl,
    };
  } catch (error) {
    console.error('❌ Health check failed:', {
      message: error.message,
      code: error.code,
      apiUrl: API_URL,
    });
    
    return {
      success: false,
      error: error.message || 'Network Error',
      code: error.code,
      apiUrl: API_URL,
      healthUrl: `${API_URL.replace('/api', '').replace(/\/$/, '')}/health`,
    };
  }
};

export default api;

