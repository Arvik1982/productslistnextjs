import { storage, STORAGE_KEYS } from './storage';
import { User } from '@/types';

export const storageAuth = {
  setToken: (token: string): void => {
    storage.set(STORAGE_KEYS.TOKEN_KEY, token);
  },

  getToken: (): string | null => {
    return storage.get<string>(STORAGE_KEYS.TOKEN_KEY);
  },

  removeToken: (): void => {
    storage.remove(STORAGE_KEYS.TOKEN_KEY);
  },

  setUser: (user: User): void => {
    storage.set(STORAGE_KEYS.USER_KEY, user);
  },

  getUser: (): User | null => {
    return storage.get<User>(STORAGE_KEYS.USER_KEY);
  },

  removeUser: (): void => {
    storage.remove(STORAGE_KEYS.USER_KEY);
  },

  setAuth: (token: string, user: User): void => {
    storageAuth.setToken(token);
    storageAuth.setUser(user);
  },

  clearAuth: (): void => {
    storageAuth.removeToken();
    storageAuth.removeUser();
  },

  isAuthenticated: (): boolean => {
    return !!storageAuth.getToken();
  },

  hasUser: (): boolean => {
    return !!storageAuth.getUser();
  },

  getAuth: (): { token: string | null; user: User | null } => {
    return {
      token: storageAuth.getToken(),
      user: storageAuth.getUser(),
    };
  },
};
