import { TouchableOpacity } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../../screens/SplashScreen";
import SignUpScreen from "../../screens/SignUpScreen";
import LoginScreen from "../../screens/LoginScreen";
import HairBookLogo from "../HairBookLogo";

const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={() => ({
          headerTitle: (props) => (
            <>
              <TouchableOpacity onPress={() => alert("hello")}>
                <HairBookLogo {...props} />
              </TouchableOpacity>
            </>
          ),
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#5C7FA9" },
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Sign up" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;