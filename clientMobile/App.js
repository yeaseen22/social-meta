import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LogBox } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import EntypoIcon from 'react-native-vector-icons/Entypo';

// use of this LogBox..
// to skip warning of 'react-native-gesture-handler' updates..
LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

// Screens..
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';
import AddPostScreen from './screens/AddPost';
import NotificationScreen from './screens/Notification';
import SettingsScreen from './screens/Settings';

// the Stack navigator..
const BottomTab = createBottomTabNavigator();

// App..
const App = () => {
  return (
      <NavigationContainer>
          <BottomTab.Navigator
            initialRouteName="Home"
            activeColor="red"
            barStyle={{backgroundColor: 'tomato'}}
          >
              {/* ------ Screen of Home ----- */}
              <BottomTab.Screen
                  name="Home"
                  component={ HomeScreen }
                  options={{
                      title: 'Home Screen',
                      tabBarLabel: 'HOME',
                      tabBarIcon: ({ color }) => (
                          <FontAwesomeIcon name="home" size={30} color={color} />
                      ),
                  }}
              />

              {/* ------ Screen of Notification ----- */}
              <BottomTab.Screen
                  name="Notification"
                  component={ NotificationScreen }
                  options={{
                      title: 'Notification Screen',
                      tabBarLabel: 'NOTIFICATION',
                      tabBarIcon: ({ color }) => (
                          <EntypoIcon name="notification" size={30} color={color} />
                      ),
                      tabBarBadge: 30
                  }}
              />

              {/* ------ Screen of AddPost ----- */}
              <BottomTab.Screen
                  name="Add Post"
                  component={ AddPostScreen }
                  options={{
                      title: 'Add Post Screen',
                      tabBarLabel: 'ADD',
                      tabBarIcon: ({ color }) => (
                          <EntypoIcon name="circle-with-plus" size={30} color={color} />
                      ),
                  }}
              />

              {/* ------ Screen of Profile ----- */}
              <BottomTab.Screen
                  name="Profile"
                  component={ ProfileScreen }
                  options={{
                      title: 'Profile Screen',
                      tabBarLabel: 'PROFILE',
                      tabBarIcon: ({ color }) => (
                        <FontistoIcon name="person" size={30} color={color} />
                      ),
                  }}
              />

              {/* ------ Screen of Settings ----- */}
              <BottomTab.Screen
                name="Settings"
                component={ SettingsScreen }
                options={{
                    title: 'Settings Screen',
                    tabBarLabel: 'SETTINGS',
                    tabBarIcon: ({ color }) => (
                        <FontistoIcon name="player-settings" size={30} color={color} />
                    ),
                }}
              />
          </BottomTab.Navigator>
      </NavigationContainer>
  );
}

export default App;
