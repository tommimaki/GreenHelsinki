import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

const MapScreen = ({ route }) => {
  const { item } = route.params;
  console.log(item);
  console.log(item.name_fi);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/bg2.jpeg")}
        style={styles.backgroundImage}
      />

      <View style={styles.infoContainer}>
        {item.name_fi && <Text style={styles.title}>{item.name_fi}</Text>}
        {item.street_address_fi && item.address_city_fi && (
          <Text style={styles.address}>
            {item.street_address_fi}, {item.address_city_fi}
          </Text>
        )}

        {item.desc_en && <Text style={styles.address}> {item.desc_en} </Text>}
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
    width: "90%",
    marginHorizontal: 8,
    marginTop: 120,
    backgroundColor: "#03C03C",
    padding: 16,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 50,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    borderLeftColor: "white",
    borderLeftWidth: 3,
    elevation: 10, // add box shadow
    shadowColor: "black", // add box shadow
    shadowOffset: { width: 0, height: 2 }, // add box shadow
    shadowOpacity: 0.7, // add box shadow
    shadowRadius: 3.9, // add box shadow
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 2,
  },
  address: {
    fontSize: 16,
    marginBottom: 8,
    color: "white",
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  map: {
    flex: 1,
    width: "100%",
    height: 400,
    borderTopWidth: 2,
    borderTopColor: "black",
    borderWidth: 1,
    borderColor: "green",
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
