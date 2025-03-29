// utils/auth.ts
export const getToken = (): string | null => {
    // Retrieve the token from localStorage or cookies
    return localStorage.getItem('access_token') || null;
  };
  