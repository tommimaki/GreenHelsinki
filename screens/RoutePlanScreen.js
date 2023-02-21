import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
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
        console.log(json);
        const itinerary = json.data.plan.itineraries[0];
        const legs = itinerary.legs;
        const distance = legs.reduce((sum, leg) => sum + leg.distance, 0);
        console.log(`Total distance: ${distance} meters`);

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
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    if (routeCoordinates.length > 0) {
      fadeIn();
    }
  }, [routeCoordinates]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.inputs}>
        <Input
          style={{ flex: 1, borderWidth: 1, margin: 10, padding: 5 }}
          placeholder="Start location"
          value={startLocation}
          onChangeText={setStartLocation}
        />
        <Input
          style={{ flex: 1, borderWidth: 1, margin: 10, padding: 5 }}
          placeholder="End location"
          value={endLocation}
          onChangeText={setEndLocation}
        />
      </View>
      <Button
        title="Search"
        buttonStyle={{ backgroundColor: "#03C03C" }}
        onPress={handleSearch}
      />

      <Animated.View style={[styles.tripInfo, { opacity: opacityValue }]}>
        <Text>
          {`Journey from ${animationFrom} to ${animationTo}\n`}
          {`Distance: ${routeCoordinates.length / 100} km`}
        </Text>
      </Animated.View>

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 60.17,
          longitude: 24.94,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {toLocation && <Marker coordinate={toLocation} title="End location" />}
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
  );
};

const styles = StyleSheet.create({
  inputs: {
    marginTop: 120,
    flexDirection: "row",
    width: 200,
  },
  tripInfo: {
    backgroundColor: "green",
    height: 100,
  },
});
export default RoutePlanScreen;
