import axios from 'axios';

const baseURL =
  import.meta.env.MODE === 'development'
    ? '/api/v1'
    : `${import.meta.env.VITE_API_URL}/api/v1`;

    const customFetch = axios.create({
      baseURL,
    });

export default customFetch;
