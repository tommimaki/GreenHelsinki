import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from "react-native";

import { ListItem } from "@rneui/base";
import TouchableScale from "react-native-touchable-scale";

const FoodScreen = ({ navigation }) => {
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
      });
  }, []);

  const handleItemPress = (item) => {
    navigation.navigate("MapScreen", { item });
  };

  const renderItem = ({ item }) => {
    return (
      <ListItem
        bottomDivider
        onPress={() => handleItemPress(item)}
        Component={TouchableScale}
        friction={90}
        tension={100}
        activeScale={0.95}
        style={styles.listItem}
      >
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{item.name_fi}</ListItem.Title>
          <ListItem.Subtitle style={styles.address}>
            {item.street_address_fi}, {item.address_zip}{" "}
            <Text style={styles.see}>See on map</Text>
            <ListItem></ListItem>
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/bg.jpeg")}
        style={styles.backgroundImage}
      />
      <FlatList
        data={restaurantList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
  },
  listItem: {
    marginVertical: 2,
  },
  see: {
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  address: {
    fontSize: 14,
    fontWeight: "bold",
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
export default FoodScreen;
