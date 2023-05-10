import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "native-base";
import BookingDetailsComponent from "../components/BookingDetailsComponent";
import axios from "axios";
import DatePicker from "react-native-modern-datepicker";
import { log } from "react-native-reanimated";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const BookingScreen = () => {
  const [services, setServices] = useState([]);
  const [isTreatmentPicked, setIsTreatmentPicked] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [isEmployeePicked, setIsEmployeePicked] = useState(false);

  useEffect(() => {
    getServicesInfo();
  }, []);

  const getServicesInfo = () => {
    axios
      .get(`${baseUrl}/Service`)
      .then((response) => {
        console.log(response.data);
        setServices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePickTreatment = (service) => {
    setIsTreatmentPicked(true);
    axios
      .get(`${baseUrl}/Employee/GetByService?service=${service.treatmentNum}`)
      .then((response) => setEmployees(response.data))
      .catch((error) => console.log(error))
      .finally(() => console.log(employees));
  };

  const handlePickEmployee = (employee) => {
    setIsEmployeePicked(true);
    axios
      .get(
        `${baseUrl}/Employee/GetDatesByEmployee?EmpPhone=${employee.phoneNum}`
      )
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  const handleWaitingListRegistration = () => {
  
  }

  return (
    <ScrollView style={{backgroundColor: "white"}}>
      <View style={styles.root}>
        <View style={{ margin: 10 }}>
          <Text style={styles.title}>הזמנת תור</Text>
          <Text style={styles.text}>בחר סוג טיפול</Text>
          <View
            style={{
              flexDirection: "row-reverse",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {services.map((service, index) => (
              <BookingDetailsComponent
                key={index}
                index={index}
                text={service.treatmentType}
                onPress={() => handlePickTreatment(service, index)}
              />
            ))}
          </View>
          {isTreatmentPicked && (
            <>
              <Text style={styles.text}>בחר עובד</Text>
              <View
                style={{
                  flexDirection: "row-reverse",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {employees.map((employee, index) => (
                  <BookingDetailsComponent
                    key={index}
                    index={index}
                    text={`${employee.firstName} ${employee.lastName}`}
                    onPress={() => {
                      handlePickEmployee(employee);
                    }}
                  />
                ))}
              </View>
            </>
          )}
          {isEmployeePicked && (
            <>
              <Text style={styles.text}>בחר תאריך</Text>
              <View
                style={{
                  flexDirection: "row-reverse",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <DatePicker mode="calendar"/>
              </View>
            </>
          )}
          <Text style={styles.text}>בחר שעה</Text>
          <View
            style={{
              flexDirection: "row-reverse",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <BookingDetailsComponent text="18:00" />
            <BookingDetailsComponent text="19:00" />
            <BookingDetailsComponent text="20:00" />
          </View>
          <Text
            style={{ alignSelf: "center", marginTop: 50, marginBottom: 10 }}
          >
            אין תור פנוי?
          </Text>
          <Button width="60%" alignSelf="center" backgroundColor="#3770B4">
            לחץ כאן לרשימת המתנה
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 30,
  },
  text: {
    alignSelf: "flex-end",
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default BookingScreen;
