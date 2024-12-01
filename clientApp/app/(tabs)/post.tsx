import React from 'react';
import { Container, InputWrapper, InputField } from '@/styles/AddPost';
import { FloatingAction } from "react-native-floating-action";
import { Entypo, AntDesign } from '@expo/vector-icons';

// Actions for this button here..
const actions = [
    {
        text: "Image",
        icon: <Entypo name="folder-images" size={24} color="white" />,
        name: "bt_accessibility",
        position: 2
    },
    {
        text: "Video",
        icon: <Entypo name="folder-video" size={24} color="white" />,
        name: "bt_video",
        position: 1
    },
    {
        text: "File",
        icon: <AntDesign name="addfile" size={24} color="white" />,
        name: "bt_file",
        position: 3
    }
];

// Add Post Component..
const Post = () => {
    let floatingAction = null;

    return (
        <Container>
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
        </Container>
    );
};

export default Post;