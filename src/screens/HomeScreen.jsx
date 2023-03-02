import {
  View,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";

const HomeScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const images = [
    require("../../assets/images/image1.png"),
    require("../../assets/images/image2.png"),
    require("../../assets/images/image3.png"),
  ];

  return (
    <View
      style={{ backgroundColor: "white", flex: 1, flexDirection: "column" }}
    >
      <ScrollView>
        <View style={{ flex: 1, alignItems: "center" }}>
          <SliderBox
            images={images}
            autoplay={true}
            imageComponentStyle={{ borderRadius: 10 }}
          />
          <CustomButton
            onPress={() => navigation.navigate("Sign up")}
            text="לחץ כאן להתחברות או הרשמה"
          />
        </View>
      </ScrollView>
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
});

export default HomeScreen;
