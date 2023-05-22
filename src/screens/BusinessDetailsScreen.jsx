import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Heading, Button } from "native-base";
import Footer from "../components/Footer";
import axios from "axios";
import { UserContext } from "../context/context";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const BusinessDetailsScreen = () => {
  const [details, setDetails] = useState({});
  const [workTime, setWorkTime] = useState([]);

  const { user } = useContext(UserContext);

  const navigation = useNavigation();

  useEffect(() => {
    getBuisinessDetails();
  }, []);

  const getBuisinessDetails = () => {
    //the business details
    axios
      .get(`${baseUrl}/HairSalon/getHairSalonInfo?hairSalonId=${user.hairSalonId}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("buisiness details:", details);
      });

    //the businss work time
    axios
      .get(`${baseUrl}/HairSalon/GetHairSalonWorkTime?hairSalonId=${user.hairSalonId}`)
      .then((response) => {
        setWorkTime(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Hair salon work time:", workTime);
      });
  };



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
            {dayWorkTime.day}: {dayWorkTime.fromHour} - {dayWorkTime.toHour}
          </Text>
        ))}
      </View>
      <Button
        width="50%"
        alignSelf="center"
        backgroundColor="#3770B4"
        onPress={() => {
          navigation.navigate("map");
        }}
      >
        נווט לבית העסק
      </Button>
      <View style={styles.footer}>
        <Footer/>
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
