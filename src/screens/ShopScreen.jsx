import { View, StyleSheet, ScrollView, Alert } from "react-native";
import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/context";
import Message from "../components/Message";
import { useIsFocused } from "@react-navigation/native";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const ShopScreen = () => {
  const [products, setProducts] = useState([]);
  const [productAmount, setProductAmount] = useState(0);
  const [pickUpDate, setPickUpDate] = useState(new Date());
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [showMessage, setShowMessage] = useState(false);

  const { user } = useContext(UserContext);

  const navigation = useNavigation();

  const isFocused = useIsFocused()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: "חיפוש",
        onChangeText: (event) => searchFilterFunction(event.nativeEvent.text),
      },
    });
  }, [navigation]);

  useEffect(() => {
    getProductsDetails();
    checkFirstTime();
  }, [isFocused]);

  useEffect(() => {console.log(filteredProducts)}, [filteredProducts])

  //get all the products when the page is first rendered
  const getProductsDetails = () => {
    axios
      .get(`${baseUrl}/Product?hairSalonId=${user.hairSalonId}`)
      .then(function (response) {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .then(function () {
        console.log("Products:", products);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = products.filter((product) => {
        const productData = product.productName
          ? product.productName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return productData.indexOf(textData) > -1;
      });
      setFilteredProducts(newData);
    } else {
      setFilteredProducts(products);
    }
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
            Alert.alert("שמירת מוצר", "המוצר כבר שמור אצלך במועדפים", [
              {
                text: "אישור",
              },
            ]);
            return; // Stop the execution of handleLikeProduct
          }
        }
      }
      product.liked = true;
      likedProducts.push(product);
      console.log("after push:", likedProducts);
      await AsyncStorage.setItem(
        "likedProducts",
        JSON.stringify(likedProducts)
      );
      Alert.alert("שמירת מוצר", "שמרנו בשבילך את המוצר במועדפים", [
        {
          text: "אישור",
        },
      ]);
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
    var day = pickUpDate;
    day = day.toDateString();
    axios
      .put(
        `${baseUrl}/Product/UpdateNOrderProduct?id=${product.productNum}&phoneNum=${user.phoneNum}&amount=${productAmount}&date=${day}&hairSalonId=${user.hairSalonId}`,
        {
          id: product.productNum,
          phoneNum: user.phoneNum,
          amount: productAmount,
          date: pickUpDate,
          hairSalonId: user.hairSalonId,
        }
      )
      .then((response) => {
        Alert.alert("הזמנת מוצר", `מספר ההזמנה שלך הוא ${response.data}`, [
          {
            text: "אישור",
          },
        ]);
      })
      .catch((error) =>
        console.log("there was an error ordering the product", error)
      );
  };

  async function checkFirstTime() {
    try {
      const check = await AsyncStorage.getItem("shop");
      console.log(check);
      const flag = JSON.parse(check);
      console.log(flag);
      if ((flag === null) | undefined) {
        setShowMessage(true);
        await AsyncStorage.setItem("shop", JSON.stringify(true));
      }
    } catch (error) {
      console.log(`error: ${error}`);
    }
  }

  return (
    <ScrollView style={{ backgroundColor: "#f8f8f8" }}>
      <View style={styles.root}>
        <View style={{ alignItems: "flex-end", marginVertical: 20, zIndex: 1 }}>
          {showMessage && (
            <Message
              title="החנות שלנו 🛒"
              text="במסך זה נמצאים כל מוצרי העסק שלנו, אתם מוזמנים להסתכל ולחפש אחר מוצר ספציפי, אם אהבתם מוצר ואתם עדיין לא בטוחים אם להזמין אותו אתם יכולים לשמור אותו במועדפים ולהזמין בזמנכם החופשי"
              onPress={() => setShowMessage(false)}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {filteredProducts.map((product, index) => (
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
});

export default ShopScreen;
