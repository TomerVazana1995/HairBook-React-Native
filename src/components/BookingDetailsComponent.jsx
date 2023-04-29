import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const BookingDetailsComponent = ({text, onPress, index}) => {
  return (
    <TouchableOpacity key={index} onPress={onPress}>
      <View style={styles.container}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderWidth: 1,
    borderColor: "#CDCDCD", 
    padding: 10,
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "white",
    margin: 10,
    elevation: 5,
  },
});

export default BookingDetailsComponent;
