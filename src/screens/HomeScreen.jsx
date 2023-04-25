import { View, StyleSheet } from "react-native";
import React, {useContext, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";
import CustomCarusel from "../components/CustomCarusel";
import { Button } from "native-base";
import axios from "axios";
import { UserContext } from "../context/context";
import DatePicker from 'react-native-modern-datepicker';

const HomeScreen = () => {
  const baseUrl = "http://192.168.1.106/api";
  const navigation = useNavigation();

  const userContext = useContext(UserContext);

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
      style={{ backgroundColor: "white", flex: 1, flexDirection: "column" }}
    >
      <View style={{width: "100%", alignItems: "center"}}>
      <View
        style={{
          marginTop: 40,
          marginBottom: 30,
          width: "50%",
          alignItems: "center",
        }}
      >
        <Button
          alignSelf="center"
          variant="outline"
          style={{ borderRadius: 15, marginHorizontal: 10 }}
          onPress={() => {
            navigation.navigate("Business details");
          }}
        >
          כתובת ויצירת קשר
        </Button>
        <Button
          alignSelf="center"
          variant="outline"
          style={{ borderRadius: 15, marginHorizontal: 10 }}
          onPress={() => {
            navigation.navigate("map");
          }}
        >
          נווט אל העסק
        </Button>
      </View>
      </View>
      <View style={{ marginBottom: 30 }}>
        <CustomCarusel data={data} />
      </View>
      <View style={styles.footer}>
        <Footer/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
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
});

export default HomeScreen;
