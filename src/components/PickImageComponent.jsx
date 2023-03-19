import { View, Text, TouchableOpacity, Image } from "react-native";
import React, {useState} from "react";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { Avatar } from "native-base";

export default function PickImageComponent({isIcon, isImage, onPress, image}) {

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        { isIcon &&
          <View>
            <FontAwesome name="user-circle-o" size={100} />
          </View>
        }
        {
            isImage &&
          
                <Avatar source={{uri: image}} size="xl"/>
        }
      </TouchableOpacity>
    </View>
  );
}
