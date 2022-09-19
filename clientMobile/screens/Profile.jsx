import React from 'react';
import { Text, View, Button } from 'react-native';

const Profile = ({ navigation }) => {
    return (
        <View>
            <Text>I am Profile Screen</Text>

            <Button
                title="Let's Make Post"
                onPress={() => navigation.navigate("Post")}
            />
        </View>
    );
};

export default Profile;