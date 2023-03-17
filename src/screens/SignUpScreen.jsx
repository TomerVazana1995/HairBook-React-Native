import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";
import PickImageComponent from "../components/PickImageComponent";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Datepicker, Input, Icon } from "@ui-kitten/components/ui";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

const SignUpScreen = ({ navigation }) => {
  const baseUrl = "http://192.168.1.106/api";

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phoneNum: "",
    image: null,
    birthDate: Date(),
    gender: "",
  });
  const [isIcon, setIsIcon] = useState(true);
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);

  const [selectedGender, setSelectedGender] = useState("");

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
      setImage(result.assets[0].uri);
      setIsIcon(false);
    }
  };

  //save the new user information in the database
  const CreateUser = () => {
    axios
      .post(`${baseUrl}/Clients`, {
        user: user,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <ScrollView>
    <View style={styles.wraper}>
      <View style={styles.container}>
        <PickImageComponent
          isIcon={isIcon}
          isImage={isImage}
          onPress={pickImage}
        />
        {image && (
          <View style={{ height: 100, width: 100, borderRadius: 50 }}>
            <Image style={styles.image} source={image} resizeMode="contain" />
          </View>
        )}
        <View style={{width: "70%", marginVertical: 15}}>
          <Input
            value={user.firstName}
            placeholder="שם פרטי"
            textAlign="right"
            style={{ margin: 10 }}
            onChangeText={(text) => setUser({ ...user, firstName: text })}
            accessoryLeft={(props) => <Icon {...props} name="person" />}
          />
          <Input
            value={user.lastName}
            placeholder="שם משפחה"
            textAlign="right"
            style={{ margin: 10 }}
            onChangeText={(text) => setUser({ ...user, lastName: text })}
            accessoryLeft={(props) => <Icon {...props} name="people" />}
          />
          <Input
            value={user.phoneNum}
            placeholder="טלפון - נייד"
            textAlign="right"
            style={{ margin: 10 }}
            onChangeText={(text) => setUser({ ...user, phoneNum: text })}
            accessoryLeft={(props) => <Icon {...props} name="phone-call" />}
          />
          <Datepicker
            placeholder="תאריך לידה"
            style={{ margin: 10 }}
            onSelect={(text) => setUser({ ...user, birthDate: text })}
            accessoryLeft={(props) => <Icon {...props} name="calendar" />}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 15}}>
          <TouchableOpacity
            onPress={() => {
              setSelectedGender("Male"),
                setUser({ ...user, gender: selectedGender });
            }}
          >
            <View
              style={[
                styles.card,
                selectedGender === "Male" && {
                  borderColor: "#5D9FED",
                  backgroundColor: "#C4DCF8",
                },
              ]}
            >
              <Ionicons
                name="man-outline"
                size={50}
                style={selectedGender === "Male" && { color: "#5D9FED" }}
              />
              <Text
                style={[
                  styles.gender_text,
                  selectedGender === "Male" && { color: "#5D9FED" },
                ]}
              >
                זכר
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedGender("Female"),
                setUser({ ...user, gender: selectedGender });
            }}
          >
            <View
              style={[
                styles.card,
                selectedGender === "Female" && {
                  borderColor: "#D663C3",
                  backgroundColor: "#F5DEF7",
                },
              ]}
            >
              <Ionicons
                name="woman-outline"
                size={50}
                style={selectedGender === "Female" && { color: "#D663C3" }}
              />
              <Text
                style={[
                  styles.gender_text,
                  selectedGender === "Female" && { color: "#D663C3" },
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
      <View style={{ justifyContent: "flex-end", flex: 1 }}>
        <Footer />
      </View>
    </View>
    </ScrollView>
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
});

export default SignUpScreen;
