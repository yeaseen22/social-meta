import React, { useState } from 'react';
import {
  ScrollView,
  FlatList,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import ProfileHeaderUI from '../../components/ui/ProfileHeaderUI';
import PostCard from '../../components/widgets/PostCard';
import FollowersTab from '../../components/widgets/FollowersTab';
import FollowingTab from '../../components/widgets/FollowingTab';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const postData = [
  {
    id: '1',
    userName: 'Asad Anik',
    postTime: '2 hours ago',
    post: 'Hey, how are you there is no interaction with my own application here. And BTW this is my first day at office life here. Dude say me nice day to wishing me at a time bla bla ..',
    liked: true,
    likes: 77,
    comments: 5,
  },
  {
    id: '2',
    userName: 'Asad Anik',
    postTime: '4 hours ago',
    post: 'Hey, how are you there is no interaction with my own application here. And BTW this is my first day at office life here. Dude say me nice day to wishing me at a time bla bla ..',
    liked: false,
    likes: 77,
    comments: 5,
  },
  {
    id: '3',
    userName: 'Asad Anik',
    postTime: '1 day ago',
    post: 'Hey, how are you there is no interaction with my own application here. And BTW this is my first day at office life here. Dude say me nice day to wishing me at a time bla bla ..',
    liked: false,
    likes: 1,
    comments: 0,
  },
];

// Posts Tab Component
const PostsRoute = () => (
  <ScrollView style={styles.tabContent}>
    <Text style={styles.heading}>Posts</Text>
    {postData.map(item => (
      <PostCard key={item.id} item={item} />
    ))}
  </ScrollView>
);

// Following Tab Component
const FollowingRoute = () => (
  <View style={styles.tabContent}>
    <FollowingTab />
  </View>
);

// Followers Tab Component
const FollowersRoute = () => (
  <View style={styles.tabContent}>
    <FollowersTab />
  </View>
);

const ProfileTabScreen = (props: any) => {
  const [refreshing, setRefreshing] = useState(false);

  // Handle Pull-to-Refresh
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ProfileHeaderUI {...props} type="OWN" />
      <View style={styles.tabContainer}>
        {/* Top Tab Navigator */}
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: styles.tabBar,
            tabBarIndicatorStyle: styles.tabIndicator,
            tabBarLabelStyle: styles.tabLabel,
          }}
        >
          <Tab.Screen name="Posts" component={PostsRoute} />
          <Tab.Screen name="Following" component={FollowingRoute} />
          <Tab.Screen name="Followers" component={FollowersRoute} />
        </Tab.Navigator>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    height: 600, // Customize this based on your layout needs
    flex: 1,
  },
  tabContent: {
    flex: 1,
    padding: 10,
  },
  tabBar: {
    backgroundColor: '#fff',
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
  },
  tabIndicator: {
    backgroundColor: '#000',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#000',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ProfileTabScreen;
