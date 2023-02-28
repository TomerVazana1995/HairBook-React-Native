import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const Footer = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>עקבו אחרינו</Text>
      <View style={{flexDirection: "row"}}>
        <AntDesign style={{marginHorizontal: 15}} size={30} name="facebook-square"/>
        <AntDesign style={{marginHorizontal: 15}} size={30} name="instagram"/>
        <FontAwesome style={{marginHorizontal: 15}} size={30} name="whatsapp"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    paddingBottom: 30
  },
  text: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 20,
    marginTop: 10
  }
});
export default Footer;
