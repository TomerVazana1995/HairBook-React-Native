import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
} from "react-native";
import React, { useState} from "react";
import BookingComponent from "../components/BookingComponent";
import { HStack } from "native-base";

const MyBookingsScreen = () => {
  const [future, setFuture] = useState(true);

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.root}>
        <Text style={styles.title}>התורים שלי</Text>
        <HStack
          style={{ gap: 5 }}
          alignItems="center"
          padding={3}
          marginBottom={5}
        >
          <Text style={styles.option}>כל התורים</Text>
          <Switch value={future} onChange={() => setFuture((prev) => !prev)} />
          <Text style={styles.option}>תורים עתידיים</Text>
        </HStack>
        <BookingComponent future={future} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 30
  },
  title: {
    fontWeight: 400,
    fontSize: 40,
    marginBottom: 20,
    fontFamily: "Arial Hebrew",
    letterSpacing: 1,
  },
  option: {
    fontFamily: "Arial Hebrew",
    fontSize: 16
  }
});

export default MyBookingsScreen;
