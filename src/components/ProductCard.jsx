import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import { AntDesign } from "@expo/vector-icons";

const ProductCard = ({ image, onPress }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={() => setIsLiked((prev) => !prev)}>
        <View
          style={{ alignItems: "flex-end", paddingRight: 10, paddingTop: 10 }}
        >
          {isLiked ? (
            <AntDesign name="heart" size={15} color="red" />
          ) : (
            <AntDesign name="hearto" size={15} />
          )}
        </View>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: "transparent",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <TouchableOpacity>
          <Image style={styles.image} source={image} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 2, alignItems: "center" }}>
        <Text>קרם לעיצוב שיער</Text>
        <Text>₪ 249.99</Text>
        <View style={{ flexDirection: "row", margin: 10 }}>
          <AntDesign style={{ marginHorizontal: 2 }} name="staro" />
          <AntDesign style={{ marginHorizontal: 2 }} name="staro" />
          <AntDesign style={{ marginHorizontal: 2 }} name="staro" />
          <AntDesign style={{ marginHorizontal: 2 }} name="staro" />
          <AntDesign style={{ marginHorizontal: 2 }} name="staro" />
        </View>
        <Text style={{ padding: 10 }}>כמות במלאי: 5</Text>
        <TouchableOpacity onPress={onPress}>
          <View style={{alignItems: "center"}}>
            <AntDesign name="shoppingcart" size={20} />
            <Text>הזמן מוצר</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    margin: 10,
    shadowOffset: {  height: 1 },
    shadowOpacity: 1,
    shadowColor: "grey",
    shadowRadius: 5,
    borderRadius: 10,
    paddingBottom: 5,
    borderWidth: 3,
    borderColor: "#FFFEFE"
  },
  image: {
    backgroundColor: "transparent",
    width: "45%",
    height: undefined,
    aspectRatio: 1,
  },
});

export default ProductCard;
