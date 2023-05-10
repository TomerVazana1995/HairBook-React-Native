import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const ShopScreen = () => {
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [alreadyLiked, setAlreadyLiked] = useState(false);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: "חיפוש",
        onChangeText: (event) => handleFilter(event.nativeEvent.text),
      },
    });
  }, [navigation]);

  useEffect(() => {
    getProductsDetails();
  }, []);

  //get all the products when the page is first rendered
  const getProductsDetails = () => {
    axios
      .get(`${baseUrl}/Product`)
      .then(function (response) {
        // handle success
        console.log(response.data);
        const productsWithLikedAndDate = response.data.map((product) => ({
          ...product,
          liked: false,
          date: "",
        }));
        // setProducts(productsWithLikedAndDate);
        setProducts(productsWithLikedAndDate);
      })
      .then(function () {
        console.log("Products:" ,products);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const handleFilter = (searchTerm) => {
    setProducts(
      products.filter((product) => product.productName.toUpperCase().includes(searchTerm.toUpperCase()))
    );
  };

  const handleLikeProduct = async (product) => {
    try {
      const result = await AsyncStorage.getItem("likedProducts");
      console.log("result:", result);
      let likedProducts = [];
      if (result !== null) {
        likedProducts = JSON.parse(result);
        console.log("parsed result:", likedProducts);
        likedProducts.map((likedProduct) => {
          if (likedProduct.productNum === product.productNum) {
            setAlreadyLiked(true);
            Alert.alert(
              "This product is already on your favorites!",
              undefined,
              () => {
                setAlreadyLiked(false);
              }
            );
            return;
          }
        });
      } else {
        likedProducts.push(product);
        await AsyncStorage.setItem(
          "likedProducts",
          JSON.stringify(likedProducts)
        );
        setLikedProducts(likedProducts);
      }

    } catch (error) {
      console.log("Error: ", error);
    }
  };


  const toggleDate = (date, index) => {
    setProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index ? { ...product, date: date } : product
      )
    );
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.root}>
        <View style={{ alignItems: "flex-end", marginVertical: 20 }}></View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {products.map((product, index) => (
            <ProductCard
              key={index}
              index={index}
              image={{ uri: product.image }}
              price={product.price}
              date={product.date}
              name={product.productName}
              description={product.description}
              amount={product.amount}
              onPickDate={(date) => toggleDate(date, index)}
              onPress={() => {
                handleLikeProduct(product, index);
              }}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 50,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  product: {},
});

export default ShopScreen;
