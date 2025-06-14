import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Alert, 
  TouchableOpacity, 
  ActivityIndicator,
  Keyboard,
  Text
} from 'react-native';
import { PostContainer, InputWrapper, InputField } from '../../styles/AddPostStyles';
import { FloatingAction } from "react-native-floating-action";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useCreatePostMutation } from '../../redux/slice/post.slice';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

// Define action types for better type safety
type ActionType = 'image' | 'video' | 'file';

// Actions for floating button
const actions = [
  {
    text: "Image",
    icon: <Entypo name="image" size={24} color="white" />,
    name: "bt_image",
    position: 2,
    color: "#1DA1F2"
  },
  {
    text: "Video",
    icon: <MaterialIcons name="videocam" size={24} color="white" />,
    name: "bt_video",
    position: 1,
    color: "#FF4500"
  },
  {
    text: "File",
    icon: <AntDesign name="file1" size={24} color="white" />,
    name: "bt_file",
    position: 3,
    color: "#4CAF50"
  }
];

interface PostProps {
  navigation?: any;
  onPostCreated?: () => void;
}

const Post: React.FC<PostProps> = ({ navigation, onPostCreated }) => {
  const [postContent, setPostContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const floatingActionRef = useRef<any>(null);
  
  // RTK Query hook for creating posts
  const [createPost] = useCreatePostMutation();

  // Handle post submission
  const handleSubmitPost = async () => {
    if (!postContent.trim()) {
      Alert.alert('Error', 'Please write something to post');
      return;
    }

    try {
      setIsSubmitting(true);
      Keyboard.dismiss();
      
      // Create form data for media upload if needed
      const formData = new FormData();
      formData.append('content', postContent);
      
      if (selectedMedia) {
        formData.append('media', {
          uri: selectedMedia.uri,
          type: selectedMedia.type,
          name: selectedMedia.fileName || `media-${Date.now()}.${selectedMedia.type.split('/')[1]}`,
        });
      }
      
      await createPost(formData).unwrap();
      
      // Reset form
      setPostContent('');
      setSelectedMedia(null);
      
      // Notify parent component
      if (onPostCreated) {
        onPostCreated();
      }
      
      // Navigate back if navigation is provided
      if (navigation) {
        navigation.goBack();
      }
      
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle media selection
  const handleMediaSelection = async (type: ActionType) => {
    try {
      if (type === 'image') {
        const result = await launchImageLibrary({
          mediaType: 'photo',
          quality: 0.8,
          selectionLimit: 1,
        });
        
        if (result.assets && result.assets[0]) {
          setSelectedMedia(result.assets[0]);
        }
      } else if (type === 'video') {
        const result = await launchImageLibrary({
          mediaType: 'video',
          quality: 0.8,
          selectionLimit: 1,
        });
        
        if (result.assets && result.assets[0]) {
          setSelectedMedia(result.assets[0]);
        }
      } else if (type === 'file') {
        // Implement document picker if needed
        Alert.alert('Coming Soon', 'File upload will be available soon!');
      }
    } catch (error) {
      console.error('Error selecting media:', error);
    }
  };

  // Handle floating action button press
const handleActionPress = (name?: string) => {
  if (!name) return;

  switch (name) {
    case 'bt_image':
      console.log('Image action selected');
      break;
    case 'bt_video':
      console.log('Video action selected');
      break;
    case 'bt_file':
      console.log('File action selected');
      break;
    default:
      console.log('Unknown action');
  }
};


  return (
    <PostContainer>
      <InputWrapper>
        <InputField
          placeholder="What's on your mind?"
          multiline
          numberOfLines={8}
          value={postContent}
          onChangeText={setPostContent}
          editable={!isSubmitting}
        />
        
        {selectedMedia && (
          <View style={styles.mediaPreviewContainer}>
            {selectedMedia.type.includes('image') ? (
              <View style={styles.imagePreview}>
                <TouchableOpacity 
                  style={styles.removeMediaButton}
                  onPress={() => setSelectedMedia(null)}
                >
                  <AntDesign name="closecircle" size={24} color="#FF3B30" />
                </TouchableOpacity>
                <View style={styles.mediaTypeIndicator}>
                  <Entypo name="image" size={16} color="white" />
                </View>
              </View>
            ) : (
              <View style={styles.videoPreview}>
                <TouchableOpacity 
                  style={styles.removeMediaButton}
                  onPress={() => setSelectedMedia(null)}
                >
                  <AntDesign name="closecircle" size={24} color="#FF3B30" />
                </TouchableOpacity>
                <View style={styles.mediaTypeIndicator}>
                  <MaterialIcons name="videocam" size={16} color="white" />
                </View>
              </View>
            )}
          </View>
        )}
        
        <TouchableOpacity 
          style={[
            styles.submitButton, 
            (!postContent.trim() || isSubmitting) && styles.disabledButton
          ]}
          onPress={handleSubmitPost}
          disabled={!postContent.trim() || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <View style={styles.submitButtonContent}>
              <FontAwesome name="send" size={16} color="#fff" />
              <View style={styles.submitButtonTextContainer}>
                {/* Fixed: Changed View to Text component */}
                <Text style={styles.submitButtonText}>Post</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </InputWrapper>

      <FloatingAction
        ref={floatingActionRef}
        actions={actions}
        onPressItem={handleActionPress}
        color="#1DA1F2"
        distanceToEdge={16}
        overlayColor="rgba(0, 0, 0, 0.7)"
        showBackground={true}
      />
    </PostContainer>
  );
};

const styles = StyleSheet.create({
  mediaPreviewContainer: {
    marginTop: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  imagePreview: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  videoPreview: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  removeMediaButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    zIndex: 10,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  mediaTypeIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#1DA1F2',
    borderRadius: 12,
    padding: 4,
  },
  submitButton: {
    backgroundColor: '#1DA1F2',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  disabledButton: {
    backgroundColor: '#A8D5F7',
  },
  submitButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButtonTextContainer: {
    marginLeft: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Post;