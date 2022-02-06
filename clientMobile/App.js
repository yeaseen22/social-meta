import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LogBox } from 'react-native';

// use of this LogBox..
// to skip warning of 'react-native-gesture-handler' updates..
LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

// Screens..
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';

// the Stack navigator..
const BottomTab = createBottomTabNavigator();

// App..
export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        {/* ------ Screen of Home ----- */}
        <BottomTab.Screen
          name="Home"
          component={ HomeScreen }
          options={{ title: 'Home Screen' }}
        />

        {/* ------ Screen of Profile ----- */}
        <BottomTab.Screen
          name="Profile"
          component={ ProfileScreen }
          options={{ title: 'Profile Screen' }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
