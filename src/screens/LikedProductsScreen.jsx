import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import ProductCard from "../components/ProductCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const LikedProductsScreen = () => {
  const [likedProducts, setLikedProducts] = useState([]);
  const [productsExists, setProductsExists] = useState(false);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: "חיפוש",
        onChangeText: (event) => console.log(event.target.value),
      },
    });
  }, [navigation]);

  useEffect(() => {
    getLikedProducts()   
  }, [isFocused]);

  const handleFilter = (searchTerm) => {
    setLikedProducts(
      likedProducts.filter((product) => product.productName.includes(searchTerm))
    );
  };

  const getLikedProducts = async () => {
    await AsyncStorage.getItem("likedProducts", (err, result) => {
      if (result) {
        result = JSON.parse(result);
        setLikedProducts(result);
        setProductsExists(true);
      }
    }).catch((error) => {
      console.log("the error is:", error);
    });
  };

  const toggleLike = (index) => {
    console.log(productsContext.products);
    setProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index ? { ...product, liked: !product.liked } : product
      )
    );
  };

  const toggleDate = (date, index) => {
    setProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index ? { ...product, date: date } : product
      )
    );
  };
  return (
    <>
      <View style={styles.root}>
        <View style={{ alignItems: "flex-end", marginVertical: 20, marginTop: 70 }}>
        </View>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {
              productsExists ?  likedProducts.map((product, index) => (
              <ProductCard
                key={index}
                image={{ uri: product.image }}
                price={product.price}
                date={product.date}
                onPressLike={() => {}}
                name={product.productName}
                description={product.description}
                amount={product.amount}
                onPickDate={() => {}}
              />
            )) : <Text>nothing</Text>
            }
           
          </View>
        </ScrollView>
      </View>
    </>
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
    fontSize: 30,
  },
});

export default LikedProductsScreen;
