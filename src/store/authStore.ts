import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '@/types';
import { authApi } from '@/services/authApi';
import { authCookies } from '@/lib/authCookies';
import { errorMessages } from '@/constants/texts';

const sanitizeUser = (user: User): User => {
  const { token, accessToken, refreshToken, ...cleanUser } = user;
  return cleanUser;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });

        try {
          const userData = await authApi.login(credentials);
          authCookies.setToken(userData.accessToken);
          const cleanUser = sanitizeUser(userData);
          set({ user: cleanUser, isLoading: false, error: null });
        } catch (error) {
          set({ error: errorMessages.authError, isLoading: false });
        }
      },

      logout: () => {
        authCookies.removeToken();
        set({ user: null, error: null });
      },

      checkAuth: async () => {
        const hasToken = authCookies.hasToken();
        if (!hasToken) {
          set({ user: null });
          return false;
        }
        return true;
      },

      setUser: (user: User | null) => set({ user }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
