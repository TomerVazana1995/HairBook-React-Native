import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button } from "native-base";
import BookingDetailsComponent from "../components/BookingDetailsComponent";

const BookingScreen = () => {
  return (
    <View
      style={{ flex: 1, flexDirection: "column", backgroundColor: "white" }}
    >
      <View style={{ margin: 10 }}>
        <Text style={styles.title}>הזמנת תור</Text>
        <Text style={{ alignSelf: "flex-end", marginBottom: 10 }}>
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
        <Text style={{ alignSelf: "flex-end", marginBottom: 10 }}>בחר יום</Text>
        <View
          style={{
            flexDirection: "row-reverse",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <BookingDetailsComponent text="ראשון" />
          <BookingDetailsComponent text="שלישי" />
          <BookingDetailsComponent text="חמישי" />
        </View>
        <Text style={{ alignSelf: "flex-end", marginBottom: 10 }}>בחר שעה</Text>
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
        <Text style={{alignSelf: "center", marginTop: 20}}>אין תור פנוי?</Text>
        <Button width="50%" alignSelf="center" backgroundColor="#3770B4">לחץ כאן לרשימת המתנה</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default BookingScreen;
