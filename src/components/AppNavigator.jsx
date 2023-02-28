import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import { Ionicons } from '@expo/vector-icons'; 
import HairBookLogo from "./HairBookLogo";


const AppNavigator = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerRight: () => (
            <View>
                <TouchableOpacity>
                    <Ionicons name="md-menu" size={28} color="white"/>
                </TouchableOpacity>
            </View>
        ),
        headerTitle: (props) => <HairBookLogo {...props}/>,
        headerStyle: {
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#5C7FA9",
        },
        headerTintColor: "white"
      }}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Sign up" component={SignUpScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
    logo: {
        width: "70%",
        alignSelf: "center",
        maxHeight: 300,
        maxWidth: 200,
    }
})

export default AppNavigator
