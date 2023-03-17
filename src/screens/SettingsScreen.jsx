import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Heading, Avatar } from "native-base";

const SettingsScreen = () => {
  return (
    <View style={styles.root}>
      <View style={{padding: 10}}>
        <Avatar source={{
      uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    }} size="2xl" />

       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
});

export default SettingsScreen;
