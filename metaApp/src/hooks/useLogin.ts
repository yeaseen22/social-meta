import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useLoginMutation } from '../redux/slice/auth.slice';
import { useNavigation } from '@react-navigation/native';

const useLogin = () => {
    const navigation = useNavigation();
    const [loginMutation, { data: loginData, isLoading: loginLoading, error: loginError }] = useLoginMutation();

    // region Mutation Error
    useEffect(() => {
        if (loginError && !loginLoading) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Somethiing went wrong',
            });
        }
    }, [loginError, loginLoading]);

    // region Mutation Success
    useEffect(() => {
        if (loginData && !loginLoading) {
            navigation.navigate('Home' as never);
        }

    }, [loginData, loginLoading, navigation]);

    // region Mutation Login
    const loginAction = async (userInfo: { email: string, password: string }) => {
        try {
            // sending data to API
            await loginMutation({ email: userInfo.email, password: userInfo.password }).unwrap();

            Toast.show({
                type: 'success',
                text1: 'Logged-In',
                text2: 'You are welcome to Social-Meta',
            });

        } catch (error) {
            console.error('USER LOGIN: issue - ', error);
        }
    };

    return { loginAction, loginLoading };
};

export default useLogin;
