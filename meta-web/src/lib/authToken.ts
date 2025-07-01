// utils/authToken.ts

const ACCESS_TOKEN_KEY = "accessToken";

export const setAuthCookie = (token: string) => {
  document.cookie = `${ACCESS_TOKEN_KEY}=${token}; path=/;`;
};

export const clearAuthCookie = () => {
  document.cookie = `${ACCESS_TOKEN_KEY}`;
};
