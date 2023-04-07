import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign
} from "@expo/vector-icons";
import HairBookLogo from "./HairBookLogo";
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from "@react-navigation/drawer";
import BookingScreen from "../screens/BookingScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import ShopScreen from "../screens/ShopScreen";
import BusinessDetailsScreen from "../screens/BusinessDetailsScreen";
import PersonalDetailsScreen from "../screens/settings/PersonalDetailsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OurTeamScreen from "../screens/OurTeamScreen";
import AuthStack from "./Navigation/AuthStack";
import MainStack from "./Navigation/MainStack";
import { UserContext } from "../context/context";

const AppNavigator = () => {

  const userContext = useContext(UserContext);

  if(userContext.user.phoneNum === '' || userContext.user.phoneNum === null){
    return <AuthStack/>
  }
  else {
   return <MainStack/>
  }
  // return (
  //   <NavigationContainer>
  //     <Drawer.Navigator
  //       initialRouteName="דף הבית"
  //       screenOptions={({ navigation }) => ({
  //         headerTitle: (props) => (
  //           <>
  //             <TouchableOpacity onPress={() => navigation.navigate("דף הבית")}>
  //               <HairBookLogo {...props} />
  //             </TouchableOpacity>
  //           </>
  //         ),
  //         headerStyle: {
  //           backgroundColor: "#5C7FA9",
  //         },
  //         headerTintColor: "white",
  //         drawerPosition: "right",
  //         headerTitleAlign: "center",
  //         drawerStyle: { width: "70%" },
  //         headerRight: () => <DrawerToggleButton tintColor="white" />,
  //         headerLeft: () => null,
  //       })}
  //     >
  //       <Drawer.Screen
  //         name="דף הבית"
  //         component={HomeScreen}
  //         options={{
  //           drawerIcon: () => <Ionicons name="home" size={15} />,
  //           drawerLabelStyle: { textAlign: "right" },
  //         }}
  //       />
  //       <Drawer.Screen
  //         name="קביעת תור"
  //         component={BookingScreen}
  //         options={{
  //           drawerIcon: () => (
  //             <MaterialCommunityIcons name="human-queue" size={20} />
  //           ),
  //           drawerLabelStyle: { textAlign: "right" },
  //         }}
  //       />
  //       <Drawer.Screen
  //         name="חנות מוצרים"
  //         component={ShopScreen}
  //         options={{
  //           drawerIcon: () => <FontAwesome5 name="store" size={15} />,
  //           drawerLabelStyle: { textAlign: "right" },
  //         }}
  //       />
  //       <Drawer.Screen
  //         name="הצוות שלנו"
  //         component={OurTeamScreen}
  //         options={{
  //           drawerIcon: () => (
  //             <AntDesign name="team" size={20} />
  //           ),
  //           drawerLabelStyle: { textAlign: "right" },
  //         }}
  //       />
  //       <Drawer.Screen
  //         name="הגדרות"
  //         component={SettingsNavigator}
  //         options={{
  //           drawerIcon: () => <Ionicons name="settings" size={20} />,
  //           drawerLabelStyle: { textAlign: "right" },
  //         }}
  //       />

  //       <Drawer.Screen
  //         name="Sign up"
  //         component={SignUpScreen}
  //         options={{ drawerItemStyle: { height: 0 } }}
  //       />
  //       <Drawer.Screen
  //         name="Login"
  //         component={LoginScreen}
  //         options={{ drawerItemStyle: { height: 0 } }}
  //       />
  //       <Drawer.Screen
  //         name="Business details"
  //         component={BusinessDetailsScreen}
  //         options={{ drawerItemStyle: { height: 0 } }}
  //       />
  //       {/* <Drawer.Screen
  //         name="Personal details"
  //         component={PersonalDetailsScreen}
  //         options={{ drawerItemStyle: { height: 0 } }}
  //       /> */}
  //     </Drawer.Navigator>
  //   </NavigationContainer>
  // );
};

export default AppNavigator;
