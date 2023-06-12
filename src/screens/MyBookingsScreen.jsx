import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  LogBox,
  Switch,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import BookingComponent from "../components/BookingComponent";
import { HStack } from "native-base";
import { Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserContext } from "../context/context";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const MyBookingsScreen = () => {
  const [future, setFuture] = useState(true);

  const { user } = useContext(UserContext);

  const [queues, setQueues] = useState([]);
  const [futureQueues, setFutureQueues] = useState([]);
  const [isFuture, setIsFuture] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    getAllQueues();
    getAllFutureQueues();
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


  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.root}>
        <Text style={styles.title}>התורים שלי</Text>
        <HStack
          style={{ gap: 5 }}
          alignItems="center"
          padding={3}
          marginBottom={5}
        >
          <Text>כל התורים</Text>
          <Switch value={future} onChange={() => setFuture((prev) => !prev)} />
          <Text>תורים עתידיים</Text>
        </HStack>
        <BookingComponent future={future} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontWeight: 500,
    fontSize: 30,
    marginBottom: 20,
  },
});

export default MyBookingsScreen;
