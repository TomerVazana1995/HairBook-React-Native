import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "native-base";
import SettingsOption from "../../components/SettingsOption";
import { UserContext } from "../../context/context";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = () => {
  const userContext = useContext(UserContext);

  const logOut = () => {
    Alert.alert("התנתקות", "אתה בטוח שאתה רוצה להתנתק?", [
      {
        text: "ביטול",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "אישור",
        onPress: () => {
          {
            AsyncStorage.removeItem("keepLoggedIn"),
              AsyncStorage.removeItem("phoneNum"),
              userContext.setIsLoggedIn(false);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.root}>
      <View style={styles.header_container}>
        <Avatar
          source={{
            uri: userContext.user.image,
          }}
          size="2xl"
        />
        <Text style={{ fontWeight: "bold", fontSize: 25, padding: 10, flexDirection: "row-reverse" }}>
          {userContext.user.firstName} {userContext.user.lastName}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#E4E4E4",
          width: "100%",
          padding: 10,
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            color: "grey",
            fontWeight: "bold",
            fontSize: 20,
            paddingRight: 20,
          }}
        >
          אפשרויות
        </Text>
      </View>
      <SettingsOption icon="notifications" text="התנתק" onPress={logOut} />
      <SettingsOption icon="notifications" text="מחק משתמש" color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  header_container: {
    alignItems: "center",
    padding: 10,
  },
});

export default SettingsScreen;
