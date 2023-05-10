import { View, Text, StyleSheet } from "react-native";
import React from "react";
import WorkerCard from "../components/WorkerCard";
import Footer from "../components/Footer";

const OurTeamScreen = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Our Team</Text>
      <WorkerCard />
      <View style={{ width: "100%", justifyContent: "flex-end", flex: 1 }}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 20,
  },
});

export default OurTeamScreen;
