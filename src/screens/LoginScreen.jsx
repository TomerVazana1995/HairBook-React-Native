import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import { Icon, Input } from "@ui-kitten/components";
import Footer from "../components/Footer";
import { Checkbox } from "native-base";

const LoginScreen = ({ navigation }) => {
  const [phoneNum, setPhoneNum] = useState("");

  const handlePhoneNumFormat = (input) => {
    const cleaned = ("" + input).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,7})(\d{0,})$/);
    if (!match) {
      return "";
    }
    const formatted =
      match[1] +
      (match[1] && match[2] ? "-" : "") +
      match[2] +
      (match[2] && match[3] ? "-" : "") +
      match[3];
    return formatted;
  };

  const handleChangeText = (input) => {
    const formatted = handlePhoneNumFormat(input);
    setPhoneNum(formatted);
  };

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.text}>הזן מספר טלפון-נייד להתחברות</Text>
        <Input
          value={phoneNum}
          placeholder="טלפון - נייד"
          textAlign="right"
          style={{ margin: 10 }}
          accessoryLeft={(props) => <Icon {...props} name="phone-call" />}
          keyboardType="number-pad"
          onChangeText={handleChangeText}
        />
        <View style={styles.saveUserBox}>
          {/* <Text>שמור משתמש</Text> */}
          <Checkbox flexDirection="row-reverse">שמור משתמש</Checkbox>
        </View>
        <CustomButton text="התחברות" />
        <CustomButton
          type="TERTIARY"
          text="פעם ראשונה? לחץ כאן להרשמה"
          onPress={() => navigation.navigate("Sign up")}
        />
      </View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
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
    flexDirection: "row-reverse",
    alignSelf: "flex-end",
    margin: 10,
  },
  footer: {
    justifyContent: "flex-end",
    flex: 1,
  },
});

export default LoginScreen;
