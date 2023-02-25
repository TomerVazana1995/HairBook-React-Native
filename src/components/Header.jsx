import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import React from 'react';
import Logo from '../../assets/logo.png';

const Header = ({text}) => {

    const {height} = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Image style={[styles.logo, {height: height * 0.3}]} source={Logo} resizeMode='contain'/>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5C7FA9',
        alignItems: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        flexDirection: 'row'
    },
    logo: {
        width: '40%',
        maxHeight: 150,
        maxWidth: 200
    },
    text: {
      color: 'white',
      fontSize: '20%',
      fontWeight: 'bold'
    }
})

export default Header