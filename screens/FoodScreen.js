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
// import { useTheme } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";
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
        containerStyle={{
          // borderRadius: 10,
          borderBottomRightRadius: 10,
          borderTopRightRadius: 10,
          borderLeftWidth: 3,
          borderLeftColor: "white",
          marginVertical: 5,
          marginHorizontal: 5,
          backgroundColor: "#03C03C",
          paddingVertical: 8,
          paddingHorizontal: 16,
        }}
      >
        <ListItem.Content style={{ paddingVertical: 0 }}>
          <ListItem.Title style={styles.title}>{item.name_fi}</ListItem.Title>
          <ListItem.Subtitle style={styles.address}>
            {item.street_address_fi}, {item.address_zip}
          </ListItem.Subtitle>

          <Text style={styles.see}>See on map</Text>
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
        style={styles.FlatList}
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
  },
  FlatList: {
    marginTop: 100,
  },
  listItem: {
    marginVertical: 10,
    backgroundColor: "springgreen",
  },
  listItemContainer: {
    borderRadius: 20,
    backgroundColor: "green",
  },
  see: {
    alignSelf: "flex-end",
    color: "white",
    textShadowColor: "white",
    textShadowRadius: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 11,
  },
  address: {
    fontSize: 14,
    fontWeight: "bold",
    paddingTop: 5,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
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
