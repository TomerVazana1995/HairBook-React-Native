import { View, Text, StyleSheet, Animated } from "react-native";
import React, { useRef, useEffect} from "react";
import { Avatar } from "native-base";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";


const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const WorkerCard = ({image, firstName, lastName, rank, onPress}) => {
  const animation = useRef(new Animated.Value(0)).current;
  

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
     
        <TouchableOpacity style={{ width: "70%" }} onPress={onPress}>
          <Animated.View
            style={[
              styles.container,
              { transform: [{ translateY: translateY }], opacity: opacity },
            ]}
          >
            <Avatar source={{ uri: image }} size="lg" marginLeft={5} />
            <View style={{ flex: 1, gap: 5 }}>
              <Text style={{ fontSize: 20, alignSelf: "center", fontFamily: "Arial Hebrew" }}>
                {firstName} {lastName}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <Text style={{fontWeight: 400, fontFamily: "Arial Hebrew", fontSize: 20}}>{rank}</Text>
                <AntDesign name="star" color="#FFD400" />
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>
     
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
