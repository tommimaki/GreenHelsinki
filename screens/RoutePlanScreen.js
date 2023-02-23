import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Image,
  ScrollView,
} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import { decode } from "@mapbox/polyline";
import { Input, Button } from "@rneui/base";
import { GEOCODING_API } from "@env";
const RoutePlanScreen = () => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [error, setError] = useState(null);
  const opacityValue = useRef(new Animated.Value(0)).current;
  const [animationTo, setAnimationTo] = useState("");
  const [animationFrom, setAnimationFrom] = useState("");

  // const [inputHeights, setInputHeight] = useState(
  //   new Animated.Value(100)
  // ).current;

  // haetaan geolocation data
  const geocode = (address) => {
    return fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${GEOCODING_API}`
    )
      .then((response) => response.json())
      .then((data) => {
        const location = data.results[0].geometry.location;
        const newCoordinates = {
          latitude: location.lat,
          longitude: location.lng,
        };
        return newCoordinates;
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  const handleSearch = async () => {
    const fromLocationData = await geocode(startLocation);
    const toLocationData = await geocode(endLocation);
    setFromLocation(fromLocationData);
    setToLocation(toLocationData);
    setAnimationTo(startLocation);
    setAnimationFrom(endLocation);
    setStartLocation("");
    setEndLocation("");
  };

  // asetetaan haettu geolocation data hakuparametriksi reitin hakuun
  const fetchRouteData = () => {
    fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          plan(
            fromPlace: "${fromLocation.latitude},${fromLocation.longitude}",
            toPlace: "${toLocation.latitude},${toLocation.longitude}",
            numItineraries: 1,
            transportModes: [{mode: BICYCLE, qualifier: RENT}, {mode: WALK}],
          ) {
            itineraries{
              walkDistance
              duration
              legs {
                mode
                startTime
                endTime
                from {
                  lat
                  lon
                  name
                  bikeRentalStation {
                    stationId
                    name
                  }
                }
                to {
                  lat
                  lon
                  name
                  bikeRentalStation {
                    stationId
                    name
                  }
                }
                distance
                legGeometry {
                  length
                  points
                }
              }
            }
          }
        }`,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        const itinerary = json.data.plan.itineraries[0];
        const legs = itinerary.legs;
        const distance = legs.reduce((sum, leg) => sum + leg.distance, 0);

        const legGeometry = json.data.plan.itineraries[0].legs[0].legGeometry;
        console.log(legGeometry);
        const points = legGeometry.points;
        const coordinates = decode(points).map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));
        setRouteCoordinates(coordinates);
      })
      .catch((error) => {
        console.error("Error fetching route data", error);
      });
  };

  useEffect(() => {
    if (fromLocation && toLocation) {
      fetchRouteData();
    }
  }, [fromLocation, toLocation]);

  //animaatio matkatiedoille
  const fadeIn = () => {
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    if (routeCoordinates.length > 0) {
      fadeIn();
    }
  }, [routeCoordinates]);

  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <Image
          source={require("../assets/bg2.jpeg")}
          style={styles.backgroundImage}
        />
        <View style={styles.search}>
          <View style={styles.inputs}>
            <Input
              style={styles.input}
              placeholder="Start location"
              value={startLocation}
              onChangeText={setStartLocation}
            />
            <Input
              style={styles.input}
              placeholder="End location"
              value={endLocation}
              onChangeText={setEndLocation}
            />
          </View>
          <Button
            title="Search"
            buttonStyle={styles.button}
            onPress={handleSearch}
          />
        </View>

        <Animated.View style={[styles.tripInfo, { opacity: opacityValue }]}>
          <Text style={styles.heading}>
            {`Journey from ${animationFrom} to ${animationTo}\n`}
            {`Distance: ${routeCoordinates.length / 100} km`}
          </Text>
        </Animated.View>
        <View style={{ flex: 1 }}>
          <MapView
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "green",
              height: 400,
            }}
            initialRegion={{
              latitude: 60.17,
              longitude: 24.94,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            {toLocation && (
              <Marker coordinate={toLocation} title="End location" />
            )}
            {fromLocation && (
              <Marker coordinate={fromLocation} title="Start location" />
            )}
            {routeCoordinates.length > 0 && (
              <Polyline
                coordinates={routeCoordinates}
                strokeColor="#FF0000"
                strokeWidth={4}
              />
            )}
          </MapView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputs: {
    flexDirection: "row",
    width: 200,
    paddingRight: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    margin: 2,
    padding: 5,
    borderRadius: 20,
    borderColor: "green",
    backgroundColor: "white",
  },
  tripInfo: {
    backgroundColor: "#03C03C",
    height: 60,
    borderRadius: 15,
    width: "80%",
    alignSelf: "center",
    marginVertical: 2,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10, // add box shadow
    shadowColor: "black", // add box shadow
    shadowOffset: { width: 10, height: 5 }, // add box shadow
    shadowOpacity: 0.7, // add box shadow
    shadowRadius: 3.9, // add box shadow
  },
  heading: {
    color: "white",
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    textAlign: "center",
  },
  search: {
    marginTop: 110,
    padding: 10,
  },
  button: {
    backgroundColor: "#03C03C",
    borderRadius: 20,
    height: 50,
    width: "80%",
    alignSelf: "center",
    textAlign: "center",

    borderWidth: 2,
    borderColor: "white",
  },
  backgroundImage: {
    position: "absolute",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 1,
  },
});
export default RoutePlanScreen;
