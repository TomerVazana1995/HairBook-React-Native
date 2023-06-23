import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  LogBox,
} from "react-native";
import React, { useContext, useState, useEffect, useRef } from "react";
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
import { Dropdown } from "react-native-element-dropdown";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const data = [];

const SignUpScreen = () => {
  LogBox.ignoreAllLogs();

  const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

  const userContext = useContext(UserContext);

  const navigation = useNavigation();
  const isFocus = useIsFocused();

  const [phoneNum, setPhoneNum] = useState("");
  const [isIcon, setIsIcon] = useState(true);
  const [isImage, setIsImage] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [hairSalons, setHairSalons] = useState([]);
  const [selectedHairSalon, setSelectedHairSalon] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const min = new Date(1, 1, 1990);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    if (isFocus) {
      userContext
        .registerForPushNotificationsAsync()
        .then((token) => setExpoPushToken(token));

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }
  }, [isFocus]);

  useEffect(() => {
    getAllHairSalon();
  }, []);

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
        hairSalonId: selectedHairSalon.value,
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

  const getAllHairSalon = async () => {
    try {
      const response = await axios.get(`${baseUrl}/HairSalon/GetAllHairSalons`);
      setHairSalons(response.data);
      response.data.map((hairSalon) => {
        data.push({ lable: hairSalon.salonName, value: hairSalon.id });
      });
      console.log(hairSalons);
    } catch (error) {
      console.log(error);
    }
  };

  const renderLabel = () => {
    if (selectedHairSalon || isOpen) {
      return (
        <Text style={[{position: "absolute", right: 10} ,isOpen && { color: "#3495eb", position: "absolute", right: 10 }]}>מספרה</Text>
      );
    }
    return null;
  };

  const handleHairSalonChange = (item) => {
    setSelectedHairSalon(item);
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
              <View style={styles.dropdownContainer}>
                {renderLabel()}
                <Dropdown
                  style={[styles.dropdown, isOpen && { borderColor: "#3495eb" }]}
                  data={data}
                  maxHeight={300}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  placeholder={!isOpen ? "מספרה" : "..."}
                  labelField="lable"
                  valueField="value"
                  onFocus={() => setIsOpen(true)}
                  onBlur={() => setIsOpen(false)}
                  value={selectedHairSalon}
                  onChange={(item) => handleHairSalonChange(item)}
                  renderLeftIcon={() => (
                    <MaterialCommunityIcons
                    style={styles.icon}
                    color="#849aad"
                    name="hair-dryer"
                    size={30}
                  />
                  )}
                />
              </View>
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
  dropdown: {
    height: 45,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: "#F5F8FE",
  },
  dropdownContainer: {
    backgroundColor: "white",
    paddingVertical: 16,
    width: "100%",
  },
  selectedTextStyle: {
    fontSize: 15,
    textAlign: "right",
  },
  placeholderStyle: {
    fontSize: 15,
    color: "#79909C",
    position: "absolute",
    right: 20,
  },
});

export default SignUpScreen;
