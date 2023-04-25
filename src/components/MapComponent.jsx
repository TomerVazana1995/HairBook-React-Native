import React from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";

const MapComponent = () => {

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 32.176629,
          longitude: 34.901105,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        provider={PROVIDER_GOOGLE}
      >
        <Marker coordinate={{ latitude: 32.176629, longitude: 34.901105 }}>
          <Callout>
            <Text>המספרה שלנו</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapComponent;
