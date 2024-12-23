import React, { useRef, useCallback } from 'react';
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
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// import ChatTabScreen from './ChatScreen';

type Message = {
  id: string;
  userName: string;
  userImg: any; 
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

const ChatTabScreen: React.FC<MessagesScreenProps> = ({ navigation }) => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <>
      <Container>
        <FlatList
          refreshControl={<RefreshControl refreshing={false} />}
          data={Messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card
              onPress={() =>
                navigation.navigate('Messages', { userName: item.userName })
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
    snapPoints={['25%', '50%']} // Adjust the height of the bottom sheet as needed
  >
    <BottomSheetView style={styles.contentContainer}>
      <Text style={styles.modalTitle}>Actions</Text>

      {/* Block Option */}
      <Button
        title="Block User"
        color="red"
        onPress={() => {
          Alert.alert(
            'Block User',
            'Are you sure you want to block this user?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Block', style: 'destructive', onPress: () => console.log('User Blocked') },
            ]
          );
          bottomSheetModalRef.current?.dismiss();
        }}
      />

      {/* Delete Option */}
      <Button
        title="Delete Chat"
        color="red"
        onPress={() => {
          Alert.alert(
            'Delete Chat',
            'Are you sure you want to delete this chat?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', style: 'destructive', onPress: () => console.log('Chat Deleted') },
            ]
          );
          bottomSheetModalRef.current?.dismiss();
        }}
      />

      {/* Close Option */}
      <Button
        title="Close"
        onPress={() => bottomSheetModalRef.current?.dismiss()}
      />
    </BottomSheetView>
  </BottomSheetModal>
</BottomSheetModalProvider>

    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});


export default ChatTabScreen;
