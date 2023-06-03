import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import { Icon, Input } from "@ui-kitten/components";
import Footer from "../components/Footer";
import { Checkbox, Modal, Button, CheckIcon, CloseIcon } from "native-base";
import axios from "axios";
import { UserContext } from "../context/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "../images/login.png";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { Pressable } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const data = [];

const LoginScreen = () => {
  const [phoneNum, setPhoneNum] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [OTPcode, setOTPCode] = useState(null);
  const [validCode, setValidCode] = useState(false);
  const [clearInputs, setClearInputs] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [hairSalons, setHairSalons] = useState([]);
  const [selectedHairSalon, setSelectedHairSalon] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { height } = useWindowDimensions();

  const navigation = useNavigation();

  const userContext = useContext(UserContext);

  useEffect(() => {
    getAllHairSalon();
  },[])

  const saveUserLoggedIn = async () => {
    if (isChecked) {
      await AsyncStorage.setItem("phoneNum", JSON.stringify(phoneNum));
      await AsyncStorage.setItem("keepLoggedIn", JSON.stringify(true));
    }
  };

  const getOTPcode = () => {
    //setClearInputs(false);
    setModalVisible(true);
    axios
      .get(`${baseUrl}/Client/GetCode?phoneNum=${phoneNum}`)
      .then(function (response) {
        console.log("your otp code",response.data);
        setOTPCode(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
            hairSalonId: response.data.hairSalonId
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

  function validCodeView() {
    setValidCode(true);
    setDisabled(false);
  }

  function notValidCodeView(){
    setValidCode(false)
    setDisabled(true)
  }

  const getAllHairSalon = async () => {
    try {
      const response = await axios.get(`${baseUrl}/HairSalon/GetAllHairSalons`);
      setHairSalons(response.data);
      response.data.map((hairSalon) => {
        data.push({ lable: hairSalon.salonName, value: hairSalon.id });
      })
      console.log(hairSalons)
    } catch (error) {
      console.log(error);
    }
  };

  const renderLabel = () => {
    if (selectedHairSalon || isOpen) {
      return (
        <Text style={[styles.label, isOpen && { color: "orange" }]}>
          Hair Salon
        </Text>
      );
    }
    return null;
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
              style={{ margin: 10, backgroundColor: "transparent" }}
              accessoryLeft={(props) => <Icon {...props} name="phone-call" />}
              onChangeText={(text) => setPhoneNum(text)}
              autoFocus={false}
            />
              <View style={styles.dropdownContainer}>
                {renderLabel()}
                <Dropdown
                  style={[styles.dropdown, isOpen && { borderColor: "orange" }]}
                  data={data}
                  maxHeight={300}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  placeholder={!isOpen ? "Select country" : "..."}
                  labelField="lable"
                  valueField="value"
                  onFocus={() => setIsOpen(true)}
                  onBlur={() => setIsOpen(false)}
                  value={selectedHairSalon}
                  onChange={(item) => handleHairSalonChange(item)}
                  renderLeftIcon={() => (
                    <AntDesign
                      style={styles.icon}
                      color="black"
                      name="Safety"
                      size={20}
                    />
                  )}
                />
              </View>
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
                  style={{
                    width: "80%",
                    height: 50,
                    alignSelf: "center",
                    marginBottom: 10,
                  }}
                  pinCount={4}
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeFilled={(code) => {
                    if(code == OTPcode){
                      alert("code is valid");
                      setDisabled(false);
                    }
                  }}
                  editable={true}
                  autoFocusOnLoad={false}
                  clearInputs={clearInputs}
                />
                {validCode ? (
                  <CheckIcon size="10" mt="0.5" color="emerald.500" />
                ) : (
                  <CloseIcon size="10" mt="0.5" color="red" />
                )}
                לא קיבלת קוד אימות?
                <Pressable>
                  <Text
                    style={{ textDecorationLine: "underline", color: "blue" }}
                  >
                    לחץ כאן
                  </Text>
                </Pressable>
              </Modal.Body>
              <Modal.Footer justifyContent="center">
                <Button
                  bgColor={disabled ? "blue.300" : "#3770B4"}
                  width="80%"
                  onPress={login}
                  disabled={disabled}
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
    color: "black",
  },
  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  dropdown: {
    height: 50,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  dropdownContainer: {
    backgroundColor: "white",
    paddingVertical: 16,
    width: "100%",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "lightgrey",
  },
});

export default LoginScreen;
