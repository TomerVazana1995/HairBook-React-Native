import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import MapComponent from '../components/MapComponent';

const BusinessDetailsScreen = () => {
  return (
    <View style={styles.root}>
        <Text style={styles.title}>קצת עלינו</Text>
        <View style={{alignItems: "flex-end"}}>
            <Text style={styles.text}>כתובת: ויצמן 42, כפר סבא</Text>
            <Text style={styles.text}>זמני פעילות: א' - ה' 8:00-19:00</Text>
            <Text style={styles.text}>טלפון: 055-5555555</Text>
        </View>
      <View style={styles.map_container}>
        <MapComponent/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "white",
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        alignSelf: "center"
    },
    map_container: {
        width: "100%",
        height: "30%",
        borderWidth: 1,
    }, 
    text: {
        margin: 10
    }
})

export default BusinessDetailsScreen