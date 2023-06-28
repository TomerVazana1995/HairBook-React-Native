import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, {useState} from "react";

const BookingDetailsComponent = ({text, onPress, index, onPressIn}) => {

  const [color, setColor] = useState("white")
  return (
    <TouchableOpacity key={index} onPress={onPress} onPressIn={() => color === "#d4ffc7" ? setColor("white") : setColor("#d4ffc7")}>
      <View style={[styles.container, {backgroundColor: color}]}>
        <Text style={styles.text}>{text}</Text>
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
    width: 100,
    alignItems: "center"
  },
  text: {
    fontFamily: "Arial Hebrew",
    fontSize: 15,
  }
});

export default BookingDetailsComponent;
