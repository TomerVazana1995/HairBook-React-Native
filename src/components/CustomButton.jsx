import { View, Text, Pressable, StyleSheet } from "react-native";
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
      <Pressable
        onPress={onPress}
        style={[
          styles.container,
          styles[`container_${type}`],
          bgColor ? { backgroundColor: bgColor } : {},
        ]}
      >
        <Text style={[styles.text, styles[`text_${type}`], fgColor ? {color: fgColor} : {}]}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    padding: "3%",
  },
  root: {
    alignItems: "center",
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
