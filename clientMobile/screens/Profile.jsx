import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple
} from 'react-native-paper';
import { Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';


const Profile = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 20 }}>
                {/* <Avatar.Image
                    source={{
                        uri: `/assets/images/asadanik.jpg`
                    }}
                    size={80}
                /> */}
                <Avatar.Image
                    source={require('../assets/images/asadanik.jpg')}
                    size={80}
                />

                <View style={{ marginLeft: 20 }}>
                    <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>
                        Asad Anik
                    </Title>
                    <Caption style={styles.caption}>Software Engineer</Caption>
                </View>

                <TouchableOpacity style={{
                    flex: 1,
                    marginLeft: 100,
                    marginTop: 20,
                }}
                    onPress={() => navigation.navigate('EditProfile')}
                >
                    <MaterialCommunityIcons name="account-edit" size={30} color="black" />
                </TouchableOpacity>

            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Entypo name="location" size={20} color="#777" />
                    <Text style={{ color: '#777', marginLeft: 20 }}>Dhaka, Bangladesh</Text>
                </View>

                <View style={styles.row}>
                    <MaterialIcons name="email" size={20} color="#777" />
                    <Text style={{ color: '#777', marginLeft: 20 }}>engr.asadanik@gmail.com</Text>
                </View>
            </View>

            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, { borderRightColor: '#ddd', borderRightWidth: 1 }]}>
                    <Title>Followers</Title>
                    <Caption>84</Caption>
                </View>

                <View style={styles.infoBox}>
                    <Title>Following</Title>
                    <Caption>77</Caption>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26
    },
});

export default Profile;