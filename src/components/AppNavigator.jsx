import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import { Ionicons } from "@expo/vector-icons";
import HairBookLogo from "./HairBookLogo";
import { createDrawerNavigator, DrawerToggleButton } from "@react-navigation/drawer";
import { ArrowBackIcon } from "native-base";
import BookingScreen from "../screens/BookingScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MapComponent from "./MapComponent";
import { Pressable } from "react-native";
import ShopScreen from "../screens/ShopScreen";
import BusinessDetailsScreen from "../screens/BusinessDetailsScreen";

const AppNavigator = () => {

  const Drawer = createDrawerNavigator();

  const HeaderBackButton = () => {
    const navigation = useNavigation()
    return (
      <Pressable onPress={() => navigation.goBack()}>
        <ArrowBackIcon color="white" />
      </Pressable>
    );
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="דף הבית" screenOptions={({navigation}) => ({
        headerTitle: (props) => <HairBookLogo {...props}/>,
        headerStyle: {
          backgroundColor: "#5C7FA9",
        },
        headerTintColor: "white",   
        drawerPosition: "right",
        headerRight: () => <DrawerToggleButton tintColor="white"/>,
        headerLeft: () => navigation.canGoBack() ? <HeaderBackButton/> : null
})}>
        <Drawer.Screen name="דף הבית" component={HomeScreen} options={{drawerIcon: () => <Ionicons name="home"/> }}/>
        <Drawer.Screen name="קביעת תור" component={BookingScreen}/>
        <Drawer.Screen name="הגדרות" component={SettingsScreen}/>
        <Drawer.Screen name="Business details" component={BusinessDetailsScreen}/>
        <Drawer.Screen name="חנות מוצרים" component={ShopScreen}/>
        <Drawer.Screen name="Sign up" component={SignUpScreen} options={{drawerItemStyle: {height: 0}}}/>
        <Drawer.Screen name="Login" component={LoginScreen} options={{drawerItemStyle: { height: 0}}}/>
      </Drawer.Navigator>
    </NavigationContainer>

   
  );
};


export default AppNavigator;
