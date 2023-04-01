import { View, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  text,
  onPress,
  type = "PRIMARY",
  bgColor,
  fgColor,
}) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.container,
          styles[`container_${type}`],
          bgColor ? { backgroundColor: bgColor } : {},
        ]}
      >
        <Text style={[styles.text, styles[`text_${type}`], fgColor ? {color: fgColor} : {}]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    margin: 10
  },
  container: {
    borderRadius: 10
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    padding: "3%",
  },
  container_PRIMARY: {
    backgroundColor: "#3770B4",
  },
  container_TERTIARY: {},
  text_TERTIARY: {
    fontWeight: "normal",
    color: "#000",
  },
});

export default CustomButton;
