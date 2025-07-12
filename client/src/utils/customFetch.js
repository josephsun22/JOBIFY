import axios from 'axios';

const baseURL =
  import.meta.env.MODE === 'development'
    ? '/api/v1'
    : `${import.meta.env.VITE_API_URL}/api/v1`;

const customFetch = axios.create({
  baseURL,
  withCredentials: true
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

export default customFetch;
