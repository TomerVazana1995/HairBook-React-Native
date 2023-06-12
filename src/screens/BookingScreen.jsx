import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { Button, Heading, Modal } from "native-base";
import BookingDetailsComponent from "../components/BookingDetailsComponent";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/context";
import { DatePickerModal } from "react-native-paper-dates";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Datepicker, Icon, Input } from "@ui-kitten/components/ui";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const data = [];

const BookingScreen = () => {
  const [services, setServices] = useState([]);
  const [isTreatmentPicked, setIsTreatmentPicked] = useState(false);
  const [treatment, setTreatment] = useState(null);
  const [treatmentName, setTreatmentName] = useState(null);

  const [employees, setEmployees] = useState([]);
  const [isEmployeePicked, setIsEmployeePicked] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [employeeName, setEmployeeName] = useState("");

  const [date, setDate] = useState(new Date());
  const [openDateModal, setOpenDateModal] = useState(false);

  const [hours, setHours] = useState([]);
  const [hour, setHour] = useState(null);
  const [isDatePicked, setIsDatePicked] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);

  const navigation = useNavigation();

  const bottomSheetModalRef = useRef(null);

  const { user } = useContext(UserContext);

  const onDismissSingle = useCallback(() => {
    setOpenDateModal(false);
  }, [setOpenDateModal]);

  const onConfirmSingle = useCallback(
    (params) => {
      setOpenDateModal(false);
      setDate(params.date);
      setIsDatePicked(true);
      console.log(params.date);
      console.log("this is date:", date);
    },
    [setOpenDateModal, setDate, setIsDatePicked]
  );

  useEffect(() => {
    getServicesInfo();
  }, []);

  useEffect(() => {
    getDateHours();
  }, [employee]);

  const getServicesInfo = () => {
    axios
      .get(`${baseUrl}/Service?hairSalonId=${user.hairSalonId}`)
      .then((response) => {
        console.log(response.data);
        setServices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDateHours = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/Queue/GetAvailableTimes?serviceNum=${treatment}&phoneNum=${employee.phoneNum}&Date=2023-05-17T10:15:09.950Z&hairSalonId=${user.hairSalonId}`
      );
      setHours(response.data);
      response.data.map((item, index) => {
        data.push({ lable: item, value: index });
      });
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  };

  const handlePickTreatment = (service) => {
    setIsTreatmentPicked(true);
    setTreatment(service.treatmentNum);
    setTreatmentName(service.treatmentType);
    axios
      .get(
        `${baseUrl}/Employee/GetByService?service=${service.treatmentNum}&hairsalonId=${user.hairSalonId}`
      )
      .then((response) => setEmployees(response.data))
      .catch((error) => console.log(error))
      .finally(() => console.log("employees:", employees));
  };

  const handlePickEmployee = async (employee) => {
    try {
      setIsEmployeePicked(true);
      setOpenDateModal(true);
      setEmployee(employee);
      setEmployeeName(`${employee.firstName} ${employee.lastName}`);
      const response = await axios.get(
        `${baseUrl}/Employee/GetDatesByEmployee?EmpPhone=${employee.phoneNum}&hairSalonId=${user.hairSalonId}`
      );
      console.log(response.data);
    } catch (error) {
      console.log("we have an error here", error);
    } finally {
      console.log("employee", employee);
    }
  };

  // variables
  const snapPoints = useMemo(() => ["10%", "40%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const orderQueue = (hour) => {
    axios
      .post(`${baseUrl}/Queue/OrderQueue?hairSalonId=${user.hairSalonId}`, {
        date: date,
        time: hour,
        empPhone: employee.phoneNum,
        clientPhone: user.phoneNum,
        serviceNum: treatment,
      })
      .then((response) => {
        console.log(response);
        Alert.alert("הזמנת תור", "התור הוזמן בהצלחה", [
          { text: "OK", onPress: () => navigation.navigate("דף הבית") },
        ]);
      })
      .catch((error) => console.log(error));
  };

  const enterWaitingList = async () => {
    try {
      if (true) {
        const response = await axios.post(
          `https://proj.ruppin.ac.il/cgroup30/prod/PostIntoWaiting?hairSalonId=${user.hairSalonId}`,
          {
            date: date,
            time: selectedHour,
            empPhone: employee.phoneNum,
            clientPhone: user.phoneNum,
            serviceNum: treatment,
          }
        );
        console.log(response.data);
        alert(`מקומך בתור הוא ${response.data}`);
      } else {
        alert("נא לבחור תאריך ושעה");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkHourPattern = (text) => {
    const pattern = "/^(0[8-9]|1[0-8]):[0-5]d$/";
    const regex = new RegExp(pattern);
    return regex.test(text)
  };

  return (
    <ScrollView style={{backgroundColor: "#f8f8f8"}}>
    <BottomSheetModalProvider>
      <View style={[styles.root]}>
        <View>
          <Text style={styles.title}>הזמנת תור</Text>
          <Text style={styles.text}>סוג טיפול</Text>
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
            <View style={{ marginTop: 20 }}>
              <Text style={styles.text}>עובד</Text>
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
                    text={`${employee.firstName} ${employee.lastName}`}
                    onPress={() => {
                      handlePickEmployee(employee);
                    }}
                  />
                ))}
              </View>
            </View>
          )}
          {isEmployeePicked && (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.text}>תאריך</Text>
              <View
                style={{
                  flexDirection: "row-reverse",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <DatePickerModal
                  locale="he"
                  mode="single"
                  visible={openDateModal}
                  onDismiss={onDismissSingle}
                  date={date}
                  onConfirm={onConfirmSingle}
                  validRange={{
                    startDate: new Date(),
                    endDate: new Date("2023-06-30"),
                  }}
                />
                <BookingDetailsComponent
                  text={`${new Date(date).toLocaleDateString()}`}
                  onPress={() => setOpenDateModal(true)}
                />
              </View>
            </View>
          )}
          {isDatePicked && (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.text}>שעה</Text>
              <View
                style={{
                  flexDirection: "row-reverse",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                  {hours.map((hour, index) => (
                    <BookingDetailsComponent
                      key={index}
                      text={`${hour}`}
                      onPress={() => [setHour(hour), handlePresentModalPress()]}
                    />
                  ))}         
              </View>
            </View>
          )}
        </View>
        <View
          style={{ position: "relative", alignSelf: "center"}}
        >
          <Text
            style={{ alignSelf: "center", marginTop: 35, marginBottom: 10 }}
          >
            אין תור פנוי?
          </Text>
          <Button
            alignSelf="center"
            backgroundColor="#3770B4"
            onPress={() => setModalVisible(true)}
          >
            לחץ כאן לרשימת המתנה
          </Button>
          <Modal
            backdropVisible={false}
            isOpen={modalVisible}
            avoidKeyboard
            justifyContent="center"
            size="lg"
          >
            <Modal.Content
              borderWidth={1}
              borderColor="#CDCDCD"
              backgroundColor="white"
              width="70%"
            >
              <Modal.CloseButton onPress={() => setModalVisible(false)} />
              <Modal.Header
                alignSelf="center"
                backgroundColor="white"
                width="100%"
                alignItems="center"
              >
                בחר תאריך ושעה
              </Modal.Header>
              <Modal.Body style={{ gap: 10 }}>
                <Datepicker
                  placeholder="תאריך"
                  onSelect={(date) => setDate(date)}
                  accessoryLeft={(props) => <Icon {...props} name="calendar" />}
                  controlStyle={{ paddingVertical: 10 }}
                  date={date}
                />
                <Input
                  placeholder="שעה"
                  accessoryLeft={(props) => (
                    <Icon {...props} name="clock-outline" />
                  )}
                  textAlign="right"
                  textStyle={{ paddingVertical: 6 }}
                  onChangeText={(text) => setSelectedHour(text)}
                />
                <Button backgroundColor="#3770B4" onPress={enterWaitingList}>
                  לרשימת המתנה
                </Button>
              </Modal.Body>
            </Modal.Content>
          </Modal>
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <Heading>פרטי הזמנת תור</Heading>
            <Text style={styles.modalText}>טיפול: {treatmentName}</Text>
            <Text style={styles.modalText}>עובד: {employeeName}</Text>
            <Text style={styles.modalText}>
              תאריך: {new Date(date).toLocaleDateString()}
            </Text>
            <Text style={styles.modalText}>שעה: {hour}</Text>
            <Button backgroundColor="#3770B4" onPress={() => orderQueue(hour)}>
              לחץ כאן לאישור
            </Button>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f8f8f8",
    padding: 15
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
    fontSize: 18,
    marginRight: 10
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    gap: 15,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 300,
  },
  dropdown: {
    height: 50,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: "#F5F8FE",
  },
  dropdownContainer: {
    backgroundColor: "white",
    paddingVertical: 16,
    width: "100%",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "lightgrey",
    position: "absolute",
    right: 20,
  },
});

export default BookingScreen;
