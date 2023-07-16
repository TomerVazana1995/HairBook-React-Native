import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/context";
import { useNavigation } from "@react-navigation/native";
import { Button } from "native-base";
import { useIsFocused } from "@react-navigation/native";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const OrdersComponent = ({ future = false }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [futureOrders, setFutureOrders] = useState([]);
  const { user } = useContext(UserContext);

  const isFocused = useIsFocused()

  const navigation = useNavigation();

  useEffect(() => {
    getAllOrderedProducts();
    getFutureOrders();
  }, [isFocused]);

  const getAllOrderedProducts = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/Product/GetOrderedProdByClient?hairSalonId=${user.hairSalonId}&phoneNum=${user.phoneNum}&flag=1`
      );
      console.log("all", response.data);
      setAllOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFutureOrders = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/Product/GetOrderedProdByClient?hairSalonId=${user.hairSalonId}&phoneNum=${user.phoneNum}&flag=0`
      );
      console.log("future", response.data);
      setFutureOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const AllOrders = () => {
    if (allOrders.length === 0) {
      return (
        <View style={{ gap: 30, width: "80%", paddingTop: 30 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              alignItems: "center",
              fontFamily: "Arial Hebrew",
            }}
          >
            עדיין לא הזמנת מהמוצרים שלנו? מהרו להזמין מהחנות שלנו
          </Text>
          <View style={{ alignItems: "center" }}>
            <Text style={{ textAlign: "center", fontSize: 17 }}>לחץ כאן להזמנת מוצר</Text>
            <Button
              w="70%"
              _text={{
                color: "#000",
                fontSize: "lg",
                alignItems: "center",
                letterSpacing: 1,
              }}
              bgColor="#91ED8F"
              onPress={() => navigation.navigate("חנות מוצרים")}
            >
              להזמנת מוצר
            </Button>
          </View>
        </View>
      );
    } else {
      return (
        <>
          {allOrders.map((order) => (
            <View style={styles.container} key={order.confirmNum}>
              <Text style={styles.title}>{order.name}</Text>
              <Image style={styles.image} source={{ uri: order.image }} />
              <View style={styles.contentContainer}>
                <Text style={styles.contentTitle}>{order.description}</Text>
                <View style={styles.bottomContainer}>
                  <Text style={styles.text}>כמות שהזמנת: {order.amount}</Text>
                  <Text style={styles.text}>מחיר כולל: {order.price}</Text>
                  <Text style={styles.text}>קוד מוצר: {order.confirmNum}</Text>
                </View>
              </View>
            </View>
          ))}
        </>
      );
    }
  };

  const FutureOrders = () => {
    if (futureOrders.length === 0) {
      return (
        <View style={{ gap: 30, width: "80%", paddingTop: 30 }}>
          <Text
            style={{ textAlign: "center", fontSize: 25, alignItems: "center" }}
          >
            נראה שאין הזמנות שמחכות על שמך, מהר להזמין לפני שנגמר המלאי
          </Text>
          <View style={{ alignItems: "center" }}>
            <Text style={{ textAlign: "center", fontSize: 17 }}>לחץ כאן להזמנת מוצר</Text>
            <Button
              w="70%"
              _text={{
                color: "#000",
                fontSize: "lg",
                alignItems: "center",
                letterSpacing: 1,
              }}
              bgColor="#91ED8F"
              onPress={() => navigation.navigate("חנות מוצרים")}
            >
              להזמנת מוצר
            </Button>
          </View>
        </View>
      );
    } else {
      return (
        <>
          {futureOrders.map((order) => (
            <View style={styles.container} key={order.confirmNum}>
              <Text style={styles.title}>{order.name}</Text>
              <Image style={styles.image} source={{ uri: order.image }} />
              <View style={styles.contentContainer}>
                <Text style={styles.contentTitle}>{order.description}</Text>
                <View style={styles.bottomContainer}>
                  <Text style={styles.text}>כמות שהזמנת: {order.amount}</Text>
                  <Text style={styles.text}>מחיר כולל: {order.price}</Text>
                  <Text style={styles.text}>קוד מוצר: {order.confirmNum}</Text>
                </View>
              </View>
            </View>
          ))}
        </>
      );
    }
  };

  return <>{!future ? <AllOrders /> : <FutureOrders />}</>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    gap: 10,
    width: "70%",
    borderColor: "#CDCDCD",
    shadowOffset: { height: 10 },
    shadowOpacity: 0.3,
    shadowColor: "#CDCDCD",
    borderRadius: 5,
  },
  image: {
    width: 40,
    height: 50,
  },
  title: {
    fontWeight: 600,
    fontSize: 18,
    paddingVertical: 10,
    fontFamily: "Arial Hebrew",
  },
  text: {
    textAlign: "center",
    fontFamily: "Arial Hebrew",
  },
  contentContainer: {
    alignItems: "center",
    textAlign: "center",
    width: "100%",
  },
  contentTitle: {
    textAlign: "center",
    padding: 15,
    fontSize: 20,
    fontFamily: "Arial Hebrew",
  },
  bottomContainer: {
    width: "100%",
    backgroundColor: "#d4ffc7",
    padding: 5,
    maxHeight: "100%",
    gap: 5,
  },
});

export default OrdersComponent;
