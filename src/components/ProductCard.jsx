import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from "react-native";
import React from "react";
import { Box, Container, Heading, Center } from "native-base";
import Picture from "../../src/images/product1.jpg";
import { AntDesign } from '@expo/vector-icons';

const ProductCard = ({image}) => {

  return (
  <View style={styles.root}>
    <View style={{backgroundColor: "transparent", alignItems: "center", paddingVertical: 20}}>
      <TouchableOpacity>
           <Image style={styles.image} source={image} resizeMode="contain"/>
    </TouchableOpacity>
    </View>
    <View style={{flex: 2, alignItems: "center"}}>
        <Text>קרם לעיצוב שיער</Text>
        <Text>₪ 249.99</Text>
        <View style={{flexDirection: "row", margin: 20}}>
            <AntDesign style={{marginHorizontal: 2}} name="staro"/>
            <AntDesign style={{marginHorizontal: 2}} name="staro"/>
            <AntDesign style={{marginHorizontal: 2}} name="staro"/>
            <AntDesign style={{marginHorizontal: 2}} name="staro"/>
            <AntDesign style={{marginHorizontal: 2}} name="staro"/>
        </View>
    </View>
  </View>
  )
};

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        backgroundColor: "white",
        margin: 10,
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 1,
        shadowColor: "grey",
        shadowRadius: 10,
        borderRadius: 20,
    },
    image: {
       backgroundColor: "transparent",
       width: "45%", 
       height: undefined,
       aspectRatio: 1
    }
})

export default ProductCard;
