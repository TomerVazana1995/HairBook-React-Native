import { View, TouchableOpacity, Image } from "react-native";
import React, {useContext} from "react";

import { Avatar } from "native-base";
import { UserContext } from "../context/context";

export default function PickImageComponent({isIcon, isImage, onPress, image}) {

  const userContext = useContext(UserContext);
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Avatar source={{uri: userContext.user.image}} size="2xl"/>
      </TouchableOpacity>
    </View>
  );
}
