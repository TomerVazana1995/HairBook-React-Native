import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { Button, Heading } from "native-base";
import BookingDetailsComponent from "../components/BookingDetailsComponent";
import axios from "axios";
import DatePicker from "react-native-modern-datepicker";
import { UserContext } from "../context/context";
import { DatePickerModal } from "react-native-paper-dates";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

const baseUrl = "https://proj.ruppin.ac.il/cgroup30/prod/api";

const BookingScreen = () => {
  const [services, setServices] = useState([]);
  const [isTreatmentPicked, setIsTreatmentPicked] = useState(false);
  const [treatment, setTreatment] = useState(null);

  const [employees, setEmployees] = useState([]);
  const [isEmployeePicked, setIsEmployeePicked] = useState(false);
  const [employee, setEmployee] = useState(null);

  const [date, setDate] = useState(new Date());
  const [openDateModal, setOpenDateModal] = useState(false);

  const [hours, setHours] = useState([]);

  const [open, setOpen] = useState(false);

  const bottomSheetModalRef = useRef(null);

  const { user } = useContext(UserContext);

  const onDismissSingle = useCallback(() => {
    setOpenDateModal(false);
  }, [setOpenDateModal]);

  const onConfirmSingle = useCallback(
    (params) => {
      setOpenDateModal(false);
      setDate(params.date);
      console.log(params.date);
      console.log("this is date:", date);
      getDateHours();
    },
    [setOpenDateModal, setDate, getDateHours]
  );

  useEffect(() => {
    getServicesInfo();
  }, []);

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
      console.log("hello");
      const response = await axios.get(
        `${baseUrl}/Queue/GetAvailableTimes?serviceNum=${treatment}&phoneNum=${employee.phoneNum}&Date=2023-05-17T10:15:09.950Z&hairSalonId=${user.hairSalonId}`
      );
      setHours(response.data);
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  };
  
  const handlePickTreatment = (service) => {
    setIsTreatmentPicked(true);
    setTreatment(service.treatmentNum);
    axios
      .get(
        `${baseUrl}/Employee/GetByService?service=${service.treatmentNum}&hairsalonId=${user.hairSalonId}`
      )
      .then((response) => setEmployees(response.data))
      .catch((error) => console.log(error))
      .finally(() => console.log("employees:", employees));
  };

  const handlePickEmployee = async (employee) => {
    setIsEmployeePicked(true);
    setOpenDateModal(true);
    setEmployee(employee);
  
    try {
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
  const snapPoints = useMemo(() => ["10%", "60%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setOpen(true);
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
        alert("queue orederd");
      })
      .catch((error) => console.log(error));
  };

  return (
    <BottomSheetModalProvider>
      <View style={[styles.root]}>
        <View>
          <Text style={styles.title}>הזמנת תור</Text>
          <Text style={styles.text}>בחר סוג טיפול</Text>
          <View
            style={{
              flexDirection: "row-reverse",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <ScrollView horizontal>
              {services.map((service, index) => (
                <BookingDetailsComponent
                  key={index}
                  index={index}
                  text={service.treatmentType}
                  onPress={() => handlePickTreatment(service, index)}
                />
              ))}
            </ScrollView>
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
                <DatePickerModal
                  locale="he"
                  mode="single"
                  visible={openDateModal}
                  onDismiss={onDismissSingle}
                  date={date}
                  onConfirm={onConfirmSingle}
                  validRange={{
                    startDate: new Date(),
                    endDate: new Date("2023-05-30"),
                  }}
                />
                <BookingDetailsComponent
                  text={`${new Date(date).toLocaleDateString()}`}
                  onPress={() => setOpenDateModal(true)}
                />
              </View>
            </>
          )}
          {date && (
            <>
              <Text style={styles.text}>בחר שעה</Text>
              <View
                style={{
                  flexDirection: "row-reverse",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <ScrollView horizontal>
                  {hours.map((hour, index) => (
                    <BookingDetailsComponent
                      key={index}
                      text={`${hour}`}
                      onPress={() => orderQueue(hour)}
                    />
                  ))}
                </ScrollView>
              </View>
            </>
          )}
        </View>
        <View
          style={{ position: "absolute", alignSelf: "center", bottom: "15%" }}
        >
          <Text
            style={{ alignSelf: "center", marginTop: 50, marginBottom: 10 }}
          >
            אין תור פנוי?
          </Text>
          <Button alignSelf="center" backgroundColor="#3770B4">
            לחץ כאן לרשימת המתנה
          </Button>
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <Heading alignSelf="flex-end">פרטי הזמנת תור</Heading>
            <Text style={styles.modalText}>טיפול: {treatment}</Text>
            <Text style={styles.modalText}>עובד: {employee}</Text>
            <Text style={styles.modalText}>
              תאריך: {new Date(date).toLocaleDateString()}
            </Text>
            <Text style={styles.modalText}>שעה:</Text>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f8f8f8",
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
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    fontWeight: 500,
  },
});

export default BookingScreen;
