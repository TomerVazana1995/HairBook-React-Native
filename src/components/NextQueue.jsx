import { View, Text, StyleSheet } from "react-native";
import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { UserContext } from "../context/context";
import { useIsFocused } from "@react-navigation/native";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const NextQueue = () => {

  const isFocused = useIsFocused();
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [showNextQueue, setShowNextQueue] = useState(false);

  const {user} = useContext(UserContext);

  useEffect(() => {
    getFutureQueues();
  }, [isFocused]);

  const getFutureQueues = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/Queue/GetQueuesByClient?hairSalonId=${user.hairSalonId}&phoneNum=${user.phoneNum}&flag=0`
      );
      if(response){
             console.log(response.data);
      const queueDate = new Date(response.data[0].date);
      setDate(queueDate.toLocaleDateString()),
      setTime(response.data[0].startTime.slice(0,5));
      setShowNextQueue(true);
      }
 
    } catch (error) {
      console.log("this is the error", error)
    }
  };

  if(showNextQueue){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>התור הבא שלך</Text>
        <Text>{date}</Text>
        <Text>בשעה {time}</Text>
      </View>
    );
  } else null
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 5
  },
  title: {
    fontWeight: 500
  },
});

export default NextQueue;
