import React, { useState, useEffect } from "react";
import { FlatList, Text, View } from "react-native";

const FoodScreen = () => {
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    fetch(
      "https://www.hel.fi/palvelukarttaws/rest/v4/unit/?service=RAVINTOLA&search=vegan&language=en"
    )
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (center) => !center.name_fi.includes("koulu")
        );
        console.log(data);
        setRestaurantList(filteredData);
        // setRestaurantList(data);
      });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontWeight: "bold" }}>{item.name_fi}</Text>
        <Text>{item.desc_en}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={restaurantList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default FoodScreen;
