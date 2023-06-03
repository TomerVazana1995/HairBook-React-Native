import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/context";


const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const OrdersComponent = ({ future = false }) => {

    const [allOrders, setAllOrders] = useState([]);
    const [futureOrders, setFutureOrders] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        getAllOrderedProducts();
        getFutureOrders();
      },[])
    
      const getAllOrderedProducts = async () => {
        try {
          const response = await axios.get(
            `${baseUrl}/Product/GetOrderedProdByClient?hairSalonId=${user.hairSalonId}&phoneNum=${user.phoneNum}&flag=1`
          );
          console.log("all", response.data)
          setAllOrders(response.data);
        } catch (error) {console.loh(error)}
      };
    
      const getFutureOrders = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/Product/GetOrderedProdByClient?hairSalonId=${user.hairSalonId}&phoneNum=${user.phoneNum}&flag=0`
              );
              console.log("future", response.data)
              setFutureOrders(response.data);
        } catch (error) {
            
        }
      }

  return (
    <>
      {!future ? allOrders.map((order) => (
        <View style={styles.container} key={order.confirmNum}>
            <Text style={styles.title}>{order.name}</Text>
             <Image style={styles.image} source={{uri: order.image}}/>
             <Text style={styles.text}>{order.description}</Text>
             <Text>כמות שהזמנת: {order.amount}</Text>
             <Text>מחיר כולל: {order.price}</Text>
             <Text>קוד מוצר: {order.confirmNum}</Text>
        </View>
      )): futureOrders.map((order) => (
        <View style={styles.container} key={order.confirmNum}>
        <Text style={styles.title}>{order.name}</Text>
         <Image style={styles.image} source={{uri: order.image}}/>
         <Text style={styles.text}>{order.description}</Text>
         <Text>כמות שהזמנת: {order.amount}</Text>
         <Text>מחיר כולל: {order.price}</Text>
         <Text>קוד מוצר: {order.confirmNum}</Text>
    </View>
      ))}
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        gap: 10,
        width: "60%", 
    },
    image: {
        width: 40,
        height: 50
    },
    title: {
        fontWeight: 600,
        fontSize: 15
    },
    text: {
        textAlign: "center",
    }
  });
  
export default OrdersComponent