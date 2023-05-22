import { View, Text, StyleSheet } from "react-native";
import React, { useRef, useMemo, useCallback } from "react";
import BottomSheetModal, {useBottomSheet} from "@gorhom/bottom-sheet";
import { DatePickerModal } from "react-native-paper-dates";


const BottomPopup = ({service, worker, date, time, isAvailable, open}) => {
  const bottomSheetRef = useRef(null);


  // variables
  const snapPoints = useMemo(() => ["10%", "50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current.present();
  }, []);
  
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={open ? 1 : 0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      animateOnMount={false}
      
    >
      <View style={styles.contentContainer}>
        <Text>טיפול: {service}</Text>
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    border: 1,
  },
});

export default BottomPopup;
