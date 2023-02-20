import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";

const HomeScreen = ({ navigation }) => {
  const images = [
    {
      uri: require("../assets/thrift.jpg"),
      title: "Sustainable shopping in hki",
      screen: "RecyclingScreen",
    },
    {
      uri: require("../assets/bicycle.png"),
      title: "Bicycling in Helsinki",
      screen: "BicyclingScreen",
    },
    {
      uri: require("../assets/restaurant.jpg"),
      title: "delicious vege restaurants in hki",
      screen: "FoodScreen",
    },
  ];
  const handleImagePress = (screen) => {
    navigation.navigate(screen);
  };

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

      <View style={styles.swiperContainer}>
        <View style={styles.swiperContent}>
          <Swiper style={styles.swiper} autoplay={true}>
            {images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleImagePress(image.screen)}
              >
                <Image source={image.uri} style={styles.image} />
                <View style={styles.imageTitle}>
                  <Text style={styles.imageTitleText}>{image.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>
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
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginTop: 100,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  subtitleContainer: {
    backgroundColor: "rgba(60, 60, 60, 0.6)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  subtitle: {
    paddingHorizontal: 15,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },

  swiperContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  swiperContent: {
    flex: 1,
    justifyContent: "center",
    width: "90%",
    marginLeft: 70,
  },

  swiper: {
    marginTop: 100,
    height: 200,
  },
  image: {
    width: "80%",
    height: "80%",
    resizeMode: "cover",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "white",
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 20,
  },
  imageTitle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 120,
    width: "80%",
  },
  imageTitleText: {
    color: "green",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
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

export default HomeScreen;
