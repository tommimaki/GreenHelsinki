import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { useNavigation } from "@react-navigation/native";

const BicyclingScreen = () => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate("RentalBikeScreen");
  };
  const handleNavigationRoutes = () => {
    navigation.navigate("RoutePlanScreen");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/bg2.jpeg")}
        style={styles.backgroundImage}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Bicycling in Helsinki</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.content}>
          Helsinki is a great city for bicycling, with a well-developed network
          of bike paths and lanes. Whether you're a commuter or a leisure rider,
          there are plenty of options for you to explore the city on two wheels.
        </Text>
        <Text style={styles.content}>
          Some popular routes include the scenic coastal path from Kaivopuisto
          to Hietaranta Beach, the green route through Central Park, and the
          bike-friendly streets of Kallio and Punavuori.
        </Text>
        <Text style={styles.content}>
          You can rent a bike from one of the many rental companies in the city,
          or use the city's public bike share system, which has over 2,000 bikes
          available for rent at stations throughout the city.
        </Text>
      </View>

      <View>
        <TouchableOpacity style={styles.opacity} onPress={handleNavigation}>
          <View style={styles.rowContainer}>
            <Text style={styles.opacityText}>
              Citybike rental station locations{" "}
            </Text>
            <Icon name="bicycle" size={30} color="white" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.opacity}
          onPress={handleNavigationRoutes}
        >
          <View style={styles.rowContainer}>
            <Text style={styles.opacityText}>Search for paths here</Text>
            <Icon name="map-signs" size={30} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  opacity: {
    backgroundColor: "#03C03C",
    width: 400,
    height: 100,
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    shadowColor: "black", // add box shadow
    shadowOffset: { width: 10, height: 7 }, // add box shadow
    shadowOpacity: 0.9, // add box shadow
    shadowRadius: 5, // add box shadow
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
    // alignItems: "center",
  },
  opacityText: {
    fontSize: 20,
    color: "white",
    fontWeight: "700",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  titleContainer: {
    marginTop: 120,
    backgroundColor: "rgba(3, 192, 60, 0.7)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 10, // add box shadow
    shadowColor: "black", // add box shadow
    shadowOffset: { width: 2, height: 2 }, // add box shadow
    shadowOpacity: 0.2, // add box shadow
    shadowRadius: 3.9, // add box shadow
  },
  contentContainer: {
    backgroundColor: "rgba(3, 192, 60, 0.8)",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 5, height: 3 },
    textShadowRadius: 4,
    textAlign: "center",
  },

  content: {
    fontSize: 18,
    textAlign: "left",
    marginBottom: 10,
    color: "white",
    fontWeight: "700",
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
    opacity: 0.8,
  },
});

export default BicyclingScreen;
