import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import Picture from "../../src/images/product1.jpg";
import { AntDesign } from '@expo/vector-icons';

const ProductCard = ({image}) => {

  const [isLiked, setIsLiked] = useState(false);

  return (
  <View style={styles.root}>
    <TouchableOpacity onPress={() => setIsLiked(prev => !prev)}>
       <View style={{alignItems: "flex-end", paddingRight: 10, paddingTop: 10}}>
      { isLiked ?
        <AntDesign name="heart" size={15} color="red"/> : <AntDesign name="hearto" size={15}/> 
      }
    </View>
    </TouchableOpacity>
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
        backgroundColor: "white",
        margin: 10,
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 1,
        shadowColor: "grey",
        shadowRadius: 5,
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
