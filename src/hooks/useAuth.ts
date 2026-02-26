import { authCookies } from '@/lib/authCookies';
import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const { user, logout } = useAuthStore();
  const hasToken = authCookies.hasToken();
  const isAuthenticated = hasToken;

  return {
    user,
    logout,
    isAuthenticated,
  };
};
