import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import CustomButton from "../components/CustomButton";
import { Icon, Input } from "@ui-kitten/components";
import Footer from "../components/Footer";
import { Checkbox } from "native-base";
import axios from "axios";
import { UserContext } from "../context/context";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";


const LoginScreen = ({ navigation }) => {
  const [phoneNum, setPhoneNum] = useState("");
  const userContext = useContext(UserContext);

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

  const getUser = () => {
    axios.get(`${baseUrl}/Client/${phoneNum}`)
  .then(function (response) {
    // handle success
   console.log(response.data.phoneNum);
   if(phoneNum === response.data.phoneNum){
    userContext.setUser({...userContext.user, phoneNum: response.data.phoneNum})
   }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  }

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>הזן מספר טלפון-נייד להתחברות</Text>
        <View style={{width: "70%"}}>
        <Input
          value={phoneNum}
          placeholder="טלפון - נייד"
          textAlign="right"
          style={{ margin: 10}}
          // accessoryLeft={(props) => <Icon {...props} name="phone-call" />}
          keyboardType="number-pad"
          onChangeText={(text) => setPhoneNum(text)}
        />
        <View style={styles.saveUserBox}>
          {/* <Text>שמור משתמש</Text> */}
          <Checkbox flexDirection="row-reverse">שמור משתמש</Checkbox>
        </View>
        </View>
        <CustomButton text="התחברות" onPress={getUser}/>
        <CustomButton
          type="TERTIARY"
          text="פעם ראשונה? לחץ כאן להרשמה"
          onPress={() => navigation.navigate("Sign up")}
        />
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
  title: {
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: "5%",
    paddingBottom: "15%"
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
