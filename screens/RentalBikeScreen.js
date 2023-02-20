import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

const RentalBikeScreen = () => {
  const [stationList, setStationList] = useState([]);

  useEffect(() => {
    fetch("https://api.digitransit.fi/routing/v1/routers/hsl/bike_rental")
      .then((response) => response.json())
      .then((data) => {
        setStationList(data.stations);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text> Please note, Citybikes are not available in the wintertime</Text>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 60.1699,
          longitude: 24.9384,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {stationList.map((station) => (
          <Marker
            key={station.id}
            coordinate={{
              latitude: station.y,
              longitude: station.x,
            }}
            title={station.name}
            description={`Available bikes: ${station.bikesAvailable}, Empty slots: ${station.spacesAvailable}`}
          />
        ))}
      </MapView>
    </View>
  );
};

export default RentalBikeScreen;
