import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const RecyclingScreen = () => {
  const [recyclingCenters, setRecyclingCenters] = useState([]);

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

  const renderItem = ({ item }) => {
    const { name_fi, street_address_fi, address_zip } = item;

    return (
      <View style={styles.item}>
        <Text style={styles.title}>{name_fi}</Text>
        <Text style={styles.address}>
          {street_address_fi}, {address_zip}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    backgroundColor: "green",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  address: {
    fontSize: 14,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});

export default RecyclingScreen;