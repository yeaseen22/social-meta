import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRegisterMutation } from '../redux/slice/auth.slice';
import Toast from 'react-native-toast-message';

const useRegister = () => {
    const navigation = useNavigation();
    const [registerMutation, { data: registerData, isLoading: registerLoading, error: registerError }] = useRegisterMutation();

    // region Mutation Error
    useEffect(() => {
        if (registerError && !registerLoading) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: (registerError as any)?.data?.message || 'Something went wrong',
            });
        }
    }, [registerError, registerLoading]);

    // region Mutation Success
    useEffect(() => {
        if (registerData && !registerLoading) {
            navigation.navigate('Login' as never);
        }

    }, [registerData, registerLoading, navigation]);

    // region Register Info-Types
    type RegisterInfoType = {
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        birthdate: string;
    };

    // region Mutation Register
    const registerAction = async (userInfo: RegisterInfoType) => {
        try {
            // sending data to API
            const result = await registerMutation(userInfo);

            if ('data' in result) {
                Toast.show({
                    type: 'success',
                    text1: 'Registered',
                    text2: 'Welcome',
                });
                return result.data;
            }

        } catch (error) {
            console.error('USER REGISTER: issue - ', error);
        }
    };

    return { registerAction, registerLoading };
};

export default useRegister;
