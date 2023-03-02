import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Card } from 'native-base';

const BookingScreen = () => {
  return (
    <View style={{flex: 1, alignItems: "center", flexDirection: "column"}}>
      <Text style={styles.title}>הזמנת תור</Text>
      <View>
        <Card></Card>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold"
  }
})

export default BookingScreen