// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { AuthState, User } from '@/types';
// import { authApi } from '@/services/api';

// import axios from 'axios';
// import { storageAuth } from '@/storage/storageAuth';

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       user: storageAuth.getUser(),
//       isLoading: false,
//       error: null,

//       login: async (credentials) => {
//         set({ isLoading: true, error: null });

//         try {
//           const response = await authApi.login(credentials.username, credentials.password);
//           const userData: User = response.data;

//           // Используем специализированные методы authStorage
//           storageAuth.setAuth(userData.token, userData);

//           set({
//             user: userData,
//             isLoading: false,
//             error: null,
//           });
//         } catch (error) {
//           let errorMessage = 'Ошибка авторизации';

//           if (axios.isAxiosError(error)) {
//             errorMessage = error.response?.data?.message || 'Неверный логин или пароль';
//           }

//           set({
//             error: errorMessage,
//             isLoading: false,
//             user: null,
//           });
//         }
//       },

//       logout: () => {
//         storageAuth.clearAuth();

//         set({
//           user: null,
//           error: null,
//         });
//       },
//     }),
//     {
//       name: 'auth-storage',
//       partialize: (state) => ({ user: state.user }),
//     }
//   )
// );
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '@/types';
import { authApi } from '@/services/api';

import axios from 'axios';
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
      skipHydration: true, // ВАЖНО: отключаем автоматическую гидрацию
    }
  )
);

// Гидратируем только на клиенте, после монтирования
if (typeof window !== 'undefined') {
  // Небольшая задержка, чтобы не мешать гидратации React
  setTimeout(() => {
    const user = storage.get<User>(STORAGE_KEYS.USER_KEY);
    if (user) {
      useAuthStore.setState({ user });
    }
  }, 0);
}
