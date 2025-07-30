import axios from 'axios';

const baseURL = 'http://localhost:8000/api';

const axiosInstance = axios.create({
  baseURL,
});

// Add token to request headers only if it's a protected route
axiosInstance.interceptors.request.use((config) => {
  const access = localStorage.getItem('access');

  // Avoid attaching Authorization to login or signup requests
  if (!config.url.includes('/login') && !config.url.includes('/signup')) {
    if (access && access !== 'null') {
      config.headers['Authorization'] = `Bearer ${access}`;
    }
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle 401 errors and refresh tokens
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and it's not already retried
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem('refresh');
      if (refresh && refresh !== 'null') {
        try {
          const res = await axios.post(`${baseURL}/refresh/`, { refresh });

          const newAccess = res.data.access;
          localStorage.setItem('access', newAccess);

          // Attach new access token to retry request
          originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Clear tokens and redirect to login
          localStorage.clear();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        localStorage.clear();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
