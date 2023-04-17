import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Modal, Button } from "native-base";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import DatePicker from "react-native-modern-datepicker";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const ProductCard = ({ onPress }) => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [amount, setAmount] = useState(0);
  const [datePickerVisivle, setDatePickerVisible] = useState(false);

  //get all the products when the page is first rendered
  const getProductsDetails = () => {
    axios
      .get(`${baseUrl}/Product`)
      .then(function (response) {
        // handle success
        console.log(response.data);
        const productsWithLiked = response.data.map((product) => ({
          ...product,
          liked: false,
          date: ""
        }));
        setProducts(productsWithLiked);
      })
      .then(function () {
        console.log(products);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const toggleLike = (index) => {
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

  useEffect(() => {
    getProductsDetails();
  }, []);

  return (
    <>
      {products.map((product, index) => (
        <View style={styles.root} key={index}>
          <TouchableOpacity onPress={() => toggleLike(index)}>
            <View
              style={{
                alignItems: "flex-end",
                paddingRight: 10,
                paddingTop: 10,
              }}
            >
              {product.liked ? (
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
              <Image
                style={styles.image}
                source={{ uri: product.image }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 2, alignItems: "center" }}>
            <Text>מחיר: {product.price} ש"ח</Text>
            <Text style={{ padding: 10 }}>כמות במלאי: {product.amount}</Text>
            <TouchableOpacity
              onPress={() => {
                setSelectedProduct(product), setModalVisible(true);
              }}
            >
              <View style={{ alignItems: "center" }}>
                <AntDesign name="shoppingcart" size={20} />
                <Text>הזמן מוצר</Text>
              </View>
            </TouchableOpacity>
            <Modal
              key={index}
              backdropVisible={false}
              isOpen={modalVisible}
              onClose={() => {
                setModalVisible(false), setAmount(0), setDatePickerVisible(false)
              }}
              avoidKeyboard
              justifyContent="center"
              bottom="4"
              size="lg"
            >
              <Modal.Content
                borderWidth={1}
                borderColor="#CDCDCD"
                backgroundColor="white"
                width="90%"
              >
                <Modal.CloseButton />
                <Modal.Header
                  alignSelf="center"
                  backgroundColor="white"
                  width="100%"
                  alignItems="center"
                >
                  {!datePickerVisivle
                    ? selectedProduct.productName
                    : "בחר תאריך לאסוף את המוצר"}
                </Modal.Header>
                <Modal.Body alignItems="center">
                  {!datePickerVisivle ? (
                    <>
                      <Image
                        style={styles.image}
                        source={{ uri: selectedProduct.image }}
                        resizeMode="contain"
                      />
                      <View>
                        <Text>{selectedProduct.description}</Text>
                      </View>
                      <Text style={{ marginTop: 10 }}>כמות</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            amount === 0 ? null : setAmount(amount - 1);
                          }}
                        >
                          <AntDesign name="minus" size={20} />
                        </TouchableOpacity>
                        <View
                          style={{
                            borderRadius: 5,
                            borderWidth: 2,
                            width: 30,
                            height: 30,
                            marginHorizontal: 10,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text style={{ fontWeight: "bold" }}>{amount}</Text>
                        </View>
                        <TouchableOpacity onPress={() => setAmount(amount + 1)}>
                          <AntDesign name="plus" size={20} />
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (<View style={{width: "100%", height: "100%", alignItems: "center"}}>
                       <DatePicker mode="calendar" onDateChange={(date) => {toggleDate(date, index)}} />
                    <Text>{product.date}</Text>
                  </View>   
                  )}
                </Modal.Body>
                <Modal.Footer justifyContent="center">
                  <Button
                    bgColor="#3770B4"
                    width="80%"
                    onPress={() => setDatePickerVisible(!datePickerVisivle)}
                  >
                    {datePickerVisivle ? "בחר תאריך" : "הזמן מוצר"}
                  </Button>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </View>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    margin: 10,
    shadowOffset: { height: 1 },
    shadowOpacity: 1,
    shadowColor: "grey",
    borderRadius: 10,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: "#CDCDCD",
    elevation: 5,
  },
  image: {
    backgroundColor: "transparent",
    width: "45%",
    height: undefined,
    aspectRatio: 1,
  },
});

export default ProductCard;
