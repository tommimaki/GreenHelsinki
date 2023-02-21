import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/native-stack";

const MapScreen = ({ route }) => {
  const { item } = route.params;
  console.log(item);
  console.log(item.name_fi);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/bg.jpeg")}
        style={styles.backgroundImage}
      />
      <View style={styles.infoContainer}>
        {item.name_fi && <Text style={styles.title}>{item.name_fi}</Text>}
        {item.street_address_fi && item.address_city_fi && (
          <Text style={styles.address}>
            {item.street_address_fi}, {item.address_city_fi}
          </Text>
        )}

        {item.desc_en && <Text> {item.desc_en} </Text>}
      </View>
      {item.latitude && item.longitude && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: item.latitude,
            longitude: item.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    marginBottom: 8,
  },
  map: {
    width: "100%",
    height: 400,
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

export default MapScreen;
