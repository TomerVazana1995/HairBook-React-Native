import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";
import PickImageComponent from "../components/PickImageComponent";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import {
  Datepicker,
  Input,
  Icon,
  Popover,
  Layout,
} from "@ui-kitten/components/ui";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import * as SMS from "expo-sms";
import { UserContext } from "../context/context";

const SignUpScreen = ({ navigation }) => {
  const baseUrl = "http://192.168.1.106/api";

  const userContext = useContext(UserContext);

  // const [user, setUser] = useState({
  //   firstName: "",
  //   lastName: "",
  //   phoneNum: "",
  //   image: null,
  //   birthDate: "",
  //   gender: "",
  // });
  const [isIcon, setIsIcon] = useState(true);
  const [isImage, setIsImage] = useState(false);
  const [code, setCode] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");

  const renderToggleInput = () => (
    <Input
      value={userContext.user.phoneNum}
      placeholder="טלפון - נייד"
      textAlign="right"
      style={{ margin: 10 }}
      onChangeText={(text) =>
        userContext.setUser({ ...userContext.user, phoneNum: text })
      }
      accessoryLeft={(props) => <Icon {...props} name="phone-call" />}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    />
  );

  const checkPhoneInputIsValid = () => {};

  //To open phone gallery when user icon is pressed
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
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
  const CreateUser = () => {
    axios
      .post(`${baseUrl}/Clients`, {
        user: userContext.user,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const sendSMS = async () => {
    // Generate a random 4-digit code
    const code = Math.floor(Math.random() * 9000) + 1000;

    // Send the SMS message with the code
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        "", // phone numbers to send the message to (can be an array)
        `Your authentication code is ${code}` // message to send
      );
      console.log(result);
      if (result === "sent") {
        setCode(code);
      }
    }
  };

  return (

      <View style={styles.wraper}>
        <View style={styles.container}>
          <PickImageComponent
            isIcon={isIcon}
            isImage={isImage}
            onPress={pickImage}
            image={userContext.user.image}
          />
          <View style={{ width: "70%", marginVertical: 15 }}>
            <Input
              value={userContext.user.firstName}
              placeholder="שם פרטי"
              textAlign="right"
              style={{ margin: 10 }}
              onChangeText={(text) =>
                userContext.setUser({ ...userContext.user, firstName: text })
              }
              accessoryLeft={(props) => <Icon {...props} name="person" />}
            />
            <Input
              value={userContext.user.lastName}
              placeholder="שם משפחה"
              textAlign="right"
              style={{ margin: 10 }}
              onChangeText={(text) =>
                userContext.setUser({ ...userContext.user, lastName: text })
              }
              accessoryLeft={(props) => <Icon {...props} name="people" />}
            />
            <Datepicker
              placeholder="תאריך לידה"
              style={{ margin: 10 }}
              onSelect={(date) =>
                userContext.setUser({ ...userContext.user, birthDate: date })
              }
              accessoryLeft={(props) => <Icon {...props} name="calendar" />}
              date={userContext.user.birthDate}
            />
            <Popover
              visible={visible}
              anchor={renderToggleInput}
              onBackdropPress={() => setVisible(false)}
              placement="top"
            >
              <Layout style={styles.content}>
                <Text>מספר לדוגמא: 055-5555555</Text>
              </Layout>
            </Popover>
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
                setSelectedGender("זכר"),
                  userContext.setUser({
                    ...userContext.user,
                    gender: selectedGender,
                  }),
                  console.log(userContext.user);
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
                setSelectedGender("נקבה"),
                  userContext.setUser({
                    ...userContext.user,
                    gender: selectedGender,
                  }),
                  console.log(userContext.user);
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
          <CustomButton
            text="שמור משתמש"
            onPress={() => {
              CreateUser;
            }}
          />
          <CustomButton
            type="TERTIARY"
            text="יש משתמש קיים? לחץ כאן להתחברות"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
        <View style={{ justifyContent: "flex-end", flex: 1 }}>
          <Footer />
        </View>
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
});

export default SignUpScreen;
