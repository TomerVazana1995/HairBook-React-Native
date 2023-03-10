import { View, Text, TouchableOpacity, Image } from "react-native";
import React, {useState} from "react";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";

export default function PickImageComponent({isIcon, isImage, onPress}) {

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
            <View style={{height: 100, width: 100, borderRadius: 50}}>
                <Image source={image}/>
            </View>
        }
      </TouchableOpacity>
    </View>
  );
}
