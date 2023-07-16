import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native";
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
import Message from "../components/Message";
import { UserContext } from "../context/context";
import { DatePickerModal } from "react-native-paper-dates";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Datepicker, Icon, Input } from "@ui-kitten/components/ui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";

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

  const [showMessage, setShowMessage] = useState(false);

  const [waitingList, setWaitingList] = useState(false);

  const bottomSheetModalRef = useRef(null);

  const { user } = useContext(UserContext);

  const navigation = useNavigation();

  const isFocused = useIsFocused()

  useEffect(() => {
    console.log(date);
  }, [date]);

  const onDismissSingle = useCallback(() => {
    setOpenDateModal(false);
  }, [setOpenDateModal]);

  const onConfirmSingle = useCallback(
    (params) => {
      if(params.date < new Date())
      {
        Alert.alert("בחירת תאריך", "התאריך שבחרת אינו תקין נא נסה שנית", [
          {
            text: 'אישור'
          }
        ])
      }
      else{
        setOpenDateModal(false);
        setDate(params.date);
        setIsDatePicked(true);
        setWaitingList(true);
      }
    },
    [setOpenDateModal, setDate, setIsDatePicked]
  );

  useEffect(() => {
    getServicesInfo();
    checkFirstTime();
  }, [isFocused]);

  useEffect(() => {
    getDateHours();
  }, [date]);

  function getNext12MonthsTuesdays() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const tuesdays = [];

    let month = currentMonth;
    let year = currentYear;

    for (let i = 0; i < 12; i++) {
      const date = new Date(year, month, 1);
      while (date.getDay() !== 2) {
        date.setDate(date.getDate() + 1);
      }
      while (date.getMonth() === month) {
        tuesdays.push(new Date(date.getTime()));
        date.setDate(date.getDate() + 7);
      }

      // Move to the next month and adjust the year if necessary
      month++;
      if (month > 11) {
        month = 0;
        year++;
      }
    }

    return tuesdays;
  }

  const futureTuesdays = getNext12MonthsTuesdays();

  function getNext12MonthsFridays() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const fridays = [];

    let month = currentMonth;
    let year = currentYear;

    for (let i = 0; i < 12; i++) {
      const date = new Date(year, month, 1);
      while (date.getDay() !== 5) {
        date.setDate(date.getDate() + 1);
      }
      while (date.getMonth() === month) {
        fridays.push(new Date(date.getTime()));
        date.setDate(date.getDate() + 7);
      }

      // Move to the next month and adjust the year if necessary
      month++;
      if (month > 11) {
        month = 0;
        year++;
      }
    }

    return fridays;
  }

  const futureFridays = getNext12MonthsFridays();

  function getNext12MonthsSaturdays() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const saturdays = [];

    let month = currentMonth;
    let year = currentYear;

    for (let i = 0; i < 12; i++) {
      const date = new Date(year, month, 1);
      while (date.getDay() !== 6) {
        date.setDate(date.getDate() + 1);
      }
      while (date.getMonth() === month) {
        saturdays.push(new Date(date.getTime()));
        date.setDate(date.getDate() + 7);
      }

      // Move to the next month and adjust the year if necessary
      month++;
      if (month > 11) {
        month = 0;
        year++;
      }
    }

    return saturdays;
  }

  const futureSaturdays = getNext12MonthsSaturdays();

  const allDates = [...futureTuesdays, ...futureFridays, ...futureSaturdays];

  const getServicesInfo = () => {
    axios
      .get(`${baseUrl}/Service?hairSalonId=${user.hairSalonId}`)
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDateHours = async () => {
    try {
      var day = date;
      day = day.toDateString();
      const response = await axios.get(
        `${baseUrl}/Queue/GetAvailableTimes?serviceNum=${treatment}&phoneNum=${employee.phoneNum}&Date=${day}&hairSalonId=${user.hairSalonId}`
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

  const orderQueue = async (hour) => {
    axios
      .post(
        `${baseUrl}/Queue/OrderQueue?hairSalonId=${user.hairSalonId}&flag=0`,
        {
          date: date,
          time: hour,
          empPhone: employee.phoneNum,
          clientPhone: user.phoneNum,
          serviceNum: treatment,
          token: "",
        }
      )
      .then(() => {
        Alert.alert("הזמנת תור", "התור הוזמן בהצלחה!", [
          {
            text: "אישור",
            onPress: () => {
              navigation.navigate("דף הבית");
            },
          },
        ]);
      })
      .catch((error) => console.log(error));
  };

  const enterWaitingList = async () => {
    try {
      const response = await axios.post(
        `https://proj.ruppin.ac.il/cgroup30/prod/PostIntoWaiting?hairSalonId=${user.hairSalonId}`,
        {
          date: date,
          time: selectedHour,
          empPhone: employee.phoneNum,
          clientphone: user.phoneNum,
          serviceNum: treatment,
          token: "",
        }
      );
      Alert.alert("רשימת המתנה", `מקומך בתור הוא ${response.data}`, [
        {
          text: "אישור",
          onPress: () => setModalVisible(false),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  async function checkFirstTime() {
    try {
      const check = await AsyncStorage.getItem("booking");
      const flag = JSON.parse(check);
      console.log(flag);
      if ((flag === null) | undefined) {
        setShowMessage(true);
        await AsyncStorage.setItem("booking", JSON.stringify(true));
      }
    } catch (error) {
      console.log(`error: ${error}`);
    }
  }

  return (
    <ScrollView style={{ backgroundColor: "#f8f8f8" }}>
      <BottomSheetModalProvider>
        <View style={[styles.root]}>
          {showMessage && (
            <Message
              title="קביעת תור "
              text="במסך זה אתה יכול להזמין תור לפי תאריך וטיפול שאתה מעוניין בו. 
          במקרה ואין תור פנוי ניתן להירשם לרשימת המתנה למטה 👇🏻."
              onPress={() => setShowMessage(false)}
            />
          )}
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
                      disabledDates: allDates,
                    }}
                  />
                  <TouchableOpacity onPress={() => setOpenDateModal(true)}>
                    <View style={styles.container}>
                      <Text style={styles.dateText}>{new Date(date).toLocaleDateString()}</Text>
                    </View>
                  </TouchableOpacity>
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
          {waitingList && (
            <View style={{ position: "relative", alignSelf: "center" }}>
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 35,
                  marginBottom: 10,
                  fontFamily: "Arial Hebrew",
                }}
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
                      accessoryLeft={(props) => (
                        <Icon {...props} name="calendar" />
                      )}
                      controlStyle={{ paddingVertical: 10 }}
                      date={date}
                      min={new Date()}
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
                    <Button
                      backgroundColor="#3770B4"
                      onPress={enterWaitingList}
                    >
                      לרשימת המתנה
                    </Button>
                  </Modal.Body>
                </Modal.Content>
              </Modal>
            </View>
          )}
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <View style={styles.contentContainer}>
              <Heading style={{ fontFamily: "Arial Hebrew" }}>
                פרטי הזמנת תור
              </Heading>
              <Text style={styles.modalText}>טיפול: {treatmentName}</Text>
              <Text style={styles.modalText}>עובד: {employeeName}</Text>
              <Text style={styles.modalText}>
                תאריך: {new Date(date).toLocaleDateString()}
              </Text>
              <Text style={styles.modalText}>שעה: {hour}</Text>
              <Button
                backgroundColor="#3770B4"
                onPress={() => orderQueue(hour)}
              >
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
    padding: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 30,
    fontFamily: "Arial Hebrew",
  },
  text: {
    alignSelf: "flex-end",
    marginBottom: 10,
    fontSize: 18,
    marginRight: 10,
    fontFamily: "Arial Hebrew",
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
    fontFamily: "Arial Hebrew",
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
    fontFamily: "Arial Hebrew",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "lightgrey",
    position: "absolute",
    right: 20,
  },
  container: {
    borderWidth: 1,
    borderWidth: 1,
    borderColor: "#CDCDCD", 
    padding: 10,
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "#d4ffc7",
    margin: 10,
    elevation: 5,
    width: 100,
    alignItems: "center",
  },
  dateText: {
    fontFamily: "Arial Hebrew",
    fontSize: 15,
  }
});

export default BookingScreen;
