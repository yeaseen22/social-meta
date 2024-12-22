import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import {
  LoginScreen,
  MessageScreen,
  OnboardingScreen,
  RegisterScreen,
  RegisterScreen2,
  RegisterScreen3,
  SplashScreen,
  UploadProfileScreen,
} from './src/screens';
import { Tabs } from './src/navigations';


const Stack = createNativeStackNavigator();

const App = () => {
  // const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  /**
   * CUSTOM HEADERS TITLE FOR BOTTOM TABS
   * @param route 
   * @returns 
   */
  const getHeaderTitle = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    const titleMap: { [key: string]: string } = {
      Home: 'Home',
      Chats: 'Chats',
      Profile: 'Profile',
      Explore: 'Explore',
      Notification: 'Notifications',
      Post: 'Create Post',
      Messages: 'Messages',
    };

    return titleMap[routeName as keyof typeof titleMap] || routeName;
  };

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tabs">
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
            name="Tabs"
            component={Tabs}
            options={({ route }: any): any => ({
              headerShown: true,
              headerTitle: getHeaderTitle(route) || 'Home',
            })}
          />

          <Stack.Screen
            name="Messages"
            component={MessageScreen}
            options={{
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
