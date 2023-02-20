import React, { useState, useEffect } from "react";
import { View } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import { decode } from "@mapbox/polyline";

const RoutePlanScreen = () => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  const fetchRouteData = () => {
    fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          plan(
            fromPlace: "Kamppi, Helsinki::60.168992,24.932366",
            toPlace: "Kasarmitori, Helsinki::60.165246,24.949128",
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
        const legGeometry = json.data.plan.itineraries[0].legs[0].legGeometry;
        console.log(legGeometry);
        const points = legGeometry.points;
        const coordinates = decode(points).map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));
        console.log(coordinates);
        setRouteCoordinates(coordinates);
      })
      .catch((error) => {
        console.error("Error fetching route data", error);
      });
  };

  useEffect(() => {
    fetchRouteData();
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
