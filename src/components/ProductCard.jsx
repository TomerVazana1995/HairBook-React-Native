import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";


const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";


const ProductCard = ({ image, onPress }) => {
  const [isLiked, setIsLiked] = useState(false);

  //get all the products when the page is first rendered
  useEffect(() => {
    const getProductsDetails = () => {
      axios.get(`${baseUrl}/Product`)
    .then(function (response) {
      // handle success
     console.log(response.json());
    })
    .then(function (json) {
      console.log(json);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    }
  }, [])

  return (
    <ScrollView>

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
        <Text style={{ padding: 10 }}>כמות במלאי: 5</Text>
        <TouchableOpacity onPress={onPress}>
          <View style={{alignItems: "center"}}>
            <AntDesign name="shoppingcart" size={20} />
            <Text>הזמן מוצר</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    margin: 10,
    shadowOffset: {  height: 1 },
    shadowOpacity: 1,
    shadowColor: "grey",
    borderRadius: 10,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: "#CDCDCD",
    elevation: 5
  },
  image: {
    backgroundColor: "transparent",
    width: "45%",
    height: undefined,
    aspectRatio: 1,
  },
});

export default ProductCard;
