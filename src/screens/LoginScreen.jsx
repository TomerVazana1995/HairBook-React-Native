import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import { Icon, Input } from "@ui-kitten/components";
import Footer from "../components/Footer";

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.text}>הזן מספר טלפון-נייד להתחברות</Text>
        <Input
            placeholder="טלפון - נייד"
            textAlign="right"
            style={{ margin: 10 }}
            accessoryLeft={(props) => <Icon {...props} name="phone-call" />}
          />
        <View style={styles.saveUserBox}>
           <Text>שמור משתמש</Text>
        </View>
        <CustomButton text='התחברות'/>
        <CustomButton type="TERTIARY" text="פעם ראשונה? לחץ כאן להרשמות" onPress={() => navigation.navigate("Sign up")}/>
      </View>
      <View style={styles.footer}>
      <Footer/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white"
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
  },
  footer: {
    justifyContent: "flex-end",
    flex: 1,
  }
});

export default LoginScreen;
