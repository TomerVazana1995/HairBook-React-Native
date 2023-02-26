import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import React from 'react';
import Logo from '../../assets/logo.png';
import { Ionicons } from '@expo/vector-icons'; 

const Header = ({text}) => {

    const {height} = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Image style={[styles.logo]} source={Logo} resizeMode='contain'/>
      <Text style={styles.text}>{text}</Text>
      <Ionicons name="md-menu" color="white" size={30}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5C7FA9',
        alignItems: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: 30
    },
    logo: {
        width: '40%',
        maxWidth: 200,
        maxHeight: 150
    },
    text: {
      color: 'white',
      fontSize: '20%',
      fontWeight: 'bold'
    }
})

export default Header