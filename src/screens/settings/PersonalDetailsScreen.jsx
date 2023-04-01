import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useRef, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Input, FormControl, Button } from "native-base";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../../components/CustomButton";
import { UserContext } from "../../context/context";



const PersonalDetailsScreen = () => {
  const navigation = useNavigation();



  const userContext = useContext(UserContext);
  const firstName = useRef(userContext.user.firstName);
  const lastName = useRef(userContext.user.firstName);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      userContext.setUser({...userContext.user, image: result.assets[0].uri});
      console.log(selector.image);
    }
  };

  const handleFirstNameChange = (text) => {
    firstName.current = text;
    userContext.setUser({...userContext.user, firstName: text});
  };

  const handleLastNameChange = (text) => {
    lastName.current = text;
    userContext.setUser({...userContext.user, lasttName: text});
  };



  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.top_container}>
          <TouchableOpacity onPress={pickImage}>
            <Avatar
              source={{
                uri: userContext.user.image,
              }}
              size="2xl"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.main_container}>
          <FormControl>
            <FormControl.Label alignSelf="flex-end">שם פרטי</FormControl.Label>
            <Input
              value={firstName.current}
              bgColor="transparent"
              placeholder="שם פרטי"
              size="lg"
              onChangeText={handleFirstNameChange}
              padding={3}
              marginBottom={5}
              textAlign="right"
            />
            <FormControl.Label alignSelf="flex-end">שם משפחה</FormControl.Label>
            <Input
              value={lastName.current}
              bgColor="transparent"
              placeholder="שם משפחה"
              size="lg"
              onChangeText={handleLastNameChange}
              padding={3}
              marginBottom={5}
              textAlign="right"
            />
          </FormControl>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
        </View>
        <Button backgroundColor="#3770B4" width="50%" alignSelf="center">שמור פרטים</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  container: {
    flex: 1,
    margin: 20,
    width: "70%"
  },
  top_container: {
    alignItems: "center",
  },
  main_container: {},
  buttonContainer: {
    padding: 15,
    margin: 5,
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
  },
  gender_box: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "grey",
  },
});

export default PersonalDetailsScreen;
