import axios, { AxiosError } from "axios";

// Define the expected error response structure
interface ErrorResponse {
  message?: string;
  error?: string;
}

// Create an axios instance with default configurations
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add authentication headers here if needed
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { response } = error;
    
    let errorMessage = "An unexpected error occurred";
    
    if (response) {
      const responseData = response.data as ErrorResponse;
      console.log(responseData);
      return Promise.reject(responseData?.error)
    } else if (error.request) {
      errorMessage = "Network error: No response from server";
    }
    
    const enhancedError = new Error(errorMessage);
    
    return Promise.reject(enhancedError);
  }
);

export default api;
