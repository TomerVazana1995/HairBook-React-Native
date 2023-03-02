import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Input, Checkbox } from "native-base";
import CustomButton from "../components/CustomButton";

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.wraper}>
      <View style={styles.container}>
        <Text style={styles.text}>הזן מספר טלפון-נייד להתחברות</Text>
        <Input margin='5%' padding="5%" textAlign="center" width="50%" placeholder="טלפון-נייד"/>
        <View style={styles.saveUserBox}>
          
           <Text>שמור משתמש</Text>
        </View>
        <CustomButton text='התחברות'/>
        <CustomButton type="TERTIARY" text="פעם ראשונה? לחץ כאן להרשמות" onPress={() => navigation.navigate("Sign up")}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wraper: {
    flex: 1,
  },
  container: {
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: "5%",
  },
  saveUserBox: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    margin: 10
  }
});

export default LoginScreen;
