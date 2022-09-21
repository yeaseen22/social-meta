import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { Feather } from '@expo/vector-icons';
import HomeScreen from '../screens/Home';
import SettingScreen from '../screens/Setting';
import CustomDrawer from './CustomDrawer';

// Drawer Navigation..
const Drawer = createDrawerNavigator();

// Home Screen Component..
const HomeDrawer = () => {
    return (
        <Drawer.Navigator
            useLegacyImplementation={true}
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'royalblue'
                },
                headerTintColor: 'white',
                headerTintStyle: {
                    fontWeight: 'bold'
                }
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
            <Drawer.Screen
                name="Settings"
                component={SettingScreen}
            />
        </Drawer.Navigator>
    );
};

export default HomeDrawer;