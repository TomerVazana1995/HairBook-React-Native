import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/context";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const BookingComponent = ({ future = false }) => {
  const { user } = useContext(UserContext);

  const [queues, setQueues] = useState([]);
  const [futureQueues, setFutureQueues] = useState([]);

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
    <>
      {!future
        ? queues.map((queue, index) => (
            <View key={index} style={styles.container}>
              <Text style={styles.title}>{queue.kindCare}</Text>
              <Text>{queue.date}</Text>
              <Text>{queue.startTime}</Text>
            </View>
          ))
        : futureQueues.map((queue, index) => (
            <View key={index} style={styles.container}>
              <Text style={styles.title}>{queue.kindCare}</Text>
              <Text>{queue.date}</Text>
              <Text>{queue.startTime}</Text>
            </View>
          ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    margin: 5,
    borderRadius: 5,
    gap: 10,
    width: "50%",
  },
  title: {
    fontWeight: 500,
    fontSize: 20,
  },
});

export default BookingComponent;
