import React, { useState, useEffect } from "react";
import { View } from "react-native";
import MapView, { Polyline } from "react-native-maps";

const RoutePlanScreen = () => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.digitransit.fi/routing/v1/routers/hsl/route?fromPlace=60.168992,24.93236&toPlace=60.175294,24.68485&mode=BICYCLE"
    )
      .then((response) => response.json())
      .then((data) => {
        const points = data.plan.itineraries[0].legs.reduce(
          (accumulator, leg) => {
            const legPoints = leg.legGeometry.points.map((point) => {
              const [lat, lon] = point.split(",");
              return { latitude: Number(lat), longitude: Number(lon) };
            });
            return accumulator.concat(legPoints);
          },
          []
        );
        setRouteCoordinates(points);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 60.17,
          longitude: 24.94,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
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

export default RoutePlanScreen;
