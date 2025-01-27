import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from '../screens';
import CustomDrawer from './CustomDrawer';
// import { Feather } from '@expo/vector-icons';

// Drawer Navigation..
const Drawer = createDrawerNavigator();

// Home Screen Component..
const HomeDrawer = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'royalblue'
                },
                headerTintColor: 'white',
            }}
            drawerContent={(props) => <CustomDrawer {...props} />}
        >
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Social Meta',
                }}
            />
            {/* <Drawer.Screen
                name="Settings"
                component={SettingScreen}
            /> */}
        </Drawer.Navigator>
    );
};

export default HomeDrawer;