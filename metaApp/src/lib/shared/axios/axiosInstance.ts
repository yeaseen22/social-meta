import axios, { InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../../../redux/store';
import { setCredentials, clearCredentials } from '../../../redux/slice/auth.slice';
import Toast from 'react-native-toast-message';

declare global {
  var navigationRef: {
    current: {
      navigate: (screen: string) => void;
    };
  };
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}


// Asad MacBook IP - 192.168.0.101
// Asad Desktop IP - 192.168.0.106
const API_URL = process.env.REACT_PUBLIC_API_URL ?? 'http://192.168.0.104:8080/api/v1';


let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

const waitForRefresh = () =>
  new Promise<string | null>((resolve, reject) => {
    const interval = setInterval(() => {
      if (!isRefreshing) {
        clearInterval(interval);
        resolve(AsyncStorage.getItem('accessToken'));
      }
    }, 200);
  });


// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});


// Attach Access Token to Request Headers
// region Request Interceptor
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = store.getState().auth.accessToken;

      // Fallback to AsyncStorage if Redux token doesn't exist
      const accessToken = token ?? await AsyncStorage.getItem('accessToken');

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.error('Error attaching token to request:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);



// Handle Refresh Token Mechanism
// region Response Interceptor

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('🔁 Attempting token refresh...');


      // If already refreshing, wait for it to complete
      if (isRefreshing) {
        const newAccessToken = await waitForRefresh();
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } else {
          //  Refresh failed while waiting — treat as expired
          Toast.show({
            type: 'error',
            text1: 'Session expired',
            text2: 'Please login again.',
          });

          await AsyncStorage.clear();
          store.dispatch(clearCredentials());

          if ((global as any).navigationRef?.current) {
            global.navigationRef.current.navigate('Login');
          }

          return Promise.reject(error);
        }
      }


      // Otherwise start refresh
      isRefreshing = true;
      try {
        const storedRefreshToken = await AsyncStorage.getItem('refreshToken');

        if (!storedRefreshToken) throw new Error('No refresh token found');

        const refreshResponse = await axiosInstance.post(
          `${API_URL}/auth/refresh_token`,
          { refreshToken: storedRefreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.data.data;
        console.log('access', newAccessToken);
        console.log('refresh', newRefreshToken);



        // Store new tokens
        await AsyncStorage.setItem('accessToken', newAccessToken);
        await AsyncStorage.setItem('refreshToken', newRefreshToken);
        store.dispatch(setCredentials({ accessToken: newAccessToken, refreshToken: newRefreshToken }));

        Toast.show({
          type: 'success',
          text1: 'Token Refreshed',
          text2: 'A new access token was issued.',
        });

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        await AsyncStorage.clear();
        store.dispatch(clearCredentials());



        if ((global as any).navigationRef?.current) {
          Toast.show({
            type: 'error',
            text1: 'Session expired',
            text2: 'Please login again.',
          });
          global.navigationRef.current.navigate('Login');
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
