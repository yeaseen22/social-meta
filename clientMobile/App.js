import 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import OnboardingScreen from './screens/Onboarding.jsx';
import OnboardingScreen from './screens/onboarding/Onboarding';
import SplashScreen from './screens/Splash';
import LoginScreen from './screens/authentication/Login';
import RegisterScreen from './screens/authentication/Register';
import RegisterScreen2 from './screens/authentication/Register2';
import RegisterScreen3 from './screens/authentication/Register3';
import UploadProfileScreen from './screens/authentication/UploadProfile';
import MainTabs from './components/MainTabs';
import EditProfileScreen from './screens/EditProfile';

const Stack = createNativeStackNavigator();

// App Component..
const App = () => {
  const [isFirstLaunch, setFirstLaunch] = useState(null);

  // Check the First Lunch Application or not then showing onboarding screen..
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setFirstLaunch(true);
      } else {
        setFirstLaunch(false);
      }
    });
  }, []);


  /**
   * ---- First Launch will showing Onboarding and Splash screen ----
   * ---- Or Showing with 2nd entry without Onboarding and Splash screen ----
   */
  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
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
            name="Register2"
            component={RegisterScreen2}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Register3"
            component={RegisterScreen3}
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
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          useLegacyImplementation={true}
          initialRouteName="LoginScreen"
        // screenOptions={{headerShown: false}}
        >
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
            name="Register2"
            component={RegisterScreen2}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Register3"
            component={RegisterScreen3}
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
  }
};


export default App;