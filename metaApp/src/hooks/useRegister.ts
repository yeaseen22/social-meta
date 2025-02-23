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
                text2: 'Something went wrong',
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
        gender: string;
        birthday: string;
    };

    // region Mutation Register
    const registerAction = async (userInfo: RegisterInfoType) => {
        try {
            // sending data to API
            await registerMutation(userInfo);

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'User registered successfully',
            });

        } catch (error) {
            console.error('USER REGISTER: issue - ', error);
        }
    };

    return { registerAction, registerLoading };
};

export default useRegister;
