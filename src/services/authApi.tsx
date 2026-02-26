import axios from 'axios';
import { LoginCredentials } from '@/types';
import { API_BASE_URL } from '@/constants/endpoints';

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
  },
};
