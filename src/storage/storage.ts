export const STORAGE_KEYS = {
  TOKEN_KEY: '@token',
  USER_KEY: '@user',
};

export const storage = {
  get: <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage:`, error);
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key} to localStorage:`, error);
    }
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage:`, error);
    }
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};
