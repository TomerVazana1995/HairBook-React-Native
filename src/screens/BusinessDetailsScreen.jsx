import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MapComponent from "../components/MapComponent";
import { Heading, Button } from "native-base";
import CustomButton from "../components/CustomButton";

const BusinessDetailsScreen = () => {
  return (
    <View style={styles.root}>
      <Heading textAlign="center" padding={15}>
        <Text style={styles.title}>קצת עלינו</Text>
      </Heading>
      <View style={styles.map_container}>
        <MapComponent />
      </View>
      <View style={{ textAlign: "flex-end", marginBottom: 10 }}>
        <Text style={styles.text}><Text style={{fontWeight: "bold"}}> כתובת:</Text> ויצמן 42, כפר סבא</Text>
        <Text style={styles.text}><Text style={{fontWeight: "bold"}}>זמני פעילות:</Text> א' - ה' 8:00-19:00</Text>
        <Text style={styles.text}><Text style={{fontWeight: "bold"}}>טלפון: </Text> 055-5555555</Text>
      </View>
      <Button width="50%" alignSelf="center" backgroundColor="#3770B4" onPress={() => {}}>נווט לבית העסק</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
    padding: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
  },
  map_container: {
    width: "100%",
    height: "40%",
    borderWidth: 1,
    marginBottom: 15,
    backgroundColor: "#F5F5F5",
  },
  text: {
    margin: 10,
    fontSize: 16, // decrease font size
  fontWeight: "normal", // change to normal weight
  }
});

export default BusinessDetailsScreen;
