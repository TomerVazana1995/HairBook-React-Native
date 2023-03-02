import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Input } from "native-base";
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";

const SignUpScreen = ({navigation}) => {
  return (
    <View style={styles.wraper}>
      <View style={styles.container}>
        <FontAwesome name="user-circle-o" size={100} />
        <Input
          margin={5}
          textAlign="center"
          size="md"
          width="70%"
          placeholder="שם פרטי"
        />
        <Input
          margin={5}
          textAlign="center"
          size="md"
          width="70%"
          placeholder="שם משפחה"
        />
        <Input
          margin={5}
          textAlign="center"
          size="md"
          width="70%"
          placeholder="טלפון-נייד"
        />
        <Text style={styles.text}>תאריך לידה</Text>
        <View style={styles.birthDateBox}>
          <Input
            margin={3}
            textAlign="center"
            size="md"
            width="30%"
            placeholder="יום"
          />
          <Input
            margin={3}
            textAlign="center"
            size="md"
            width="30%"
            placeholder="חודש"
          />
          <Input
            margin={3}
            textAlign="center"
            size="md"
            width="30%"
            placeholder="שנה"
          />
        </View>
        <CustomButton text="שמור משתמש" />
        <CustomButton type="TERTIARY" text="יש משתמש קיים? לחץ כאן להתחברות" onPress={() => navigation.navigate("Login")}/>
      </View>
      <View style={{justifyContent: "flex-end", flex: 1}}>
        <Footer />
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
    padding: 20,
  },
  input: {
    padding: 10,
  },
  birthDateBox: {
    flexDirection: "row",
  },
  text: {
    fontWeight: "bold",
    fontSize: 25,
  },
});

export default SignUpScreen;
