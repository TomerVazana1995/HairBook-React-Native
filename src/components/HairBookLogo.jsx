import {Image, StyleSheet } from 'react-native';
import React from 'react';
import Logo from '../../assets/logo.png';

const HairBookLogo = () => {
  return (
    <Image source={Logo} style={styles.logo} resizeMode="contain"/>
  )
}

const styles = StyleSheet.create({
    logo: {
        height: "100%",
        width: 100
    }
})
export default HairBookLogo