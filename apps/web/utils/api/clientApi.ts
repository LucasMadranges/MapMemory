import axios from 'axios';

export const clientApi = axios.create({
  baseURL: '/api',
});

if (typeof window !== 'undefined') {
  clientApi.interceptors.request.use((config) => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  clientApi.interceptors.response.use(
    (response) => {
      // Si la réponse contient data.data, on remonte data directement
      if (response.data && response.data.data !== undefined) {
        response.data = response.data.data;
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
}
