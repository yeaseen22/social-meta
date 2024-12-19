import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ProfileScreen, PostScreen, ChatScreen, ExploreScreen, HomeScreen } from '../screens';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontistoIcons from 'react-native-vector-icons/Fontisto';
import Drawer from './Drawer';

const MainTabs = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="black"
      options={{
        tabBarShowLabel: false,
      }}
    >
      {/* <Tab.Screen
        name="HomeDrawer"
        component={Drawer}
        options={{
          tabBarLabel: 'Home',
          // tabBarIcon: ({ color }: any) => (
          //   <Ionicons name="ios-home" size={24} color={color} />
          // )
        }}
      /> */}

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }: any) => (
            <AntDesignIcons name="home" size={24} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color }: any) => (
            <MaterialIcons name="explore" size={24} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarIcon: ({ color }: any) => (
            <MaterialIcons name="add" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color }: any) => (
            <FontistoIcons name="hipchat" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }: any) => (
            <MaterialIcons name="account-circle" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
