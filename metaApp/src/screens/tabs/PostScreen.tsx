import React from 'react';
import { PostContainer, InputWrapper, InputField } from '../../styles/AddPostStyles';
import { FloatingAction } from "react-native-floating-action";
// import { Entypo, AntDesign } from '@expo/vector-icons';
// import { StatusBar } from 'expo-status-bar';
// import { useColorScheme } from '@/hooks/useColorScheme';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';





// Actions for this button here..
const actions = [
    {
        text: "Image",
        icon: <Entypo name="image" size={24} color="white" />,
        name: "bt_image",
        position: 2
    },
    {
        text: "Video",
        icon: <MaterialIcons name="videocam" size={24} color="white" />,
        name: "bt_video",
        position: 1
    },
    {
        text: "File",
        icon: <AntDesign name="file1" size={24} color="white" />,
        name: "bt_file",
        position: 3
    }
];



// Add Post Component..
const Post = () => {
    // const colorScheme = useColorScheme();
    let floatingAction = null;

    return (
        <PostContainer>
            {/* <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} /> */}
            
            <InputWrapper>
                <InputField
                    placeholder="What's on your mind?"
                    multiline
                    numberOfLines={8}
                />
            </InputWrapper>

            <FloatingAction
                ref={(ref) => { floatingAction = ref; }}
                actions={actions}
            />
        </PostContainer>
    );
};

export default Post;