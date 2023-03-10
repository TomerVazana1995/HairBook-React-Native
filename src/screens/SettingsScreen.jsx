import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Heading } from 'native-base';

const SettingsScreen = () => {
  return (
    <View style={styles.root}>
      <Heading>
        <Text>
          Settings
        </Text>
      </Heading>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white"
  }
})

export default SettingsScreen