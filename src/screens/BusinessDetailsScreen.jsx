import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Heading, Button, Modal } from "native-base";
import Footer from "../components/Footer";
import axios from "axios";
import { UserContext } from "../context/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const BusinessDetailsScreen = () => {
  const [details, setDetails] = useState({});
  const [workTime, setWorkTime] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(false)

  const { user } = useContext(UserContext);

  const navigation = useNavigation();

  useEffect(() => {
    getBuisinessDetails();
    const flag = checkIfFirstTime()
    if(flag){
      setIsFirstTime(true)
    }
  }, []);

  const getBuisinessDetails = () => {
    //the business details
    axios
      .get(
        `${baseUrl}/HairSalon/getHairSalonInfo?hairSalonId=${user.hairSalonId}`
      )
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("buisiness details:", details);
      });

    //the business work time
    axios
      .get(
        `${baseUrl}/HairSalon/GetHairSalonWorkTime?hairSalonId=${user.hairSalonId}`
      )
      .then((response) => {
        const days = response.data;
        const dayNames = [
          "ראשון",
          "שני",
          "שלישי",
          "רביעי",
          "חמישי",
          "שישי",
          "שבת",
        ];
        days.sort((a, b) => parseInt(a.day) - parseInt(b.day));
        console.log("sorted days", days);

        const convertedData = days.map((item) => {
          const dayNumber = parseInt(item.day);
          const dayName = dayNames[dayNumber - 1];
          const convertedFromHour = item.fromHour.slice(0, 5);
          const convertedToHour = item.toHour.slice(0, 5);
          return {
            day: dayName,
            fromHour: convertedFromHour,
            toHour: convertedToHour,
          };
        });
        setWorkTime(convertedData);
        console.log("new data:", workTime);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function checkIfFirstTime(){
    try {
      const flag = await AsyncStorage.getItem("isLoggedInBefore");
      flag = JSON.parse(flag)
      console.log("is first time?", flag)
      return flag;
    } catch (error) {
      console.log(`error: ${error}`)
    }
  }

  async function setFirstTime(){
    try {
      await AsyncStorage.setItem("isLoggedInBefore", JSON.stringify(true))      
    } catch (error) {
      console.log(`error: ${error}`)
    }
  }

  return (
    <View style={styles.root}>
      <Heading textAlign="center" padding={15}>
        <Text style={styles.title}>קצת עלינו</Text>
      </Heading>
      <View style={{ textAlign: "flex-end", marginBottom: 10 }}>
        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}> כתובת: </Text>
          {details.address} {details.city}
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>טלפון: </Text>{" "}
          {details.salonPhoneNum}
        </Text>
        <Text style={[styles.text, { fontWeight: "bold" }]}>זמני פעילות: </Text>
        {workTime.map((dayWorkTime, index) => (
          <Text key={index} style={[styles.text]}>
            {dayWorkTime.day}: {dayWorkTime.toHour} - {dayWorkTime.fromHour}
          </Text>
        ))}
      </View>
      <Button
        width="50%"
        alignSelf="center"
        backgroundColor="#3770B4"
        marginTop={50}
        onPress={() => {
          navigation.navigate("map");
        }}
      >
        נווט לבית העסק
      </Button>
      {
        isFirstTime &&
            <Modal>
              <Modal.Body>
                <View><Text>feeffef</Text></View>
              </Modal.Body>
            </Modal>
        }
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
  },
  map_container: {
    width: "100%",
    height: "40%",
    borderWidth: 1,
    marginBottom: 15,
    backgroundColor: "#F5F5F5",
  },
  text: {
    margin: 10,
    fontSize: 16,
    fontWeight: "normal",
    alignSelf: "flex-end",
  },
  footer: {
    justifyContent: "flex-end",
    flex: 1,
    width: "100%",
  },
});

export default BusinessDetailsScreen;
