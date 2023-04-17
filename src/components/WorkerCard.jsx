import { View, Text, StyleSheet, Animated } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import { Avatar } from "native-base";
import { TouchableOpacity } from "react-native";
import axios from "axios";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const WorkerCard = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const [employees, setEmployees] = useState([]);

  const getAllEmployees = () => {
    axios
      .get(`${baseUrl}/Employee/GetAllEmployees`)
      .then(function (response) {
        console.log(response.data);
        setEmployees(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllEmployees();
  },[]);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [animation]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <>
      {employees.map((employee, index) => (
        <TouchableOpacity key={index}>
          <Animated.View
            style={[
              styles.container,
              { transform: [{ translateY: translateY }], opacity: opacity },
            ]}
          >
            <Avatar
              source={{uri: employee.image}}
              size="lg"
              marginLeft={5}
            />
            <View>
            <Text style={{ fontSize: 20 }}>{employee.firstName} {employee.lastName} -</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      ))
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CDCDCD",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "white",
    marginVertical: 15,
    elevation: 15,
  },
});

export default WorkerCard;
