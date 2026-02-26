import axios from 'axios';
import { API_BASE_URL } from '@/constants/endpoints';
import { storageAuth } from '@/storage/storageAuth';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = storageAuth.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storageAuth.clearAuth();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (username: string, password: string) => api.post('/auth/login', { username, password }),
};

export const productsApi = {
  getProducts: (limit: number = 12) => api.get(`/products?limit=${limit}`),
};
