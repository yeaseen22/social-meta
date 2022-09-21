import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import OnboardingScreen from './screens/Onboarding.jsx';
import OnboardingScreen from './screens/onboarding/Onboarding';
import SplashScreen from './screens/Splash';
import LoginScreen from './screens/authentication/Login';
import RegisterScreen from './screens/authentication/Register';
import UploadProfileScreen from './screens/authentication/UploadProfile';
import MainTabs from './components/MainTabs';
import EditProfileScreen from './screens/EditProfile';

const Stack = createNativeStackNavigator();

// App Component..
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        useLegacyImplementation={true}
        initialRouteName="Onboarding"
      // screenOptions={{headerShown: false}}
      >
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="UploadProfile"
          component={UploadProfileScreen}
          options={{
            headerShown: false,
          }}
        />


        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{
            title: 'Edit Profile',
            headerLeftTitle: '',
            headerStyle: {
              backgroundColor: '#fff',
              shadowColor: '#fff', // iOS
              elevation: 0, // Android
            },
            headerTintColor: 'black'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;