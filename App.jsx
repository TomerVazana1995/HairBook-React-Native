import "react-native-gesture-handler";
import { View, Text, Button } from "react-native";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { I18nManager } from "react-native";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./src/components/AppNavigator";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import * as theme from "./src/config/theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserContext } from "./src/context/context";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Use } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "./src/screens/Loading";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// // Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
// async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: "default",
//     title: "Original Title",
//     body: "And here is the body!",
//     data: { someData: "goes here" },
//   };

//   await fetch("https://exp.host/--/api/v2/push/send", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Accept-encoding": "gzip, deflate",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(message),
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Device.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       alert("Failed to get push token for push notification!");
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert("Must use physical device for Push Notifications");
//   }

//   if (Platform.OS === "android") {
//     Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }

//   return token;
// }

export default function App() {
  // const [expoPushToken, setExpoPushToken] = useState("");
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setExpoPushToken(token)
  //   );

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  //check if the user is logged in when the application is loading

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phoneNum: "",
    image:
      "data:image/png;base64,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",
    birthDate: new Date(),
    gender: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500)
  },[])

  
  useLayoutEffect(() => {
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
  }, []);



  return (
    <>{ isLoading ? (<NativeBaseProvider><Loading/></NativeBaseProvider>) :(
    <SafeAreaProvider>
      <React.Fragment>
        <NativeBaseProvider>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
            <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
              <AppNavigator />
            </UserContext.Provider>
          </ApplicationProvider>
        </NativeBaseProvider>
      </React.Fragment>
    </SafeAreaProvider>
  )
}
    </>


    //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
    //   <Text>Your expo push token: {expoPushToken}</Text>
    //   <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    //     <Text>Title: {notification && notification.request.content.title} </Text>
    //     <Text>Body: {notification && notification.request.content.body}</Text>
    //     <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
    //   </View>
    //   <Button
    //     title="Press to Send Notification"
    //     onPress={async () => {
    //       await sendPushNotification(expoPushToken);
    //     }}
    //   />
    // </View>
    // <React.Fragment>
    // <NativeBaseProvider>
    //   <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
    //     <UserContext.Provider value={{ user, setUser }}>
    //       <AuthStack />
    //     </UserContext.Provider>
    //   </ApplicationProvider>
    // </NativeBaseProvider>
    // </React.Fragment>
  );
}
