import { View, StyleSheet, TextInput } from 'react-native'
import React from 'react'

const CustomInput = ({value, setValue, placeholder}) => {
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e8e8e8',
        borderRadius: 10,
        width: '50%', 
        padding: 10
    },
    input: {
        flex: 1,
        
    }
})

export default CustomInput