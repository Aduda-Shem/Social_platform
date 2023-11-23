const TOKEN_STORAGE_KEY = 'token';

export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  return token !== null;
};

export const login = (tokenData) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokenData));
};

export const logout = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const getAuthToken = () => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  return token ? JSON.parse(token) : null;
};
