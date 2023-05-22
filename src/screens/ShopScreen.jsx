import { View, StyleSheet, ScrollView, Alert } from "react-native";
import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/context";
import { Datepicker } from "@ui-kitten/components";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const ShopScreen = () => {
  const [products, setProducts] = useState([]);
  const [productAmount, setProductAmount] = useState(0);
  const [pickUpDate, setPickUpDate] = useState(new Date());

  const { user } = useContext(UserContext);

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
      .get(`${baseUrl}/Product?hairSalonId=${user.hairSalonId}`)
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
        console.log("Products:", products);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  };

  const handleFilter = (searchTerm) => {
    setProducts(
      products.filter((product) =>
        product.productName.toUpperCase().includes(searchTerm.toUpperCase())
      )
    );
  };

  const onClose = () => {
    setProductAmount(0);
  };

  const handleLikeProduct = async (product) => {
    try {
      const result = await AsyncStorage.getItem("likedProducts");
      console.log("result:", result);
      let likedProducts = [];
      if (result) {
        likedProducts = JSON.parse(result);
        console.log("parsed result:", likedProducts);
        for (let i = 0; i < likedProducts.length; i++) {
          const likedProduct = likedProducts[i];
          if (likedProduct.productNum === product.productNum) {
            Alert.alert(
              "This product is already on your favorites!",
              undefined
            );
            return; // Stop the execution of handleLikeProduct
          }
        }
      }
      likedProducts.push(product);
      console.log("after push:", likedProducts);
      await AsyncStorage.setItem(
        "likedProducts",
        JSON.stringify(likedProducts)
      );
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

  const orderProduct = (product) => {
    axios
      .put(
        `${baseUrl}/Product/UpdateNOrderProduct?id=${product.productNum}&phoneNum=${user.phoneNum}&amount=${productAmount}&date=2023-05-17T10%3A52%3A39.527Z&hairSalonId=${user.hairSalonId}`,
        {
          id: product.productNum,
          phoneNum: user.phoneNum,
          amount: productAmount,
          date: pickUpDate,
          hairSalonId: user.hairSalonId,
        }
      )
      .then((response) => {Alert.alert(`מספר ההזמנה שלך הוא ${response.data}`)})
      .catch((error) =>
        console.log("there was an error ordering the product", error)
      )
  };

  return (
    <ScrollView style={{ backgroundColor: "#f8f8f8" }}>
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
              key={product.productNum}
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
              trash={false}
              onPressOrder={() => orderProduct(product)}
              pickUpDate={pickUpDate}
              onSelectDate={(date) => setPickUpDate(date)}
              onPressDiffAmount={() => {
                productAmount === 0
                  ? null
                  : setProductAmount(productAmount - 1);
              }}
              onPressAddAmount={() => setProductAmount(productAmount + 1)}
              orderAmount={productAmount}
              onClose={() => setProductAmount(0)}
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
    backgroundColor: "#f8f8f8",
    marginTop: 50,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  product: {},
});

export default ShopScreen;
