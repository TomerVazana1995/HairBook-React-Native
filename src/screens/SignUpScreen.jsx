import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useState } from "react";
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";
import PickImageComponent from "../components/PickImageComponent";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Datepicker, Input, Icon } from "@ui-kitten/components/ui";
import axios from "axios";
import { UserContext } from "../context/context";
import { FormControl, ScrollView, Checkbox, Button } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const SignUpScreen = () => {
  const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

  const userContext = useContext(UserContext);

  const navigation = useNavigation();
  const isFocus = useIsFocused();

  const [phoneNum, setPhoneNum] = useState("");
  const [isIcon, setIsIcon] = useState(true);
  const [isImage, setIsImage] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const min = new Date(1, 1, 1990);

  //if checkbox is checked save the phone number and logged in
  const saveUserLoggedIn = async () => {
    if (isChecked) {
      await AsyncStorage.setItem("phoneNum", JSON.stringify(phoneNum));
      await AsyncStorage.setItem("keepLoggedIn", JSON.stringify(true));
    }
  };

  //To open phone gallery when user icon is pressed
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      userContext.setUser({ ...userContext.user, image: result.assets[0].uri });
      setIsIcon(false);
      setIsImage(true);
    }
  };

  //save the new user information in the database
  const CreateUser = async () => {
    axios
      .post(`${baseUrl}/Client`, {
        firstName: userContext.user.firstName,
        lastName: userContext.user.lastName,
        phoneNum: phoneNum,
        birthDate: userContext.user.birthDate,
        image: userContext.user.image,
        gender: selectedGender,
        token: expoPushToken,
      })
      .then(function (response) {
        console.log(response.data);
        alert("user added");
        userContext.setIsLoggedIn(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    saveUserLoggedIn();
  };

  return (
    <View style={styles.wraper}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.container}>
          <PickImageComponent
            isIcon={isIcon}
            isImage={isImage}
            onPress={pickImage}
            image={userContext.user.image}
          />
          <View style={{ width: "70%", marginVertical: 15 }}>
            <FormControl>
              <KeyboardAvoidingView>
                <Input
                  value={userContext.user.firstName}
                  placeholder="שם פרטי"
                  textAlign="right"
                  style={{ marginVertical: 10 }}
                  onChangeText={(text) =>
                    userContext.setUser({
                      ...userContext.user,
                      firstName: text,
                    })
                  }
                  accessoryLeft={(props) => <Icon {...props} name="people" />}
                />
              </KeyboardAvoidingView>
              <Input
                value={userContext.user.lastName}
                placeholder="שם משפחה"
                textAlign="right"
                style={{ marginVertical: 10 }}
                onChangeText={(text) =>
                  userContext.setUser({ ...userContext.user, lastName: text })
                }
                accessoryLeft={(props) => <Icon {...props} name="people" />}
              />
              <Datepicker
                placeholder="תאריך לידה"
                style={{ marginVertical: 10 }}
                onSelect={(date) =>
                  userContext.setUser({ ...userContext.user, birthDate: date })
                }
                accessoryLeft={(props) => <Icon {...props} name="calendar" />}
              />
              <Input
                value={phoneNum}
                placeholder="טלפון - נייד"
                textAlign="right"
                style={{ marginTop: 10 }}
                onChangeText={(text) => setPhoneNum(text)}
                accessoryLeft={(props) => <Icon {...props} name="phone-call" />}
                keyboardType="number-pad"
              />
              <FormControl.HelperText alignSelf="flex-end">
                *נא הזן מספר טלפון בעל 10 ספרות
              </FormControl.HelperText>
            </FormControl>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 15,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedGender("זכר");
              }}
            >
              <View
                style={[
                  styles.card,
                  selectedGender === "זכר" && {
                    borderColor: "#5D9FED",
                    backgroundColor: "#C4DCF8",
                  },
                ]}
              >
                <Ionicons
                  name="man-outline"
                  size={50}
                  style={selectedGender === "זכר" && { color: "#5D9FED" }}
                />
                <Text
                  style={[
                    styles.gender_text,
                    selectedGender === "זכר" && { color: "#5D9FED" },
                  ]}
                >
                  זכר
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedGender("נקבה");
              }}
            >
              <View
                style={[
                  styles.card,
                  selectedGender === "נקבה" && {
                    borderColor: "#D663C3",
                    backgroundColor: "#F5DEF7",
                  },
                ]}
              >
                <Ionicons
                  name="woman-outline"
                  size={50}
                  style={selectedGender === "נקבה" && { color: "#D663C3" }}
                />
                <Text
                  style={[
                    styles.gender_text,
                    selectedGender === "נקבה" && { color: "#D663C3" },
                  ]}
                >
                  נקבה
                </Text>
              </View>
            </TouchableOpacity>
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
          <Button marginTop={5} bgColor="#3770B4" onPress={CreateUser}>
            שמור משתמש
          </Button>
          <CustomButton
            type="TERTIARY"
            text="יש משתמש קיים? לחץ כאן להתחברות"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </ScrollView>

      {/* <View style={{ justifyContent: "flex-end" }}>
        <Footer />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  wraper: {
    flex: 1,
    backgroundColor: "white",
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
    fontSize: 25,
  },
  image: {
    aspectRatio: 1,
    height: undefined,
  },
  icon: {
    width: 32,
    height: 32,
  },
  card: {
    borderWidth: 1,
    margin: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  gender_text: {
    fontWeight: "bold",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  saveUserBox: {
    flexDirection: "row-reverse",
    alignSelf: "center",
  },
});

export default SignUpScreen;
