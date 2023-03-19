import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import HairBookLogo from "./HairBookLogo";
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from "@react-navigation/drawer";
import { ArrowBackIcon } from "native-base";
import BookingScreen from "../screens/BookingScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { Pressable } from "react-native";
import ShopScreen from "../screens/ShopScreen";
import BusinessDetailsScreen from "../screens/BusinessDetailsScreen";

const AppNavigator = () => {
  const Drawer = createDrawerNavigator();

  const HeaderBackButton = () => {
    const navigation = useNavigation();
    return (
      <Pressable onPress={() => navigation.goBack()}>
        <ArrowBackIcon color="white" />
      </Pressable>
    );
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="דף הבית"
        screenOptions={({ navigation }) => ({
          headerTitle: (props) => <HairBookLogo {...props} />,
          headerStyle: {
            backgroundColor: "#5C7FA9",
          },
          headerTintColor: "white",
          drawerPosition: "right",
          drawerStyle: { width: "50%" },
          headerRight: () => <DrawerToggleButton tintColor="white" />,
          headerLeft: () =>
            navigation.canGoBack() ? <HeaderBackButton /> : null,
        })}
      >
        <Drawer.Screen
          name="דף הבית"
          component={HomeScreen}
          options={{
            drawerIcon: () => <Ionicons name="home" size={15} />,
            drawerLabelStyle: { textAlign: "right" },
          }}
        />
        <Drawer.Screen
          name="קביעת תור"
          component={BookingScreen}
          options={{
            drawerIcon: () => (
              <MaterialCommunityIcons name="human-queue" size={20} />
            ),
            drawerLabelStyle: { textAlign: "right" },
          }}
        />
        <Drawer.Screen
          name="הגדרות"
          component={SettingsScreen}
          options={{
            drawerIcon: () => <Ionicons name="settings" size={20} />,
            drawerLabelStyle: { textAlign: "right" },
          }}
        />
        <Drawer.Screen
          name="חנות מוצרים"
          component={ShopScreen}
          options={{
            drawerIcon: () => <FontAwesome5 name="store" size={15} />,
            drawerLabelStyle: { textAlign: "right" },
          }}
        />
        <Drawer.Screen
          name="Sign up"
          component={SignUpScreen}
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="Login"
          component={LoginScreen}
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="Business details"
          component={BusinessDetailsScreen}
          options={{ drawerItemStyle: { height: 0 } }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
