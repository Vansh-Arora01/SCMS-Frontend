import axios, { AxiosInstance, AxiosError } from 'axios';
import { toast } from 'sonner';


// // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
// const API_BASE_URL='https://scms-1-zgii.onrender.com/api/v1' import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<{ message: string; error?: string }>) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "An error occurred";

    const currentPath = window.location.pathname;

    // ✅ Only auto-redirect for protected routes
    const isPublicRoute =
      currentPath.startsWith("/login") ||
      currentPath.startsWith("/register") ||
      currentPath.startsWith("/forgot-password") ||
      currentPath.startsWith("/reset-password") ||
      currentPath.startsWith("/verify-email") ||
      currentPath === "/";

    if (error.response?.status === 401) {
      if (!isPublicRoute) {
        window.location.href = "/login";
      }
    } else if (error.response?.status === 403) {
      window.location.href = "/unauthorized";
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;
