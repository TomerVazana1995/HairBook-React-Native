import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import { Ionicons } from "@expo/vector-icons";
import HairBookLogo from "./HairBookLogo";
import { createDrawerNavigator, DrawerToggleButton } from "@react-navigation/drawer";
import { ArrowBackIcon } from "native-base";
import BookingScreen from "../screens/BookingScreen";
import SettingsScreen from "../screens/SettingsScreen";

const AppNavigator = ({navigation}) => {

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="דף הבית" screenOptions={{
        headerTitle: (props) => <HairBookLogo {...props}/>,
        headerStyle: {
          backgroundColor: "#5C7FA9",

        },
        headerTintColor: "white",   
        drawerPosition: "right",
        headerLeft: () => <ArrowBackIcon color="white" size={5} margin={3}/>,
        headerRight: () => <DrawerToggleButton tintColor="white"/>  
     
      }}>
        <Drawer.Screen name="דף הבית" component={HomeScreen} options={{drawerIcon: () => <Ionicons name="home"/> }}>
        </Drawer.Screen>
        <Drawer.Screen name="קביעת תור" component={BookingScreen}/>
        <Drawer.Screen name="Sign up" component={SignUpScreen} options={{drawerItemStyle: {height: 0}}}/>
        <Drawer.Screen name="Login" component={LoginScreen} options={{drawerItemStyle: { height: 0}}}/>
        <Drawer.Screen name="הגדרות" component={SettingsScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>

   
  );
};


export default AppNavigator;
