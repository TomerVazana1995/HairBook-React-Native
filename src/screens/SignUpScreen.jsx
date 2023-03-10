import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Input } from "native-base";
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";
import PickImageComponent from "../components/PickImageComponent";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

const SignUpScreen = ({navigation}) => {

  const baseUrl = 'http://192.168.1.106/api';

  const [user, setUser] = useState({
    firstName: '', 
    lastName: '',
    phoneNum: '',
    image: '',
    birthDate: Date(),
    gender: ''
  });
  const [isIcon, setIsIcon] = useState(true);
  const [isImage, setIsImage] = useState(false);

  const [image, setImage] = useState(null);

  const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setIsIcon(false);
      }
  }
  

  return (
    <View style={styles.wraper}>
      <View style={styles.container}>
        <PickImageComponent isIcon={isIcon} isImage={isImage} onPress={pickImage}/>
        {image && <View style={{height: 100, width: 100, borderRadius: 50}}>
          <Image style={styles.image} source={image} resizeMode="contain"/>
          </View>}
        <Input
          margin={5}
          textAlign="center"
          size="md"
          width="70%"
          placeholder="שם פרטי"
          value={user.firstName}
          onChangeText={(text) => setUser({...user, firstName: text})}
        />  
        <Input
          margin={5}
          textAlign="center"
          size="md"
          width="70%"
          placeholder="שם משפחה"
          value={user.lastName}
          onChangeText={(text) => setUser({...user, lastName: text})}
        />
        <Input
          margin={5}
          textAlign="center"
          size="md"
          width="70%"
          placeholder="טלפון-נייד"
          value={user.phoneNum}
          onChangeText={(text) => setUser({...user, phoneNum: text})}
        />
       
        {/* <Text style={styles.text}>תאריך לידה</Text> */}
        {/* <View style={styles.birthDateBox}>
          <Input
            margin={3}
            textAlign="center"
            size="md"
            width="30%"
            placeholder="יום"
          />
          <Input
            margin={3}
            textAlign="center"
            size="md"
            width="30%"
            placeholder="חודש"
          />
          <Input
            margin={3}
            textAlign="center"
            size="md"
            width="30%"
            placeholder="שנה"
          />
        </View> */}
        <CustomButton text="שמור משתמש" />
        <CustomButton type="TERTIARY" text="יש משתמש קיים? לחץ כאן להתחברות" onPress={() => navigation.navigate("Login")}/>
      </View>
      <View style={{justifyContent: "flex-end", flex: 1}}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wraper: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    padding: 20,
  },
  input: {
    padding: 10,
  },
  birthDateBox: {
    flexDirection: "row",
  },
  text: {
    fontSize: 25,
  },
  image: {
    aspectRatio: 1,
    height: undefined,
  }
});

export default SignUpScreen;
