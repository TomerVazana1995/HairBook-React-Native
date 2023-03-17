import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { SocialIcon } from "@rneui/themed";

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>עקבו אחרינו</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity>
          <SocialIcon type="facebook" size={30} />
        </TouchableOpacity>
        <TouchableOpacity>
          <SocialIcon type="instagram" size={30} />
        </TouchableOpacity>
        <TouchableOpacity>
        <SocialIcon type="whatsapp" size={30} />  
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    paddingBottom: 30,
  },
  text: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 20,
    marginTop: 10,
  },
});
export default Footer;
