import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Heading, Avatar } from "native-base";
import CustomButton from "../components/CustomButton";

const SettingsScreen = () => {
  return (
    <View style={styles.root}>
      <View style={styles.header_container}>
        <Avatar
          source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          }}
          size="2xl"
        />
        <Text style={{ fontWeight: "bold", fontSize: 25, padding: 10 }}>
          מיכל גולדברג
        </Text>
        <CustomButton text='עדכן פרטים אישיים'/>
      </View>
      <View style={{backgroundColor: "#E4E4E4", width: "100%", padding: 10, alignItems: "flex-end"}}>
        <Text style={{color: "grey", fontWeight: "bold"}}>העדפות</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  header_container: {
    alignItems: "center",
    padding: 10,
  },
});

export default SettingsScreen;
