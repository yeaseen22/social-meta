import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabs from './components/MainTabs';
import EditProfileScreen from './screens/EditProfile';

const Stack = createNativeStackNavigator();

// App Component..
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        useLegacyImplementation={true}
        initialRouteName="MainTabs"
      // screenOptions={{headerShown: false}}
      >
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