import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import { ListItem } from "@rneui/base";

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

  // const renderItem = ({ item }) => {
  //   return (
  //     <TouchableOpacity onPress={() => handleItemPress(item)}>
  //       <View style={styles.listItem}>
  //         <Text style={styles.title}>{item.name_fi}</Text>
  //         <Text style={styles.address}>
  //           {item.street_address_fi}, {item.address_zip}
  //         </Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };
  const renderItem = ({ item }) => {
    return (
      <ListItem bottomDivider onPress={() => handleItemPress(item)}>
        <ListItem.Content>
          <ListItem.Title>{item.name_fi}</ListItem.Title>
          <ListItem.Subtitle>
            {item.street_address_fi}, {item.address_zip}
            <ListItem></ListItem>
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
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

const styles = StyleSheet.create({
  listItem: {
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "green",
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 14,
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
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    fontWeight: "bold",
    paddingTop: 5,
  },
});
export default FoodScreen;
