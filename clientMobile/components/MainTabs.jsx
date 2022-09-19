import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import HomeDrawer from './HomeDrawer';


// import HomeScreen from './Home';
import ProfileScreen from '../screens/Profile';
import PostScreen from '../screens/Post';
import ChatScreen from '../screens/Chat';
import SearchScreen from '../screens/Search';

// const HomeStack = createNativeStackNavigator();
// const ProfileStack = createNativeStackNavigator();
// const PostStack = createNativeStackNavigator();
// const SettingStack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeDrawer"
      activeColor="white"
    >
        <Tab.Screen
          name="HomeDrawer"
          component={HomeDrawer}
          options={{
            tabBarLabel: 'Home',
            tabBarColor: 'royalblue',
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-home" size={24} color={color} />
            )
          }}
        />

        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarColor: 'gray',
            tabBarIcon: ({ color }) => (
              <AntDesign name="search1" size={24} color={color} />
            )
          }}
        />

        <Tab.Screen
          name="Post"
          component={PostScreen}
          options={{
            tabBarLabel: 'Create Post',
            tabBarColor: 'red',
            tabBarIcon: ({ color }) => (
              <AntDesign name="pluscircle" size={24} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarLabel: 'Chat',
            tabBarColor: 'green',
            tabBarIcon: ({ color }) => (
              <AntDesign name="wechat" size={24} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarColor: 'orange',
            tabBarIcon: ({ color }) => (
              <AntDesign name="profile" size={24} color={color} />
            )
          }}
        />
    </Tab.Navigator>
  );
};


// // Home Stack Navigator Screen..
// const HomeStackScreen = ({ navigation }) => (
//   <HomeStack.Navigator screenOptions={{
//     headerStyle: {
//       backgroundColor: 'orange'
//     },
//     headerTintColor: 'white',
//     headerTintStyle: {
//       fontWeight: 'bold'
//     }
//   }}>
//     <HomeStack.Screen
//       name="Home"
//       component={HomeScreen}
//       options={{
//         title: 'Hi All',
//         headerLeft: () => (
//           <Feather 
//             name="menu" 
//             size={24} 
//             color="white" 
//             onPress={() => navigation.openDrawer()}
//           />
//         )
//       }}
//     />
//   </HomeStack.Navigator>
// );

// // Profile Stack Navigator Screen..
// const ProfileStackScreen = ({ navigation }) => (
//   <ProfileStack.Navigator screenOptions={{
//     headerStyle: {
//       backgroundColor: 'green'
//     },
//     headerTintColor: 'white',
//     headerTintStyle: {
//       fontWeight: 'bold'
//     }
//   }}>
//     <ProfileStack.Screen 
//       name="Profile2"
//       component={ProfileScreen}
//       options={{
//         title: 'My Profile'
//       }}
//     />
//   </ProfileStack.Navigator>
// );

// // Post Stack Navigator Screen..
// const PostStackScreen = ({ navigation }) => (
//   <PostStack.Navigator screenOptions={{
//     headerStyle: {
//       backgroundColor: 'purple'
//     },
//     headerTintColor: 'white',
//     headerTintStyle: {
//       fontWeight: 'bold'
//     }
//   }}>
//     <PostStack.Screen 
//       name="Post2"
//       component={PostScreen}
//       options={{
//         title: 'Create Your Post'
//       }}
//     />
//   </PostStack.Navigator>
// );

// // Setting Stack Navigator Screen..
// const SettingStackScreen = ({ navigation }) => (
//   <SettingStack.Navigator>
//     <SettingStack.Screen
//       name="Settings2"
//       component={SettingScreen}
//     />
//   </SettingStack.Navigator>
// );



export default MainTabs;
