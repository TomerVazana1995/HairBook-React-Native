import {
  View,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";
import CustomCarusel from "../components/CustomCarusel";
import { Button, Modal } from "native-base";
import axios from "axios";

const HomeScreen = ({ navigation }) => {

  const baseUrl = 'http://192.168.1.106/api';

  const [isMapModalVisible, setIsMapModalVisible] = useState(false);
  const { height } = useWindowDimensions();
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
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ flexDirection: "row", margin: 10 }}>
          <Button
            variant="outline"
            style={{ borderRadius: 15, marginHorizontal: 10 }}
            onPress={() => {setIsMapModalVisible(true), navigation.navigate('map')}}
          >
            לחץ לניווט
          </Button>
          <Button
            variant="outline"
            style={{ borderRadius: 15, marginHorizontal: 10 }}
          >
            כתובת ויצירת קשר
          </Button>
        </View>
        <CustomCarusel data={data} />
           <CustomButton
          onPress={() => navigation.navigate("Sign up")}
          text="לחץ כאן להתחברות או הרשמה"
        />
      </View>

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
  },
  header_container: {
    backgroundColor: "#5C7FA9",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
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
