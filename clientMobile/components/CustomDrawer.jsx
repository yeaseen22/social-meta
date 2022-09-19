import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    Switch
} from 'react-native-paper';

const CustomDrawer = (props) => {
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={[styles.userInfoSection, { flexDirection: 'row' }]}>
                        <View style={{ marginTop: 15 }}>
                            <Avatar.Image source={require('../assets/images/asadanik.jpg')} />
                        </View>

                        <View style={{ marginLeft: 9, marginTop: 15 }}>
                            <Title style={styles.title}>Asad Anik</Title>
                            <Caption style={styles.caption}>engr.asadanik@gmail.com</Caption>
                        </View>
                    </View>

                    <View style={[styles.userInfoSection, { flexDirection: 'row', marginLeft: 20}]}>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>84</Paragraph>
                            <Caption style={styles.caption}>Followers</Caption>
                        </View>

                        <View style={[styles.section, { marginLeft: 20 }]}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>77</Paragraph>
                            <Caption style={styles.caption}>Following</Caption>
                        </View>
                    </View>

                    <Drawer.Section style={{flex: 1, marginTop: 15, marginLeft: 10 }} >
                        <DrawerItem label="Home" onPress={() => props.navigation.navigate("Home")} />
                        <DrawerItem label="See Profile" onPress={() => props.navigation.navigate("Profile")} />
                        <DrawerItem label="About Meta" onPress={() => props.navigation.navigate("About")} />
                        <DrawerItem label="Settings" onPress={() => props.navigation.navigate("Settings")} />
                    </Drawer.Section>

                    <Drawer.Section title="Preferences">
                        <View style={styles.preference}>
                            <Text>Dark Mode</Text>
                            <Switch 
                                value={isDarkMode}
                                onValueChange={() => {
                                    setIsDarkMode(!isDarkMode ? true : false);
                                }}
                            />
                        </View>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>

            {/* ---- LogOut ---- */}
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem label="Sign Out" onPress={() => {alert('Pressed to Logout!')}} />    
            </Drawer.Section>
        </View>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        marginLeft: 15,
    },
    userInfoSection: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 0,
        textAlign: 'center',
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3
    },
    drawerSection: {
        marginTop: 15
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4'
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginLeft: 15
    }
});

export default CustomDrawer;