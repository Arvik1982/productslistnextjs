import Cookies from 'js-cookie';

const TOKEN_KEY = 'token';

export const authCookies = {
  setToken: (token: string) => {
    Cookies.set(TOKEN_KEY, token, { expires: 7, path: '/' });
  },
  getToken: () => Cookies.get(TOKEN_KEY) || null,
  removeToken: () => Cookies.remove(TOKEN_KEY, { path: '/' }),
  hasToken: () => !!Cookies.get(TOKEN_KEY),
};
