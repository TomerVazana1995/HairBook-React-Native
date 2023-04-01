import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import {  MaterialIcons } from "@expo/vector-icons";

const SettingsOption = ({ icon, onPress, text, visible, color }) => {
  return (
    <View style={{ width: "90%" }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row-reverse",
            }}
          >
            <Text style={[styles.text, { color: color }]}>{text}</Text>
            {visible && <MaterialIcons name="keyboard-arrow-left" size={30} />}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#CDCDCD",
  },
  text: {
    fontSize: 25,
  },
});

export default SettingsOption;
