import { API_BASE_URL } from '@/constants/endpoints';
import { authCookies } from '@/lib/authCookies';
import axios from 'axios';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = authCookies.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      authCookies.removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
