import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import ProductCard from "../components/ProductCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const LikedProductsScreen = () => {
  const [likedProducts, setLikedProducts] = useState([]);
  const [productsExists, setProductsExists] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([])

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: "חיפוש",
        onChangeText: (event) => searchFilterFunction(event.nativeEvent.text),
      },
    });
  }, [navigation]);

  useEffect(() => {
    getLikedProducts();
  }, [isFocused, likedProducts]);


  const searchFilterFunction = (text) => {
    if(text){
      const newData = likedProducts.filter(product => {
        const productData = product.productName ? 
         product.productName.toUpperCase() : ''.toUpperCase()
         const textData = text.toUpperCase()
         return productData.indexOf(textData) > -1
      })
      setFilteredProducts(newData)
    } else {
      setFilteredProducts(likedProducts)
    }
  }


  const getLikedProducts = async () => {
    await AsyncStorage.getItem("likedProducts", (err, result) => {
      if (result) {
        result = JSON.parse(result);
        setLikedProducts(result);
        setFilteredProducts(result)
        setProductsExists(true);
      }
    }).catch((error) => {
      console.log("the error is:", error);
    });
  };

  const handleDeleteProduct = async (product) => {
    try {
      const result = await AsyncStorage.getItem("likedProducts");
      console.log(result)
      let likedProducts = [];
      likedProducts = JSON.parse(result);
      let newLikedProducts = likedProducts.filter(
        (likedProduct) => likedProduct.productName !== product.productName
      );
      setLikedProducts(newLikedProducts);
      await AsyncStorage.setItem("likedProducts", JSON.stringify(newLikedProducts));
    } catch (error) { console.log(error)}
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
        <ScrollView style={{ marginTop: 100 }}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {productsExists ? (
              filteredProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  image={{ uri: product.image }}
                  price={product.price}
                  date={product.date}
                  name={product.productName}
                  description={product.description}
                  amount={product.amount}
                  trash={true}
                  onPressDelete={() => handleDeleteProduct(product)}
                />
              ))
            ) : (
              <Text>nothing</Text>
            )}
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
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  productContainer: {
    width: "100%",
  },
});

export default LikedProductsScreen;
