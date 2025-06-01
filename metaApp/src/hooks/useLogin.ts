import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useLoginMutation } from '../redux/slice/auth.slice';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setCredentials } from '../redux/slice/auth.slice';

type LoginPayload = {
    email: string;
    password: string;
};

const useLogin = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [loginMutation, { data: loginData, isLoading: loginLoading, error: loginError }] = useLoginMutation();

    // 🛑 Error Toast
    useEffect(() => {
        if (loginError && !loginLoading) {
            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: (loginError as any)?.data?.message || 'Something went wrong',
            });
        }
    }, [loginError, loginLoading]);

    // ✅ Login Handler
    const loginAction = async ({ email, password }: LoginPayload) => {
        try {
            console.log('📡 Sending login request:', { email, password });
            const result = await loginMutation({ email, password });

            if ('data' in result && result.data) {
                const tokenData = result.data.data; // ✅ FIX HERE

                console.log('tokendata', tokenData);

                if (tokenData?.accessToken && tokenData?.refreshToken) {
                    await AsyncStorage.setItem('accessToken', tokenData.accessToken);
                    await AsyncStorage.setItem('refreshToken', tokenData.refreshToken);
                    dispatch(setCredentials(tokenData));

                    Toast.show({
                        type: 'success',
                        text1: 'Logged-In',
                        text2: 'Welcome back!',
                    });

                    navigation.navigate('Tabs' as never);
                    return tokenData;
                } else {
                    console.warn('❌ Login failed: Missing token data');
                }
            }
        } catch (err) {
            console.error('❌ Login failed:', err);
        }
    };

    return {
        loginAction,
        loginLoading,
    };
};

export default useLogin;
