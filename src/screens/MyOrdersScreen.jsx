import { View, Text, StyleSheet, ScrollView, Switch } from "react-native";
import React, { useState } from "react";
import OrdersComponent from "../components/OrdersComponent";
import { HStack } from "native-base";

const MyOrdersScreen = () => {
  const [future, setFuture] = useState(true);

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.root}>
        <Text style={styles.title}>ההזמנות שלך</Text>
        <HStack style={{ alignItems: "center", gap: 3 }}>
          <Text style={{fontFamily: "Arial Hebrew", fontSize: 16}}>כל ההזמנות</Text>
          <Switch value={future} onChange={() => setFuture((prev) => !prev)} />
          <Text style={{fontFamily: "Arial Hebrew", fontSize: 16}}>הזמנות שמחכות לך</Text>
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
    fontWeight: 400,
    fontSize: 40,
    marginBottom: 20,
    fontFamily: "Arial Hebrew",
    letterSpacing: 1,
  },
});

export default MyOrdersScreen;
