import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '@/types';
import { authApi } from '@/services/api';
import { storage, STORAGE_KEYS } from '@/storage/storage';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login(credentials.username, credentials.password);
          const userData: User = response.data;

          storage.set(STORAGE_KEYS.TOKEN_KEY, userData.token);
          storage.set(STORAGE_KEYS.USER_KEY, userData);

          set({ user: userData, isLoading: false, error: null });
        } catch {
          set({
            error: 'Ошибка авторизации',
            isLoading: false,
            user: null,
          });
        }
      },

      logout: () => {
        storage.remove(STORAGE_KEYS.TOKEN_KEY);
        storage.remove(STORAGE_KEYS.USER_KEY);
        set({ user: null, error: null });
      },
    }),
    {
      name: 'auth-storage',
      skipHydration: true,
    }
  )
);

if (typeof window !== 'undefined') {
  setTimeout(() => {
    const user = storage.get<User>(STORAGE_KEYS.USER_KEY);
    if (user) {
      useAuthStore.setState({ user });
    }
  }, 0);
}
