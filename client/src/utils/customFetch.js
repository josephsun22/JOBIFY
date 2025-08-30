import axios from 'axios';

const baseURL =
  import.meta.env.MODE === 'development'
    ? '/api/v1'
    : `${import.meta.env.VITE_API_URL}/api/v1`;

const customFetch = axios.create({
  baseURL,
  withCredentials: true,
});

customFetch.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Centralized 401 handling
customFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      try {
        localStorage.removeItem('token');
      } catch {}
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('auth:logout'));
      }
    }
    return Promise.reject(error);
  }
);

export default customFetch;
