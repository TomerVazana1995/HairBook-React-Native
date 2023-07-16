import { View, StyleSheet, Text } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";
import CustomCarusel from "../components/CustomCarusel";
import { Button } from "native-base";
import NextQueue from "../components/NextQueue";
import { UserContext } from "../context/context";
import Message from "../components/Message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation();

  const { user } = useContext(UserContext);

  const [showMessage, setShowMessage] = useState(false);

  const data = [
    {
      image: require("../../assets/images/image1.png"),
    },
    {
      image: require("../../assets/images/image2.png"),
    },
    {
      image: require("../../assets/images/image3.png"),
    },
  ];

  useEffect(() => {
    checkFirstTime();
  }, []);

  async function checkFirstTime() {
    try {
      const check = await AsyncStorage.getItem("home");
      const flag = JSON.parse(check);
      console.log(flag);
      if ((flag === null) | undefined) {
        setShowMessage(true);
        await AsyncStorage.setItem("home", JSON.stringify(true));
      }
    } catch (error) {
      console.log(`error: ${error}`);
    }
  }

  return (
    <View
      style={{
        backgroundColor: "#f8f8f8",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <Text style={{ alignSelf: "center", fontSize: 20, paddingTop: 20 }}>
        {" "}
        שלום {user.firstName} 👋🏻
      </Text>
      <View style={{ marginTop: 50 }}>
        <CustomCarusel data={data} />
      </View>
      <View style={styles.navigationContainer}>
        <Button
          bg="#3770B4"
          width="40%"
          alignSelf="center"
          style={{ borderRadius: 5, marginHorizontal: 5 }}
          onPress={() => {
            navigation.navigate("map");
          }}
        >
          נווט אל העסק
        </Button>
        <Button
          variant="outline"
          width="40%"
          alignSelf="center"
          style={{ borderRadius: 5, marginHorizontal: 5 }}
          onPress={() => {
            navigation.navigate("Business details");
          }}
        >
          כתובת ויצירת קשר
        </Button>
      </View>
      <NextQueue />
      {showMessage && (
        <Message
          icon={<Entypo name="scissors" size={20} color="green"/>}
          title="שלום"
          text="ברוכים הבאים למספרה שלנו! כאן אתם יכולים לקבוע תור ללא שיחת טלפון, להזמין מוצרים מהחנות הדיגיטלית שלנו ולקבל עדכונים שוטפים ישירות מהאפליקציה"
          onPress={() => setShowMessage(false)}
        />
      )}
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "70%",
    alignSelf: "center",
    maxHeight: 300,
    maxWidth: 200,
  },
  footer: {
    justifyContent: "flex-end",
    flex: 1,
  },
  button: {
    margin: 10,
  },
  navigationContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 15,
  },
  image: {
    aspectRatio: 1,
    width: 60,
    height: 60,
    alignSelf: "center",
    margin: 10,
  },
});

export default HomeScreen;
