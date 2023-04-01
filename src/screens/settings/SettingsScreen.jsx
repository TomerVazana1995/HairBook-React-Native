import { View, Text, StyleSheet } from "react-native";
import React, {useContext} from "react";
import { useNavigation } from "@react-navigation/native";
import { Heading, Avatar } from "native-base";
import CustomButton from "../../components/CustomButton";
import SettingsOption from "../../components/SettingsOption";
import { UserContext } from "../../context/context";

const SettingsScreen = () => {

const userContext = useContext(UserContext);
const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <View style={styles.header_container}>
        <Avatar
          source={{
            uri: userContext.user.image,
          }}
          size="2xl"
        />
        <Text style={{ fontWeight: "bold", fontSize: 25, padding: 10 }}>
          {userContext.user.firstName} {userContext.user.lastName}
        </Text>
        <CustomButton text="עדכן פרטים אישיים" onPress={() => navigation.navigate("PersonalDetails screen")}/>
      </View>
      <View
        style={{
          backgroundColor: "#E4E4E4",
          width: "100%",
          padding: 10,
          alignItems: "flex-end",
        }}
      >
        <Text style={{ color: "grey", fontWeight: "bold", fontSize: 20, paddingRight: 20 }}>אפשרויות</Text>
      </View>
      <SettingsOption icon="notifications" text="התראות" visible={true}/>
      <SettingsOption icon="notifications" text="התנתק"/>
      <SettingsOption icon="notifications" text="מחק משתמש" color="red"/>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  header_container: {
    alignItems: "center",
    padding: 10,
  },
});

export default SettingsScreen;