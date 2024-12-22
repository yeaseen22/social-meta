import React, {useRef, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface Message {
  id: string;
  text: string;
  user: 'me' | 'bot';
}

const MessagesScreen: React.FC<{navigation: any; route: any}> = ({
  navigation,
  route,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {id: '1', text: 'Hello! How can I help you today?', user: 'bot'},
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const userName = route?.params?.userName || 'John Doe';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Chat with ' + userName,
    });
  }, [navigation, userName]);

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      user: 'me',
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          text: "I'm a bot! Let me know if you need assistance.",
          user: 'bot',
        },
      ]);
    }, 1000);
  };

  const renderMessage = ({item}: {item: Message}) => {
    const isUser = item.user === 'me';
    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.botMessage,
        ]}>
        <Text style={isUser ? styles.userText : styles.botText}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatContainer}
        extraData={messages}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({animated: true})
        }
        onLayout={() => flatListRef.current?.scrollToEnd({animated: true})}
      />

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    padding: 15,
    backgroundColor: '#0078fe',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatContainer: {
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0078fe',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e1e1e1',
  },
  userText: {
    color: '#fff',
  },
  botText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f1f1f1',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#0078fe',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
