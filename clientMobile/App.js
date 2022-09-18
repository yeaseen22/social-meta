import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabs from './components/MainTabs';

const Stack = createNativeStackNavigator();

// App Component..
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        useLegacyImplementation={true} 
        initialRouteName="MainTabs" 
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;