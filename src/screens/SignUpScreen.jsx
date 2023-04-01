import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";
import PickImageComponent from "../components/PickImageComponent";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Datepicker, Input, Icon } from "@ui-kitten/components/ui";
import axios from "axios";
import * as SMS from "expo-sms";
import { UserContext } from "../context/context";
import { FormControl, ScrollView } from "native-base";

const SignUpScreen = ({ navigation }) => {
  const baseUrl = "https://proj.ruppin.ac.il/cgroup30/test1/api/Item";

  const userContext = useContext(UserContext);

  const [isIcon, setIsIcon] = useState(true);
  const [isImage, setIsImage] = useState(false);
  const [code, setCode] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [error, setError] = useState(false);

  const min = new Date(1, 1, 1990);

  //formatting the phone number to xxx-xxxxxxx format
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

  //save the formatted phone number of the user to save in the database
  const handleChangeText = (input) => {
    const formatted = handlePhoneNumFormat(input);
    userContext.setUser({ ...userContext.user, phoneNum: formatted });
  };

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
      .post(`${baseUrl}/Client`, {
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
              <Input
                value={userContext.user.firstName}
                placeholder="שם פרטי"
                textAlign="right"
                style={{ marginVertical: 10 }}
                onChangeText={(text) =>
                  userContext.setUser({ ...userContext.user, firstName: text })
                }
                accessoryLeft={(props) => <Icon {...props} name="person" />}
              />
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
                date={userContext.user.birthDate}
                min={min}
              />
              <Input
                value={userContext.user.phoneNum}
                placeholder="טלפון - נייד"
                textAlign="right"
                style={{marginTop: 10}}
                onChangeText={handleChangeText}
                accessoryLeft={(props) => <Icon {...props} name="phone-call" />}
                onFocus={() => setVisible(true)}
                onBlur={() => setVisible(false)}
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
          <CustomButton text="שמור משתמש" onPress={CreateUser} />
          <CustomButton
            type="TERTIARY"
            text="יש משתמש קיים? לחץ כאן להתחברות"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </ScrollView>
      <View style={{ justifyContent: "flex-end" }}>
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
