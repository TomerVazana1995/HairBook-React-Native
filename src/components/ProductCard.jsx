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
import React, { useState, useEffect, useContext } from "react";
import { Modal, Button } from "native-base";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import DatePicker from "react-native-modern-datepicker";
import { ProductsContext } from "../context/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const ProductCard = ({
  image,
  price,
  name,
  description,
  index,
  amount,
  onPress,
  Liked,
  date,
  onPickDate,
  product,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState("");
  const [productAmount, setProductAmount] = useState(0);
  const [datePickerVisivle, setDatePickerVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <View style={styles.root} key={index}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            alignItems: "flex-end",
            paddingRight: 10,
            paddingTop: 10,
          }}
        >
          {isLiked ? (
            <AntDesign name="heart" size={15} color="red" />
          ) : (
            <AntDesign name="hearto" size={15} />
          )}
        </View>
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
      <View
        style={{
          backgroundColor: "transparent",
          alignItems: "center",
        }}
      >
        <Image style={styles.image} source={image} resizeMode="contain" />
      </View>
      <View style={{ flex: 2, alignItems: "center" }}>
        <View
          style={{
            width: "100%",
            alignSelf: "baseline",
            alignItems: "flex-end",
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: "#EDEDED",
              width: "100%",
              justifyContent: "center",
              alignSelf: "baseline",
              textAlign: "center",
              bottom: 0,
            }}
          >
            <Text style={styles.price}>מחיר: {price} ש"ח</Text>
            <Text style={styles.amount}>כמות במלאי: {amount}</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                width: "100%",
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <View style={styles.cartButton}>
                <AntDesign color="white" name="shoppingcart" size={20} />
                <Text style={styles.cartButtonText}>הזמן מוצר</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          key={index}
          backdropVisible={false}
          isOpen={modalVisible}
          onClose={() => {
            setModalVisible(false),
              setProductAmount(0),
              setDatePickerVisible(false);
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
              {!datePickerVisivle ? name : "בחר תאריך לאסוף את המוצר"}
            </Modal.Header>
            <Modal.Body alignItems="center">
              {!datePickerVisivle ? (
                <>
                  <Image
                    style={styles.image}
                    source={image}
                    resizeMode="contain"
                  />
                  <View>
                    <Text>{description}</Text>
                    <Text style={{ textAlign: "center" }}>
                      מחיר: {price} ש"ח ליחידה
                    </Text>
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
                        productAmount === 0
                          ? null
                          : setProductAmount(productAmount - 1);
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
                        alignItems: "center"
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }}>
                        {productAmount}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => setProductAmount(productAmount + 1)}
                    >
                      <AntDesign name="plus" size={20} />
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                  }}
                >
                  <DatePicker mode="calendar" onDateChange={onPickDate} />
                  <Text>{date}</Text>
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
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    margin: 10,
    shadowOffset: { height: 1 },
    shadowOpacity: 1,
    shadowColor: "grey",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#CDCDCD",
    width: "43%",
  },
  image: {
    backgroundColor: "transparent",
    width: "45%",
    height: undefined,
    aspectRatio: 1,
  },
  name: {
    alignSelf: "center",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 13,
  },
  price: {
    fontSize: 14,
    color: "#555",
  },
  amount: {
    fontSize: 14,
    color: "#555",
  },
  cartButton: {
    alignItems: "center",
    backgroundColor: "#4f8fc6",
    paddingVertical: 5,
    width: "100%",
  },
  cartButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  modal: {
    borderWidth: 1,
    borderColor: "#CDCDCD",
    backgroundColor: "white",
    width: "90%",
  },
});

export default ProductCard;
