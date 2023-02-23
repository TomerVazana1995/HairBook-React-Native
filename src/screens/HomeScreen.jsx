import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import React from "react";
import Logo from '../../assets/logo.png'

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <View style={styles.header_container}>
          <Image source={Logo}/>
        </View>
        <View style={{flex: 4}}></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5C7FA9",
  },
  header_container: {
    backgroundColor: "#5C7FA9",
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
    
  },
});

export default HomeScreen;
