import { TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from "@react-navigation/drawer";
import HomeScreen from "../../screens/HomeScreen";
import SettingsScreen from "../../screens/settings/SettingsScreen";
import BusinessDetailsScreen from "../../screens/BusinessDetailsScreen";
import ShopScreen from "../../screens/ShopScreen";
import OurTeamScreen from "../../screens/OurTeamScreen";
import BookingScreen from "../../screens/BookingScreen";
import HairBookLogo from "../HairBookLogo";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LikedProductsScreen from "../../screens/LikedProductsScreen";
import MapComponent from "../MapComponent";
import MyBookingsScreen from "../../screens/MyBookingsScreen";
import MyOrdersScreen from "../../screens/MyOrdersScreen";

const MainStack = () => {
  const SettingsNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator
        initialRouteName="settings"
        screenOptions={{ headerTitleAlign: "center" }}
      >
        <Stack.Screen
          name="settings"
          component={SettingsScreen}
          options={{ title: "הגדרות" }}
        />
      </Stack.Navigator>
    );
  };

  const ShopNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator initialRouteName="shop">
        <Stack.Screen
          name="shop"
          component={ShopScreen}
          options={{ title: "המוצרים שלנו" }}
        />
        <Stack.Screen
          name="liked products"
          component={LikedProductsScreen}
          options={{ title: "מוצרים שאהבת" }}
        />
      </Stack.Navigator>
    );
  };

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="דף הבית"
        screenOptions={({ navigation }) => ({
          headerTitle: (props) => (
            <>
              <TouchableOpacity onPress={() => navigation.navigate("דף הבית")}>
                <HairBookLogo {...props} />
              </TouchableOpacity>
            </>
          ),
          headerStyle: {
            backgroundColor: "#5C7FA9",
          },
          headerTintColor: "white",
          drawerPosition: "right",
          headerTitleAlign: "center",
          drawerStyle: { width: "70%" },
          headerRight: () => <DrawerToggleButton tintColor="white" />,
          headerLeft: () => null,
        })}
      >
        <Drawer.Screen
          name="דף הבית"
          component={HomeScreen}
          options={{
            drawerIcon: () => <Ionicons name="home" size={20} />,
            drawerLabelStyle: { textAlign: "right", fontSize: 17 },
          }}
        />
        <Drawer.Screen
          name="קביעת תור"
          component={BookingScreen}
          options={{
            drawerIcon: () => (
              <MaterialCommunityIcons name="human-queue" size={25} />
            ),
            drawerLabelStyle: { textAlign: "right", fontSize: 17 },
          }}
        />
        <Drawer.Screen
          name="חנות מוצרים"
          component={ShopNavigator}
          options={({ navigation }) => ({
            drawerIcon: () => <FontAwesome5 name="store" size={17} />,
            drawerLabelStyle: { textAlign: "right", fontSize: 17 },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("liked products")}
              >
                <MaterialCommunityIcons
                  style={{ marginLeft: 10 }}
                  size={25}
                  name="shopping-outline"
                  color="white"
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Drawer.Screen
          name="הצוות שלנו"
          component={OurTeamScreen}
          options={{
            drawerIcon: () => <AntDesign name="team" size={25} />,
            drawerLabelStyle: { textAlign: "right", fontSize: 17 },
          }}
        />
        <Drawer.Screen
          name="התורים שלי"
          component={MyBookingsScreen}
          options={{
            drawerIcon: () => <MaterialIcons name="queue" size={25} />,
            drawerLabelStyle: { textAlign: "right", fontSize: 17 },
          }}
        />
        <Drawer.Screen
          name="ההזמנות שלי"
          component={MyOrdersScreen}
          options={{
            drawerIcon: () => <Entypo name="shopping-cart" size={25} />,
            drawerLabelStyle: { textAlign: "right", fontSize: 17 },
          }}
        />
        <Drawer.Screen
          name="הגדרות"
          component={SettingsNavigator}
          options={{
            drawerIcon: () => <Ionicons name="settings" size={25} />,
            drawerLabelStyle: { textAlign: "right", fontSize: 17 },
          }}
        />
        <Drawer.Screen
          name="Business details"
          component={BusinessDetailsScreen}
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="Liked products"
          component={LikedProductsScreen}
          options={{ drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen
          name="map"
          component={MapComponent}
          options={{ drawerItemStyle: { height: 0 } }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;