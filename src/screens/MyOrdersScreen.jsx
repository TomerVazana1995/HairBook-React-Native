import { View, Text, StyleSheet, ScrollView, LogBox } from "react-native";
import React, { useState } from "react";
import OrdersComponent from "../components/OrdersComponent";
import { HStack, Switch } from "native-base";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

LogBox.ignoreLogs([
  "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
]);

const MyOrdersScreen = () => {

  const [ future, setFuture ] = useState(false);

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
    <View style={styles.root}>
      <Text style={styles.title}>ההזמנות שלך</Text>
      <HStack style={{alignItems: "center", gap: 3}}>
        <Text>כל ההזמנות</Text>
        <Switch  onChange={() => setFuture((prev) => !prev)} />
        <Text>הזמנות שמחכות לך</Text>
      </HStack>
      <OrdersComponent future={future}/>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    gap: 10,
    padding: 10
  },
  title: {
    fontSize: 30,
    fontWeight: 500
  }
});

export default MyOrdersScreen;
