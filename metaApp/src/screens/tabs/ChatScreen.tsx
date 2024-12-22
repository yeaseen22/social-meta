import React, {useRef, useCallback} from 'react';
import {
  FlatList,
  RefreshControl,
  Alert,
  StyleSheet,
  Text,
  Button,
} from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../../styles/MessageStyle';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

// import ChatTabScreen from './ChatScreen';

type Message = {
  id: string;
  userName: string;
  userImg: any; // Use ImageSourcePropType if you want to import `ImageSourcePropType` from 'react-native'
  messageTime: string;
  messageText: string;
};

const Messages: Message[] = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../../assets/images/asadanik.jpg'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../../assets/images/asadanik.jpg'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../../assets/images/asadanik.jpg'),
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../../assets/images/asadanik.jpg'),
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../../assets/images/asadanik.jpg'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

type MessagesScreenProps = {
  navigation: any; // Replace `any` with the correct type if you're using a type-safe navigation library like React Navigation
};

const ChatTabScreen: React.FC<MessagesScreenProps> = ({navigation}) => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log('handleSheetChanges', index);
  // }, []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <>
      <GestureHandlerRootView>
        <Container>
        <FlatList
          refreshControl={<RefreshControl refreshing={false} />}
          data={Messages}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Card
              onPress={() =>
                navigation.navigate('Messages', {userName: item.userName})
              }
              onLongPress={handlePresentModalPress}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={item.userImg} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.messageTime}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.messageText}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
        </Container>

        <BottomSheetModalProvider>
        <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
          >
            <BottomSheetView style={styles.contentContainer}>
              <Text>Awesome 🎉</Text>
            </BottomSheetView>
        </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: 24,
  //   justifyContent: 'center',
  //   backgroundColor: 'grey',
  // },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    minHeight: 400,
  },
});

export default ChatTabScreen;
