import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SocialIcon } from "@rneui/themed";
import axios from "axios";
import * as Linking from "expo-linking";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const Footer = () => {
  const [details, setDetails] = useState({});

  const openFacebookUrl = async () => {
    try {
      await Linking.openURL(details.facebook).catch((error) => {
        console.log("Something went wrong", error);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBuisinessDetails();
  }, []);

  const getBuisinessDetails = () => {
    //the business details
    axios
      .get(`${baseUrl}/HairSalon/getHairSalonInfo`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("buisiness details:", details);
      });
  };

  const openInstagremUrl = async () => {
    try {
      await Linking.openURL(details.instagram).catch((error) =>
        console.log("Something went wrong", error)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>עקבו אחרינו</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={openFacebookUrl}>
          <SocialIcon type="facebook" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={openInstagremUrl}>
          <SocialIcon type="instagram" size={30} />
        </TouchableOpacity>
        <TouchableOpacity>
          <SocialIcon type="whatsapp" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    paddingBottom: 30,
  },
  text: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 20,
    marginTop: 10,
  },
});
export default Footer;
