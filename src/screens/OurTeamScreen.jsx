import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import WorkerCard from '../components/WorkerCard';

const OurTeamScreen = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Our Team</Text>
      <View>
        <WorkerCard/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white"
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        padding: 20
    }
})

export default OurTeamScreen