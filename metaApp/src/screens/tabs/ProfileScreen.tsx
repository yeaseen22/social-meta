import React from 'react';
import {
  ScrollView,
  FlatList,
  View,
  RefreshControl,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import ProfileHeaderUI from '../../components/ui/ProfileHeaderUI';
import PostCard from '../../components/widgets/PostCard';
import {Container} from '../../styles/ProfileStyles';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import FollowersTab from '../../components/widgets/FollowersTab';
import FollowingTab from '../../components/widgets/FollowingTab';

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

// const PostsRoute2 = () => (
//   <FlatList
//     data={postData}
//     renderItem={({item}) => <PostCard item={item} />}
//     keyExtractor={item => item.id}
//     showsVerticalScrollIndicator={false}
//     contentContainerStyle={styles.postList}
//   />
// );

const PostsRoute = () => (
  <ScrollView>
    {postData?.map(item => (
        <PostCard key={item.id} item={item} />
    ))}
  </ScrollView>
);

const FollowingRoute = () => (
  <View style={styles.tabContent}>
    <FollowingTab />
  </View>
);

const FollowersRoute = () => (
  <View style={styles.tabContent}>
    <FollowersTab />
  </View>
);

const renderScene = SceneMap({
  posts: PostsRoute,
  following: FollowingRoute,
  followers: FollowersRoute,
});

const routes = [
  {key: 'posts', title: 'Posts'},
  {key: 'following', title: 'Following'},
  {key: 'followers', title: 'Followers'},
];

const ProfileTabScreen = (props: any) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Implement your refresh logic here
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
      activeColor="#000"
      inactiveColor="#999"
    />
  );

  return (
    <Container style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ProfileHeaderUI {...props} type="OWN" />
        
        <View style={styles.tabViewContainer}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
            renderTabBar={renderTabBar}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  tabViewContainer: {
    flex: 1,
    height: '100%', // Adjust this value based on your needs
  },
  tabBar: {
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabIndicator: {
    backgroundColor: '#000',
  },
  tabLabel: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postList: {
    padding: 10,
  },
});

export default ProfileTabScreen;

