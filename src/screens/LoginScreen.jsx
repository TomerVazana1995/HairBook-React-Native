import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import { Icon, Input } from "@ui-kitten/components";
import Footer from "../components/Footer";
import { Checkbox, Modal, Button } from "native-base";
import axios from "axios";
import { UserContext } from "../context/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "../images/login.png";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { Pressable } from "react-native";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const LoginScreen = () => {
  const [phoneNum, setPhoneNum] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [OTPcode, setOTPCode] = useState(null);

  const { height } = useWindowDimensions();

  const navigation = useNavigation();

  const userContext = useContext(UserContext);

  const saveUserLoggedIn = async () => {
    if (isChecked) {
      await AsyncStorage.setItem("phoneNum", JSON.stringify(phoneNum));
      await AsyncStorage.setItem("keepLoggedIn", JSON.stringify(true));
    } else if (!isChecked) {
      await AsyncStorage.removeItem("phoneNum");
      await AsyncStorage.removeItem("keepLoggedIn");
    }
  };

  const getOTPcode = () => {
    setModalVisible(true);
    axios.get(`${baseUrl}/Client/${phoneNum}`)
    .then(function (response){
      console.log(response.data);
      if(response.data.code){
        setOTPCode(response.data.code);
      }
    })
    .catch(function (error){
      console.log(error);
    })
  }

  const login = () => {
    axios
      .get(`${baseUrl}/Client/${phoneNum}`)
      .then(function (response) {
        // handle success
        console.log(response.data);
        if (response.data.phoneNum) {
          userContext.setIsLoggedIn(true);
          userContext.setUser({
            ...userContext.user,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            phoneNum: response.data.phoneNum,
            birthDate: response.data.birthDate,
            image: response.data.image,
            gender: response.data.gender,
          });
          console.log();
        }
        saveUserLoggedIn();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        <View style={styles.container}>
          <Image
            source={Login}
            resizeMode="contain"
            style={[styles.image, { height: height * 0.7 }]}
          />
          <Text style={styles.title}>הזן מספר טלפון-נייד להתחברות</Text>
          <View style={{ width: "70%" }}>
            <Input
              keyboardType="number-pad"
              value={phoneNum}
              placeholder="טלפון - נייד"
              textAlign="right"
              style={{ margin: 10 }}
              accessoryLeft={(props) => <Icon {...props} name="phone-call" />}
              onChangeText={(text) => setPhoneNum(text)}
           
              autoFocus={false}
            />
            <View style={styles.saveUserBox}>
              <Checkbox
                flexDirection="row-reverse"
                onChange={() => {
                  setIsChecked(!isChecked);
                }}
              >
                השאר אותי מחובר
              </Checkbox>
            </View>
          </View>
          <Button bgColor="#3770B4" onPress={getOTPcode}>
            שלח קוד לנייד
          </Button>
          <CustomButton
            type="TERTIARY"
            text="פעם ראשונה? לחץ כאן להרשמה"
            onPress={() => navigation.navigate("Sign up")}
          />
          <Modal
            isOpen={modalVisible}
            onClose={() => setModalVisible(false)}
            avoidKeyboard
            justifyContent="center"
            bottom="4"
            size="lg"
          >
            <Modal.Content>
              <Modal.CloseButton />
              <Modal.Header alignSelf="center">אימות משתמש</Modal.Header>
              <Modal.Body alignItems="center">
                נא הכנס את קוד בעל 4 ספרות שנשלח לנייד
                <OTPInputView
                placeholderTextColor="black"
                  style={{ width: "80%", height: 50, alignSelf: "center", marginBottom: 20 }}
                  pinCount={4}
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeFilled={(code) => {
                    console.log(`Code is ${code}, you are good to go!`);
                  }}
                  autoFocusOnLoad={false}
                />
                לא קיבל קוד אימות?<Pressable><Text style={{textDecorationLine: "underline", color: "blue"}}>לחץ כאן</Text></Pressable>
              </Modal.Body>
              <Modal.Footer justifyContent="center">
                <Button
                  bgColor="#3770B4"
                  width="80%"
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  המשך
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  image: {
    width: "100%",
    maxHeight: 400,
    aspectRatio: 1,
    top: -20,
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: "black",
    color: "black"
  },
  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});

export default LoginScreen;
