import { api } from './api';

export const productsApi = {
  getProducts: (limit = 12) => api.get(`/products?limit=${limit}`),

  //   getById: (id: number) => apiClient.get(`/products/${id}`),
  //   search: (query: string) => apiClient.get(`/products/search?q=${query}`),
  //   getByCategory: (category: string) => apiClient.get(`/products/category/${category}`),
};
