import { View, Text } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import HairBookLogo from './HairBookLogo';
import SettingsScreen from '../screens/SettingsScreen';

const AppMenu = () => {

    const Drawer = createDrawerNavigator();

  return (
    
        <Drawer.Navigator>
            <Drawer.Screen name="HomeScreen" component={HomeScreen}/>
            <Drawer.Screen name="Settings" component={SettingsScreen}/>
        </Drawer.Navigator>
  
  )
}

export default AppMenu