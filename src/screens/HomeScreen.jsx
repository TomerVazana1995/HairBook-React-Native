import { View, StyleSheet, Text} from "react-native";
import React, {useContext} from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Footer from "../components/Footer";
import CustomCarusel from "../components/CustomCarusel";
import { Button } from "native-base";
import NextQueue from "../components/NextQueue";
import { UserContext } from "../context/context";

const HomeScreen = () => {
  const navigation = useNavigation();

  const {user} = useContext(UserContext)

  const data = [
    {
      image: require("../../assets/images/image1.png"),
    },
    {
      image: require("../../assets/images/image2.png"),
    },
    {
      image: require("../../assets/images/image3.png"),
    },
  ];

  return (
    <View
      style={{ backgroundColor: "#f8f8f8", flex: 1, flexDirection: "column", justifyContent: "space-evenly" }}
    >
      <Text style={{alignSelf: "center", fontSize: 20, paddingTop: 20}}> שלום {user.firstName} 👋🏻</Text>
      <View style={{ marginTop: 50 }}>
        <CustomCarusel data={data} />
      </View>
      <View style={styles.navigationContainer}>
        <Button
          bg="#3770B4"
          width="40%"
          alignSelf="center"
          style={{ borderRadius: 5, marginHorizontal: 5 }}
          onPress={() => {
            navigation.navigate("map");
          }}
        >
          נווט אל העסק
        </Button>
        <Button
          variant="outline"
          width="40%"
          alignSelf="center"
          style={{ borderRadius: 5, marginHorizontal: 5 }}
          onPress={() => {
            navigation.navigate("Business details");
          }}
        >
          כתובת ויצירת קשר
        </Button>
      </View>
      <NextQueue />
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: "70%",
    alignSelf: "center",
    maxHeight: 300,
    maxWidth: 200,
  },
  footer: {
    justifyContent: "flex-end",
    flex: 1,
  },
  button: {
    margin: 10,
  },
  navigationContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 15
  },
  image: {
    aspectRatio: 1,
    width: 60,
    height: 60,
    alignSelf: "center",
    margin: 10,
  },
});

export default HomeScreen;
