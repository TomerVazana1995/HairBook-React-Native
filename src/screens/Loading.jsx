import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Spinner, Heading } from "native-base";

const Loading = () => {
  return (
    <View style={styles.container}>
      <Spinner size="lg" />
      <Heading marginTop={5}>
      <Text style={styles.text}>Loading</Text>
      </Heading>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "#0891b2",
  }
});

export default Loading;
