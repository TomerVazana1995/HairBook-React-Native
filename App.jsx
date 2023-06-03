import "react-native-gesture-handler";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { I18nManager, Platform } from "react-native";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./src/components/AppNavigator";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import * as theme from "./src/config/theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserContext } from "./src/context/context";
import { ProductsContext } from "./src/context/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "./src/screens/Loading";
import axios from "axios";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { registerTranslation, he } from "react-native-paper-dates";

registerTranslation("he", he);

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken, action) {
  var notificationMessage;
  if(action === "reminder"){
    notificationMessage = `היי זו תזכורת לתור שלך`
  }
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "HairBook",
    body: notificationMessage,
    data: { someData: "goes here" },
  };

  console.log(message);

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export default function App() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phoneNum: "0504483376",
    image:
      "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png",
    birthDate: new Date(),
    gender: "",
    hairSalonId: 1,
    token: "ExponentPushToken[KQAdpMPHXzMN23pRkqRZYZ]",
  });

  
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getUserCredentials = async () => {
    try {
      const phoneNum = await AsyncStorage.getItem("phoneNum");
      if (phoneNum !== null) {
        return JSON.parse(phoneNum);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
    getUserCredentials()
      .then(function (phoneNum) {
        console.log(phoneNum);
        if (phoneNum) {
          axios
            .get(`${baseUrl}/Client/${phoneNum}`)
            .then(function (response) {
              console.log(response.data);
              setUser({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                phoneNum: response.data.phoneNum,
                birthDate: response.data.birthDate,
                image: response.data.image,
                gender: response.data.gender,
                hairSalonId: response.data.hairSalonId,
                token: response.data.token
              });
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          setUser({
            ...user,
            firstName: "",
            lastName: "",
            phoneNum: "0504483376",
            image:
              "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png",
            birthDate: new Date(),
            gender: "",
            hairSalonId: 1,
            token: "ExponentPushToken[KQAdpMPHXzMN23pRkqRZYZ]",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => console.log(user));
  }, []);

  useLayoutEffect(() => {
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <NativeBaseProvider>
          <Loading />
        </NativeBaseProvider>
      ) : (
        <SafeAreaProvider>
          <React.Fragment>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
              <NativeBaseProvider>
                <UserContext.Provider
                  value={{
                    user,
                    setUser,
                    isLoggedIn,
                    setIsLoggedIn,
                    sendPushNotification,
                    registerForPushNotificationsAsync,
                  }}
                >
                  <AppNavigator />
                </UserContext.Provider>
              </NativeBaseProvider>
            </ApplicationProvider>
          </React.Fragment>
        </SafeAreaProvider>
      )}
    </>
  );
}
