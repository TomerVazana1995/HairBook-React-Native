import { View, Text, StyleSheet } from "react-native";
import React from "react";

const NextQueue = ({date, time}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>התור הבא שלך</Text>
      <Text>{date}</Text>
      <Text>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {},
});

export default NextQueue;
