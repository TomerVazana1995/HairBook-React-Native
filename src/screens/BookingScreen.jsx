import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button } from "native-base";
import BookingDetailsComponent from "../components/BookingDetailsComponent";
import { Datepicker } from "@ui-kitten/components";


const BookingScreen = () => {
  return (
    <View
      style={styles.root}
    >
      <View style={{ margin: 10 }}>
        <Text style={styles.title}>הזמנת תור</Text>
        <Text style={styles.text}>
          בחר סוג טיפול
        </Text>
        <View
          style={{
            flexDirection: "row-reverse",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <BookingDetailsComponent text="תספורת" />
          <BookingDetailsComponent text="החלקה" />
          <BookingDetailsComponent text="צבע" />
        </View>
        <Text style={styles.text}>
          בחר עובד
        </Text>
        <View
          style={{
            flexDirection: "row-reverse",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <BookingDetailsComponent text="יוסי" />
          <BookingDetailsComponent text="איציק" />
          <BookingDetailsComponent text="שלומי" />
        </View>
        <Text style={styles.text}>בחר תאריך</Text>
        <View
          style={{
            flexDirection: "row-reverse",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Datepicker/>
        </View>
        <Text style={styles.text}>בחר שעה</Text>
        <View
          style={{
            flexDirection: "row-reverse",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <BookingDetailsComponent text="18:00" />
          <BookingDetailsComponent text="19:00" />
          <BookingDetailsComponent text="20:00" />
        </View>
        <Text style={{alignSelf: "center", marginTop: 50, marginBottom: 10}}>אין תור פנוי?</Text>
        <Button width="60%" alignSelf="center" backgroundColor="#3770B4">לחץ כאן לרשימת המתנה</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    padding: 10
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 30
  },
  text: {
    alignSelf: "flex-end",
    marginBottom: 10,
    fontWeight: "bold"
  }
});

export default BookingScreen;
