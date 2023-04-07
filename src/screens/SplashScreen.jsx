import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Picture from "../images/splash.jpg";
import { Button } from "native-base";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {

    const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <Image style={styles.image} source={Picture} />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Button
          marginRight={2}
          bgColor="#3770B4"
          onPress={() => navigation.navigate("Sign up")}
        >
          לחץ כאן להרשמה
        </Button>
        <Button
          marginLeft={2}
          variant="outline"
          onPress={() => navigation.navigate("Login")}
        >
          לחץ כאן להתחברות
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  image: {
    aspectRatio: 1,
    width: "70%",
    height: "40%",
    borderRadius: 10,
    margin: 20
  },
});

export default SplashScreen;
