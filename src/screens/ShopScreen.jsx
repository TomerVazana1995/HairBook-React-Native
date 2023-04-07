import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import ProductCard from "../components/ProductCard";
import picture1 from "../images/product1.jpg";
import picture2 from "../images/product2.jpg"

const ShopScreen = () => {
  return (
        <View style={styles.root}>
          <View style={{alignItems: "flex-end", marginVertical: 20}}>
            <Text style={{ fontSize: 20, fontWeight: "700"}}>
              מה תרצה להזמין?
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#E4E4E4",
              marginVertical: 10,
              padding: 5,
              width: "80%",
              borderRadius: 15,
              borderWidth: 2,
              borderColor: "#CDCDCD",
              justifyContent: "space-between",
            }}
          >
            <Ionicons name="search" color="rgb(120, 120, 120)" size={25} />
            <TextInput
              placeholder="חיפוש"
              placeholderTextColor="rgb(120, 120, 120)"
              style={{
                color: "rgb(120, 120, 120)",
                fontSize: 20,
                marginLeft: 10,
                width: "80%"
              }}
            />
          </View>
          <ScrollView>
            <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "center"}}>
              <ProductCard image={picture1}/>
              <ProductCard image={picture2}/>
              <ProductCard image={picture2}/>
              <ProductCard image={picture2}/>
              <ProductCard image={picture2}/>
              <ProductCard image={picture2}/>
            </View>
          </ScrollView>
        </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white"
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  product: {},
});

export default ShopScreen;
