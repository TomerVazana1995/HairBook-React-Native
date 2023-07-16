import { View, Text, StyleSheet } from "react-native";
import React, {useState, useRef} from "react";
import { Button, Modal } from "native-base";

const Message = ({title, text, icon, onPress}) => {

  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row", gap: 5, justifyContent: "flex-end", alignItems: "center"}}>
      {icon}
      <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.text}>
        {text}
      </Text>
      <Button onPress={onPress} variant="outline" size="lg" w="50%" padding={1.5} margin={5} alignSelf="center">
        אישור
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "70%",
    borderWidth: 1,
    top: "30%",
    alignSelf: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    borderColor: "#CDCDCD",
    zIndex: 1
  },
  title: {
    fontWeight: 500,
    fontSize: 18,
  },
  text: {
    alignSelf: "flex-end",
    textAlign: "right"
  }
});

export default Message;
