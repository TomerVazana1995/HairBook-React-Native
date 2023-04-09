import React, { useContext, useState, useEffect } from "react";
import MainStack from "./Navigation/MainStack";
import { UserContext } from "../context/context";
import AuthStack from './Navigation/AuthStack';
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppNavigator = () => {

  const userContext = useContext(UserContext);
  

  _retrieveData = async () => {
    try {
    const data = await AsyncStorage.getItem("keepLoggedIn");
    console.log(data);
    userContext.setIsLoggedIn(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    _retrieveData();
  },[])

  if(userContext.isLoggedIn){
    return <MainStack/>
  }
  else {
   return <AuthStack/>
  }
};

export default AppNavigator;
