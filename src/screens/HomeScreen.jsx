import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React from "react";
import Logo from "../../assets/logo.png";
import CustomInput from "../components/CustomInput";
import { SliderBox } from "react-native-image-slider-box";
import CustomButton from "../components/CustomButton";
import {Input} from 'native-base'

const HomeScreen = ({navigation}) => {
  const { height } = useWindowDimensions();
  const images = [
    require("../../assets/images/image1.png"),
    require("../../assets/images/image2.png"),
    require("../../assets/images/image3.png"),
  ];

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={[styles.header_container, { height: height * 0.2 }]}>
        <Image
          style={[styles.logo, { height: height * 0.3 }]}
          source={Logo}
          resizeMode="contain"
        />
      </View>
      <ScrollView>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Input width='50%'/>
          <SliderBox
            images={images}
            autoplay={true}
            imageComponentStyle={{ borderRadius: 10 }}
          />
          <CustomButton onPress={() => navigation.navigate('Sign up')} text='לחץ כאן להתחברות או הרשמה'/>
        </View>
      </ScrollView>
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
});

export default HomeScreen;
