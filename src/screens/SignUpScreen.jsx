import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Header from "../components/Header";
import { FontAwesome } from '@expo/vector-icons';
import CustomInput from "../components/CustomInput";

const SignUpScreen = () => {
  return (
    <View style={styles.wraper}>
      <Header text="פתיחת משתמש" />
      <View style={styles.container}>
        <FontAwesome name='user-circle-o' size='100%'/>
        <CustomInput placeholder='שם פרטי'/>
        <CustomInput placeholder='שם משפחה'/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wraper: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    padding: '10%',
    
  }
})

export default SignUpScreen;
