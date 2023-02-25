import { View, StyleSheet, TextInput } from 'react-native';
import React from 'react';

const CustomInput = ({value, setValue, placeholder}) => {
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
        style={{textAlign: 'center'}}
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
        width: '60%', 
        padding: 15,
        margin: '5%', 
    },
    input: {
        flex: 1,
    }
})

export default CustomInput