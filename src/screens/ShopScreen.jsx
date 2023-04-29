import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, {
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const ShopScreen = () => {

  const [products, setProducts] = useState([]);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: "חיפוש",
        onChangeText : (event) => handleFilter(event.nativeEvent.text)
      }
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
        console.log(products);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const handleFilter = (searchTerm) => {
    setProducts(
      products.filter((product) =>
        product.productName.includes(searchTerm)
      )
    );
  };

  //need to fix!!!!!
  // async function handleLikeProduct(index) {
  //   const product = products[index];
  //   console.log("products number:", product.productNum);
  //   await AsyncStorage.getItem("likedProducts")
  //     .then((likedProducts) => {
  //       console.log("products already liked:", JSON.parse(likedProducts));
  //       let newLikedProducts = [];
  //       newLikedProducts.push(JSON.parse(likedProducts));
  //       console.log("this is new liked products", newLikedProducts);

  //       if (newLikedProducts) {
  //         const existingProduct = newLikedProducts.find((p) => {
  //           p.productNum === product.productNum, console.log("this is p", p);
  //         });
  //         console.log(existingProduct);
  //         if (!existingProduct) {
  //           newLikedProducts.push(product);
  //           AsyncStorage.setItem(
  //             "likedProducts",
  //             JSON.stringify(newLikedProducts)
  //           )
  //             .then(() => {
  //               console.log("Product added to likedProducts:", product);
  //             })
  //             .catch((error) => console.log(error));
  //         } else {
  //           console.log("Product already exists in likedProducts:", product);
  //         }
  //       } else {
  //         AsyncStorage.setItem("likedProducts", JSON.stringify(product))
  //           .then(() => {
  //             console.log("product saved");
  //           })
  //           .catch((error) => console.log(error));
  //       }
  //     })
  //     .catch((error) => console.log("the error is", error));
  // }

  const checkIfProductsExist = async () => {
    try {
      const existingProducts = await AsyncStorage.getItem("likedProducts");
      let likedProducts = JSON.parse(existingProducts);
      if (!existingProducts) likedProducts = [];
      return likedProducts;
    } catch (error) {
      console.log(error);
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
    
    <ScrollView style={{backgroundColor: "white"}}>
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
                handleLikeProduct(index);
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
