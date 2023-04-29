import { View, StyleSheet, Image } from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";
import CustomCarusel from "../components/CustomCarusel";
import { Button } from "native-base";
import { UserContext } from "../context/context";
import * as Notifications from "expo-notifications";
import NavigationImage from "../images/navigate.png";
import DatePicker from "react-native-modern-datepicker";

const HomeScreen = () => {
  const navigation = useNavigation();

  //notifications
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  //   useEffect(() => {

  //     registerForPushNotificationsAsync()
  //       .then((token) => {
  //         setExpoPushToken(token);
  //       })
  //       .catch((error) => console.log("error is:", error));

  //     notificationListener.current =
  //       Notifications.addNotificationReceivedListener((notification) => {
  //         setNotification(notification);
  //       });

  //     responseListener.current =
  //       Notifications.addNotificationResponseReceivedListener((response) => {
  //         console.log(response);
  //       });

  //     return () => {
  //       Notifications.removeNotificationSubscription(
  //         notificationListener.current
  //       );
  //       Notifications.removeNotificationSubscription(responseListener.current);
  //     };

  // }, []);

  const { user, sendPushNotification, registerForPushNotificationsAsync } =
    useContext(UserContext);

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

  return (
    <View
      style={{ backgroundColor: "white", flex: 1, flexDirection: "column" }}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        <View
          style={{
            marginTop: 40,
            marginBottom: 30,
            width: "50%",
          }}
        >
          <Button
            variant="outline"
            style={{ borderRadius: 15, marginHorizontal: 10 }}
            onPress={() => {
              navigation.navigate("Business details");
            }}
          >
            כתובת ויצירת קשר
          </Button>
        </View>
      </View>
      <View style={{ marginBottom: 30 }}>
        <CustomCarusel data={data} />
      </View>
      <View style={styles.navigationContainer}>
        <Image
          style={styles.image}
          source={NavigationImage}
          resizeMode="contain"
        />
        <Button
          bg="#3770B4"
          width="50%"
          alignSelf="center"
          style={{ borderRadius: 15, marginHorizontal: 10 }}
          onPress={() => {
            navigation.navigate("map");
          }}
        >
          נווט אל העסק
        </Button>
      </View>
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
    justifyContent: "flex-end"
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
