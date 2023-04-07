import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../../screens/SplashScreen';
import SignUpScreen from '../../screens/SignUpScreen';
import LoginScreen from '../../screens/LoginScreen';

const AuthStack = () => {

const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='' screenOptions={{headerTitleAlign: "center"}}>
            <Stack.Screen name="Splash" component={SplashScreen}/>
            <Stack.Screen name="Sign up" component={SignUpScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthStack