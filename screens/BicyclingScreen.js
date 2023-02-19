import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const BicyclingScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Image
        source={require("../assets/bicycle.jpg")}
        style={styles.backgroundImage}
      /> */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  titleContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  contentContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "green",
  },

  content: {
    fontSize: 18,
    textAlign: "left",
    marginBottom: 10,
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
