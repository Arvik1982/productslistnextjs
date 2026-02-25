import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const { user, logout } = useAuthStore();
  const isAuthenticated = !!user;

  return {
    user,
    logout,
    isAuthenticated,
  };
};
