import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, {useState, useContext, useEffect} from "react";
import ProductCard from "../components/ProductCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LikedProductsScreen = () => {

  const [likedProducts, setLikedProducts] = useState([]);
 
  useEffect(() => {
    getLikedProducts();
  },[])

  const getLikedProducts = async () => {
    try {
      await AsyncStorage.getItem("likedProducts").then((likedProducts) => {
        console.log(likedProducts);
        setLikedProducts(likedProducts);
      }).catch((error) => console.log(error))
      return likedProducts
    } catch (error) {
      console.log(error)
    }
  }

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
        <View style={{ alignItems: "flex-end", marginVertical: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>מועדפים</Text>
        </View>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {likedProducts.map((product, index) => (
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
            ))}
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
