import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Modal, Button } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Datepicker, Layout } from "@ui-kitten/components";

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
  trash,
  onPressDelete,
  onSelectDate,
  pickUpDate,
  onPressAddAmount,
  onPressDiffAmount,
  onClose,
  orderAmount,
  onPressOrder,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState("");
  const [productAmount, setProductAmount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [datePick, setDatePick] = useState(new Date());

  function closeModal() {
    setModalVisible(false);
  }

  //צריך להוסיף צבע אדום לאייקון לאחר שמשתמש אהב את המוצר, לבדוק אם המוצר קיים בזיכרון הלוקלי אם כן לרנדר את האייקון בצבע אדום לפני

  return (
    <View style={styles.root}>
      <View
        style={{
          justifyContent: "space-between",
          padding: 10,
          flexDirection: "row-reverse",
        }}
      >
        <TouchableOpacity onPress={onPress}>
          {isLiked ? (
            <AntDesign name="heart" size={15} color="red" />
          ) : (
            <AntDesign name="hearto" size={15} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressDelete}>
          {trash ? <Entypo name="trash" size={15} /> : null}
        </TouchableOpacity>
      </View>

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
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
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
          onClose={onClose}
          avoidKeyboard
          justifyContent="center"
          bottom="4"
          size="lg"
        >
          <Modal.Content
            borderWidth={1}
            borderColor="#CDCDCD"
            backgroundColor="white"
            width="70%"
          >
            <Modal.CloseButton onPress={closeModal} />
            <Modal.Header
              alignSelf="center"
              backgroundColor="white"
              width="100%"
              alignItems="center"
            >
              {name}
            </Modal.Header>
            <Modal.Body alignItems="center">
              <Image style={styles.image} source={image} resizeMode="contain" />
              <View>
                <Text style={{ textAlign: "center", fontWeight: 500 }}>
                  {description}
                </Text>
                <Text style={{ textAlign: "center", fontWeight: 500 }}>
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
                <TouchableOpacity onPress={onPressDiffAmount}>
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
                  <Text style={{ fontWeight: "bold" }}>{orderAmount}</Text>
                </View>
                <TouchableOpacity onPress={onPressAddAmount}>
                  <AntDesign name="plus" size={20} />
                </TouchableOpacity>
              </View>
              <Text>בחר תאריך לאסוף את המוצר</Text>
              <Datepicker date={pickUpDate} onSelect={onSelectDate} />
            </Modal.Body>
            <Modal.Footer justifyContent="center">
              <Button bgColor="#3770B4" width="80%" onPress={onPressOrder}>
                הזמן מוצר
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
    padding: 5,
  },
  price: {
    fontSize: 14,
    color: "#555",
    fontWeight: 600,
    paddingTop: 5,
  },
  amount: {
    fontSize: 14,
    color: "#555",
    fontWeight: 600,
    paddingBottom: 5,
  },
  cartButton: {
    alignItems: "center",
    backgroundColor: "#4f8fc6",
    paddingVertical: 5,
    width: "100%",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
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
