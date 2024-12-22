import React, {useEffect} from 'react';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ProfileScreen,
  PostScreen,
  ChatScreen,
  ExploreScreen,
  HomeScreen,
  NotificationScreen,
} from '../screens';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const MainTabs = () => {
  const Tab = createMaterialBottomTabNavigator();
  const navigation = useNavigation();
  const route = useRoute();

  console.log('Route Name:', navigation.getState());

  useEffect(() => {
    const state = navigation.getState();
    const routeName = state?.routes[state.index]?.name || 'Home';
  

    switch (routeName) {
      case 'Home':
        navigation.setOptions({headerTitle: 'Home'});
        break;
      case 'Explore':
        navigation.setOptions({headerTitle: 'Explore'});
        break;
      case 'Post':
        navigation.setOptions({headerTitle: 'Create Post'});
        break;
      case 'Notification':
        navigation.setOptions({headerTitle: 'Notifications'});
        break;
      case 'Profile':
        navigation.setOptions({headerTitle: 'Your Profile'});
        break;
      default:
        navigation.setOptions({headerTitle: 'App'});
    }
  }, [navigation,route]);
  return (
    <Tab.Navigator initialRouteName="Home" activeColor="black">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}: {color: string}) => (
            <AntDesignIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({color}: {color: string}) => (
            <MaterialIcons name="explore" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarIcon: ({color}: {color: string}) => (
            <MaterialIcons name="add" size={24} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({color}: {color: string}) => (
            <Entypo name="notification" size={24} color={color} />
          ),
        }}
      /> */}

<Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          tabBarIcon: ({color}: {color: string}) => (
            <Entypo name="notification" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}: {color: string}) => (
            <MaterialIcons name="account-circle" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
