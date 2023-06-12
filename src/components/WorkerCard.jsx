import { View, Text, StyleSheet, Animated } from "react-native";
import React, { useRef, useEffect, useState, useContext } from "react";
import { Avatar } from "native-base";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { UserContext } from "../context/context";
import { AntDesign } from "@expo/vector-icons";
import StarRating from "react-native-star-rating-widget";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const WorkerCard = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const [employees, setEmployees] = useState([]);
  const [rating, setRating] = useState(0);

  const { user } = useContext(UserContext);

  const getAllEmployees = () => {
    axios
      .get(
        `${baseUrl}/Employee/GetAllEmployees?hairSalonId=${user.hairSalonId}`
      )
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
  }, []);

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
        <TouchableOpacity style={{ width: "70%" }} key={index}>
          <Animated.View
            style={[
              styles.container,
              { transform: [{ translateY: translateY }], opacity: opacity },
            ]}
          >
            <Avatar source={{ uri: employee.image }} size="lg" marginLeft={5} />
            <View style={{ flex: 1, gap: 5 }}>
              <Text style={{ fontSize: 20, alignSelf: "center" }}>
                {employee.firstName} {employee.lastName}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <Text style={{fontWeight: 500}}>{employee.rank}</Text>
                <AntDesign name="star" color="#FFD400" />
              </View>
              <StarRating rating={rating} onChange={setRating} starSize={20}/>
            </View>
          </Animated.View>
        </TouchableOpacity>
      ))}
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
    textAlign: "center",
    justifyContent: "space-between",
  },
});

export default WorkerCard;
