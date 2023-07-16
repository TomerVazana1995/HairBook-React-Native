import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/context";
import { useIsFocused } from "@react-navigation/native";
import { Button } from "native-base";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const NextQueue = () => {
  const isFocused = useIsFocused();
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [queueNum, setQueueNum] = useState(null)
  const [showNextQueue, setShowNextQueue] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    getFutureQueues();
  }, [isFocused]);

  const getFutureQueues = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/Queue/GetQueuesByClient?hairSalonId=${user.hairSalonId}&phoneNum=${user.phoneNum}&flag=0`
      );
      if (response) {
        const queueDate = new Date(response.data[0].date);
        setDate(queueDate.toLocaleDateString()),
          setTime(response.data[0].startTime.slice(0, 5));
        setShowNextQueue(true);
        setQueueNum(response.data[0].numQueue)
      }
    } catch (error) {
      console.log("this is the error", error);
    }
  };

  async function deleteNextQueue(){
    try {
      const response = await axios.delete(`${baseUrl}/Queue/DeleteQueue?queueNum=${queueNum}&hairSalonId=${user.hairSalonId}`)
      console.log(response)
      if(response.status === 200){
        setShowNextQueue(false);
      }
    } catch (error) {
      console.log(error)
    }
  }


  async function confirmDelete(){
    try {
      Alert.alert("מחיקת תור", "אתה בטוח שאתה רוצה למחוק את התור?", [
        {
          text: 'ביטול',
          onPress: () => console.log('cancle queue'),
          style: 'cancle'
        },
        {
          text: 'אישור',
          onPress: () => deleteNextQueue(),
        }
      ])
    } catch (error) {
      
    }
  }


  if (showNextQueue) {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
        <Text style={styles.title}>התור הבא שלך</Text>
        <Text style={styles.text}>{date}</Text>
        <Text style={styles.text}>בשעה {time}</Text>
        </View>
        <View>
       <Text>לחץ כאן לביטול התור</Text>
        <Button rounded="2xl" variant="outline" fontSize="3xl" padding={1} margin={0} onPress={confirmDelete} size="md">ביטול</Button>
        </View>
      </View>
    );
  } else null;
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
    borderWidth: 1,
    borderColor: "#CDCDCD",
    backgroundColor: "#F5F5F5",
    width: "80%",
    alignSelf: "center",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: "row-reverse", 
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  textContainer: {
    alignItems: "center"
  },
  title: {
    fontWeight: 400,
    fontSize: 20,
  },
  text: {
    fontSize: 15,
  },
});

export default NextQueue;
