import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useLoginMutation } from '../redux/slice/auth.slice';

const useLogin = () => {
    const dispatch = useDispatch();
    const [loginMutation] = useLoginMutation();

    const login = async (userInfo: { email: string, password: string }) => {
        try {
            // sending data to API
            const response = await loginMutation({ email: data.email, password: data.password }).unwrap();
            dispatch(setCredentials(response.data));

            Toast.show({
                type: 'success',
                text1: 'Hello',
                text2: 'This is some something 👋',
            });

        } catch (error) {
            console.error('USER LOGIN: issue - ', error);
        }
    }

    return { login };
};

export default useLogin;