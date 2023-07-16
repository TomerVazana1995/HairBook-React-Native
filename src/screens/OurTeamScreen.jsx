import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/context";
import WorkerCard from "../components/WorkerCard";
import Footer from "../components/Footer";
import axios from "axios";
import StarRating from "react-native-star-rating-widget";
import { Button, Modal } from "native-base";
import { useIsFocused } from "@react-navigation/native";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const OurTeamScreen = () => {
  const [employees, setEmployees] = useState([]);
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [employeeNum, setEmployeeNum] = useState(null)

  const { user } = useContext(UserContext);

  const isFocused = useIsFocused()

  useEffect(() => {
    getAllEmployees();
  }, [isFocused]);

  const getAllEmployees = () => {
    axios
      .get(
        `${baseUrl}/Employee/GetAllEmployees?hairSalonId=${user.hairSalonId}`
      )
      .then(function (response) {
        console.log(response.data);
        setEmployees(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  async function rankEmployee(){
    try {
      const response = await axios.put(`${baseUrl}/Employee/UpdateEmployeeRank?rank=${rating}&employeeNum=${employeeNum}`)
      console.log(response)
      Alert.alert('דירוג', 'תודה על הדירוג, אנו תמיד שמחים לדעת מה לקוחותינו חושבים עלינו 😁', [
       { 
        text: 'OK',
        onPress: () => [setShowModal(false), setEmployeeNum(0)]
      }
      ])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.root}>
        <Text style={styles.title}>הצוות שלנו</Text>
        {employees.map((employee) => (
          <WorkerCard
            key={employee.employeeNum}
            firstName={employee.firstName}
            lastName={employee.lastName}
            rank={employee.rank}
            image={employee.image}
            onPress={() => [setShowModal(true), setEmployeeNum(employee.employeeNum)]}
          />
        ))}
        <Modal isOpen={showModal}>
          <Modal.Content>
            <Modal.CloseButton onPress={() => setShowModal(false)}/>
            <Modal.Header width="100%" alignItems="center">דרג אותי</Modal.Header>
            <Modal.Body alignItems="center">
              <StarRating
                rating={rating}
                onChange={(rate) => setRating(rate)}
              />
              <Button onPress={rankEmployee} variant="outline" marginTop={10}>שלח דירוג</Button>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </View> 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    padding: 20,
    fontFamily: "Arial Hebrew",
  },
});

export default OurTeamScreen;
