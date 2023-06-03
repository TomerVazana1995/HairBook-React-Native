import { View, Text, StyleSheet, ScrollView, LogBox } from "react-native";
import React, { useState } from "react";
import BookingComponent from "../components/BookingComponent";
import { Switch, HStack } from "native-base";

LogBox.ignoreLogs([
  "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
]);
const MyBookingsScreen = () => {

  const [future, setFuture] = useState(false);

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.root}>
        <Text style={styles.title}>התורים שלי</Text>
        <HStack style={{gap: 5}} alignItems="center" padding={3} marginBottom={5}>
          <Text>כל התורים</Text>
          <Switch onChange={() => setFuture((prev) => !prev)} />
          <Text>תורים עתידיים</Text>
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
  },
  title: {
    fontWeight: 500,
    fontSize: 30,
    marginBottom: 20,
  },
});

export default MyBookingsScreen;
