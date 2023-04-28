import React, { useState, useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../data/environments";
import Constants from "expo-constants";
import MapViewDirections from "react-native-maps-directions";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

INITIAL_POSITION = {
  latitude: 32.176629,
  longitude: 34.901105,
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
};

const edgePaddingValue = 70;

const edgePadding = {
  top: edgePaddingValue,
  right: edgePaddingValue,
  left: edgePaddingValue,
  bottom: edgePaddingValue
}

function GoogleAutoComplete({ label, placeholder, onPlaceSelected }) {
  return (
    <>
      <Text style={{alignSelf: "flex-end"}}>{label}</Text>
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        placeholder={placeholder}
        fetchDetails
        onPress={(data, details = null) => {
          onPlaceSelected(details);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: "he",
        }}
      />
    </>
  );
}

const MapComponent = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState("");
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [ duration, setDuration] = useState(0);

  const mapRef = useRef(null);

  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current.animateCamera(camera, { duration: 1000 });
    }
  };

  const onPlaceSelected = (details, flag) => {
    const set = flag === "מיקום נוכחי" ? setOrigin : setDestination;
    const position = {
      latitude: details.geometry.location.lat || 0,
      longitude: details.geometry.location.lng || 0,
    };
    set(position);
    moveTo(position);
  };

  const traceRoute = () => {
    if(origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], {edgePadding})
    }
  }

  const traceRouteOnReady = (args) => {
    if(args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={INITIAL_POSITION}
        provider={PROVIDER_GOOGLE}
      >
        {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} />}
        {showDirections && origin && destination &&
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeColor="#6644ff"
            strokeWidth={4}
            onReady={traceRouteOnReady}
          />
        }
      </MapView>
      <View style={styles.searchContainer}>
        <GoogleAutoComplete
          label="מיקום נוכחי"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "מיקום נוכחי");
          }}
        />
        <GoogleAutoComplete
          label="יעד"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "יעד");
          }}
        />
        <TouchableOpacity style={styles.button} onPress={traceRoute}>
          <Text style={styles.buttonText}>נווט ליעד</Text>
        </TouchableOpacity>
      </View>
      {distance && duration ? (<View>
          <Text>Distance: {distance.toFixed(2)}</Text>
          <Text>Duration: {Math.ceil(duration)}</Text>
        </View>): null}
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: 5,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#bbb",
    paddingVertical: 12,
    marginTop: 10,
    borderRadius: 4
  },
  buttonText: {
    textAlign: "center"
  }
});

export default MapComponent;
