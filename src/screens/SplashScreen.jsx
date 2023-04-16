import { View, Image, StyleSheet } from "react-native";
import React from "react";
import Picture from "../images/splash.jpg";
import { Box, Button, Card } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Text } from "native-base";
const SplashScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <Image style={styles.image} source={Picture} />
      <Card textAlign="center" marginBottom={10} padding={5}>
        <Text fontSize={14} textAlign="center">
          ברוכים הבאים לאפליקציית התורים והקניות שלנו - "HairBook" המקום המושלם להזמין
          תור לסלון השיער, לקנות מוצרים מהמקום ועוד! אנו מזמינים אתכם להירשם
          וליהנות מהשירותים המצוינים שלנו.
        </Text>
      </Card>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Button
          marginRight={2}
          bgColor="#3770B4"
          onPress={() => navigation.navigate("Sign up")}
        >
          לחץ כאן להרשמה
        </Button>
        <Button
          marginLeft={2}
          variant="outline"
          onPress={() => navigation.navigate("Login")}
        >
          לחץ כאן להתחברות
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  image: {
    aspectRatio: 1,
    width: "70%",
    height: "40%",
    borderRadius: 10,
    margin: 20,
  },
});

export default SplashScreen;
