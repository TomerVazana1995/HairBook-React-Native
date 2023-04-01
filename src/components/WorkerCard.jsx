import { View, Text, StyleSheet, Animated } from "react-native";
import React, {useRef, useEffect} from "react";
import { Avatar } from "native-base";
import { TouchableOpacity } from "react-native";

const WorkerCard = () => {

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
    <TouchableOpacity>
      <Animated.View style={[
          styles.container,
          { transform: [{ translateY: translateY }], opacity: opacity },
        ]}>
        <Avatar
          source={require("../images/workers/Vazana.jpeg")}
          size="lg"
          marginLeft={5}
        />
        <Text style={{ fontSize: 20 }}>תומר וזנה - ספר גברים</Text>
      </Animated.View>
    </TouchableOpacity>
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
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "white",
    marginVertical: 15
  },
});

export default WorkerCard;
