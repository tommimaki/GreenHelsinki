import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const RecyclingScreen = () => {
  const [recyclingCenters, setRecyclingCenters] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(
      "https://www.hel.fi/palvelukarttaws/rest/v4/unit/?service=KIERR%C3%84TYSKESKUS&include=location"
    )
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((center) =>
          center.name_fi.includes("Kierrätyskeskus")
        );
        setRecyclingCenters(filteredData);
      });
  }, []);

  const handleItemPress = (item) => {
    navigation.navigate("MapScreen", { item });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <View style={styles.item}>
          <Text style={styles.title}>{item.name_fi}</Text>
          <Text style={styles.address}>
            {item.street_address_fi}, {item.address_zip}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/bg.jpeg")}
        style={styles.backgroundImage}
      />
      <Text style={styles.heading}>Find Recycled Gems Here</Text>
      <FlatList
        data={recyclingCenters}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  item: {
    backgroundColor: "green",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  address: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    paddingTop: 5,
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

export default RecyclingScreen;
