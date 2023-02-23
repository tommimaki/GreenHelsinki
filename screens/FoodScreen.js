import React, { useState, useEffect, useRef } from "react";

import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Animated,
  ScrollView,
  Dimensions,
} from "react-native";

import { ListItem } from "@rneui/base";

import TouchableScale from "react-native-touchable-scale";

const FoodScreen = ({ navigation }) => {
  const [restaurantList, setRestaurantList] = useState([]);

  //haetaan ravintoladata
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

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Image
          source={require("../assets/bg2.jpeg")}
          style={styles.backgroundImage}
        /> */}
        <View style={styles.content}>
          <View style={styles.headingcontainer}>
            <Text style={styles.heading}>
              Find the best vegetarian restaurants!
            </Text>
          </View>

          {restaurantList.map((item) => (
            <ListItem
              key={item.id}
              onPress={() => handleItemPress(item)}
              Component={TouchableScale}
              friction={90}
              tension={100}
              activeScale={0.95}
              containerStyle={styles.containerStyle}
            >
              <ListItem.Content style={{ paddingVertical: 0 }}>
                <ListItem.Title style={styles.title}>
                  {item.name_fi}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.address}>
                  {item.street_address_fi}, {item.address_zip}
                </ListItem.Subtitle>
                <Text style={styles.see}>See on map</Text>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 80,
  },
  headingcontainer: {
    marginVertical: 10,
    backgroundColor: "rgba(3, 192, 60, 0.7)",
    width: "80%",
    alignSelf: "center",
    elevation: 10, // add box shadow
    shadowColor: "black", // add box shadow
    shadowOffset: { width: 10, height: 7 }, // add box shadow
    shadowOpacity: 0.9, // add box shadow
    shadowRadius: 5, // add box shadow
    borderRadius: 20,
    padding: 3,
    borderColor: "white",
    borderBottomWidth: 2,
    borderRightWidth: 2,
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
  containerStyle: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderLeftWidth: 3,
    borderBottomWidth: 1,
    borderLeftColor: "white",
    borderBottomColor: "white",
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: "#03C03C",
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 10, // add box shadow
    shadowColor: "black", // add box shadow
    shadowOffset: { width: 10, height: 5 }, // add box shadow
    shadowOpacity: 0.7, // add box shadow
    shadowRadius: 3.9, // add box shadow
    width: "95%",
    alignSelf: "center",
  },
  heading: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 5, height: 3 },
    textShadowRadius: 4,
    textAlign: "center",
  },
});
export default FoodScreen;
