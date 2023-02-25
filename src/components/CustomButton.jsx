import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const CustomButton = ({text, onPress}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#3770B4',
    borderRadius: 10
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    padding: '3%'
  }
})

export default CustomButton