import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
// import Carousel from "react-native-snap-carousel";

const HomeScreen = () => {
  //   const carouselData = [
  //     {
  //       image: require("../assets/restaurant.png"),
  //       targetScreen: "RestaurantScreen",
  //     },
  //     {
  //       image: require("../assets/hki.png"),
  //       targetScreen: "RestaurantScreen",
  //     },
  //     {
  //       image: require("../assets/bicycle.png"),
  //       targetScreen: "RestaurantScreen",
  //     },
  //     {
  //       image: require("../assets/thrift.png"),
  //       targetScreen: "RestaurantScreen",
  //     },
  //   ];

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/hki.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome to the</Text>
        <Text style={styles.title}> Green Helsinki Guide</Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Discover eco-friendly and</Text>
        <Text style={styles.subtitle}>sustainable places in Helsinki</Text>
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
  subtitleContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "green",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },

  subtitle: {
    paddingHorizontal: 15,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
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

export default HomeScreen;
