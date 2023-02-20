import React, { useState, useEffect } from "react";
import { View } from "react-native";
import MapView, { Polyline } from "react-native-maps";
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
    if (fromLocation && toLocation) {
      fetchRouteData();
    }
  }, [fromLocation, toLocation]);

  return (
    <View style={{ flex: 1 }}>
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

      <Button title="Search" onPress={handleSearch} />

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

// import React, { useState } from "react";
// import { View } from "react-native";
// import MapView, { Polyline } from "react-native-maps";
// import { decode } from "@mapbox/polyline";
// import { Input, Button } from "@rneui/base";
// import { GOOGLE_MAPS_API_KEY } from "@env";

// const RoutePlanScreen = () => {
//   const [routeCoordinates, setRouteCoordinates] = useState([]);
//   const [fromAddress, setFromAddress] = useState("");
//   const [toAddress, setToAddress] = useState("");

//   const handleSearch = async () => {
//     try {
//       // Fetch geolocations for fromAddress and toAddress using Google Geocoding API
//       const fromResponse = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//           fromAddress
//         )}&key=${GOOGLE_MAPS_API_KEY}`
//       );
//       const fromResult = await fromResponse.json();
//       const fromLocation = fromResult.results[0].geometry.location;

//       const toResponse = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//           toAddress
//         )}&key=${GOOGLE_MAPS_API_KEY}`
//       );
//       const toResult = await toResponse.json();
//       const toLocation = toResult.results[0].geometry.location;

//       // Fetch route data using Digitransit API
//       const response = await fetch(
//         `https://api.digitransit.fi/routing/v1/routers/hsl/plan?fromPlace=${fromLocation.lat},${fromLocation.lng}&toPlace=${toLocation.lat},${toLocation.lng}`
//       );
//       const json = await response.json();
//       const legGeometry = json.data.plan.itineraries[0].legs[0].legGeometry;
//       const points = legGeometry.points;
//       const coordinates = decode(points).map((point) => ({
//         latitude: point[0],
//         longitude: point[1],
//       }));
//       setRouteCoordinates(coordinates);
//     } catch (error) {
//       console.error("Error fetching data", error);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <Input
//         placeholder="From"
//         value={fromAddress}
//         onChangeText={setFromAddress}
//       />
//       <Input placeholder="To" value={toAddress} onChangeText={setToAddress} />
//       <Button title="Search" onPress={handleSearch} />

//       <MapView
//         style={{ flex: 1 }}
//         initialRegion={{
//           latitude: 60.17,
//           longitude: 24.94,
//           latitudeDelta: 0.05,
//           longitudeDelta: 0.05,
//         }}
//       >
//         {routeCoordinates.length > 0 && (
//           <Polyline
//             coordinates={routeCoordinates}
//             strokeColor="#FF0000"
//             strokeWidth={4}
//           />
//         )}
//       </MapView>
//     </View>
//   );
// };

// export default RoutePlanScreen;
