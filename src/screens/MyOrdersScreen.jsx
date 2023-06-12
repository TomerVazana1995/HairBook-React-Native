import { View, Text, StyleSheet, ScrollView, Switch } from "react-native";
import React, { useState } from "react";
import OrdersComponent from "../components/OrdersComponent";
import { HStack } from "native-base";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const MyOrdersScreen = () => {
  const [future, setFuture] = useState(true);

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.root}>
        <Text style={styles.title}>ההזמנות שלך</Text>
        <HStack style={{ alignItems: "center", gap: 3 }}>
          <Text style={{fontFamily: "Arial Hebrew"}}>כל ההזמנות</Text>
          <Switch value={future} onChange={() => setFuture((prev) => !prev)} />
          <Text style={{fontFamily: "Arial Hebrew"}}>הזמנות שמחכות לך</Text>
        </HStack>
        <OrdersComponent future={future} />
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
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 500,
    fontFamily: "Avenir Next"
  },
});

export default MyOrdersScreen;
