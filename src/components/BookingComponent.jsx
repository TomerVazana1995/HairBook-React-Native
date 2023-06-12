import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/context";
import { Button } from "native-base";
import { useNavigation } from "@react-navigation/native";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const BookingComponent = ({ future }) => {
  const { user } = useContext(UserContext);

  const [queues, setQueues] = useState([]);
  const [futureQueues, setFutureQueues] = useState([]);
  const [isFuture, setIsFuture] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    getAllFutureQueues();
    getAllQueues();
  }, []);

  const getAllQueues = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/Queue/GetQueuesByClient?hairSalonId=${user.hairSalonId}&phoneNum=${user.phoneNum}&flag=1`
      );
      const formattedQueues = response.data.map((queue) => {
        const date = new Date(queue.date);
        const formattedDate = date.toLocaleDateString(); // Format the date as desired

        const time = queue.startTime;
        const formattedTime = time.slice(0, 5); // Format the time as desired

        return {
          ...queue,
          date: formattedDate,
          startTime: formattedTime,
        };
      });

      setQueues(formattedQueues);
    } catch (error) {
      console.log("couldnt find client queues", error);
    }
  };

  const getAllFutureQueues = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/Queue/GetQueuesByClient?hairSalonId=${user.hairSalonId}&phoneNum=${user.phoneNum}&flag=0`
      );
      const formattedQueues = response.data.map((queue) => {
        const date = new Date(queue.date);
        const formattedDate = date.toLocaleDateString(); // Format the date as desired

        const time = queue.startTime;
        const formattedTime = time.slice(0, 5); // Format the time as desired

        return {
          ...queue,
          date: formattedDate,
          startTime: formattedTime,
        };
      });

      setFutureQueues(formattedQueues);
    } catch (error) {
      console.log("couldnt find client queues", error);
    }
  };

  const FutureQueues = () => {
    if (futureQueues.length === 0) {
      return (
        <View style={{gap: 30, width: "80%", paddingTop: 30}}>
          <Text style={styles.title}>
            עדיין לא קבעת תור? מהר להירשם לפני שכל התורים יתפסו
          </Text>
          <View style={{alignItems: "center", gap: 10}}>
          <Text style={{textAlign: "center"}}>לחץ כאן לקביעת תור</Text>
          <Button bgColor="#3770b4" w="80%" onPress={() => navigation.navigate("קביעת תור")}>
            לקביעת תור
          </Button>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            width: "100%",
            alignItems: "center",
            gap: 10,
            shadowColor: "#171717",
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }}
        >
          {futureQueues.map((queue, index) => (
            <View key={index} style={styles.container}>
              <Text style={styles.title}>{queue.kindCare}</Text>
              <Text>{queue.date}</Text>
              <Text>{queue.startTime}</Text>
            </View>
          ))}
        </View>
      );
    }
  };

  const AllQueues = () => {
    if (queues.length === 0) {
      return (
        <View style={{textAlign: "center"}}>
          <Text style={styles.title}>
            נראה שזו הפעם הראשונה שלך פה, למה אתה מחכה? קבע אצלנו תור
          </Text>
          <Text style={{textAlign: "center"}}>לחץ כאן להזמנת תור</Text>
          <Button>לקביעת תור</Button>
        </View>
      );
    } else {
      return (
        <View
          style={{
            width: "100%",
            alignItems: "center",
            gap: 10,
            shadowColor: "#171717",
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }}
        >
          {queues.map((queue, index) => (
            <View key={index} style={styles.container}>
              <Text style={styles.title}>{queue.kindCare}</Text>
              <Text>{queue.date}</Text>
              <Text>{queue.startTime}</Text>
            </View>
          ))}
        </View>
      );
    }
  };

  return !future ? <AllQueues /> : <FutureQueues />;
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    margin: 5,
    borderRadius: 5,
    gap: 15,
    width: "60%",
    backgroundColor: "#d4ffc7",
  },
  title: {
    fontWeight: 500,
    fontSize: 20,
    textAlign: "center"
  },
  content: {
    textAlign: "center",
  },
});

export default BookingComponent;
