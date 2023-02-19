import React from "react";
import { FlatList, Text, View } from "react-native";

const FoodScreen = () => {
  const data = [
    {
      id: "1",
      title: "Pizza",
      description: "Delicious pizza with tomato sauce, cheese, and toppings.",
    },
    {
      id: "2",
      title: "Hamburger",
      description:
        "Juicy beef patty with cheese, lettuce, tomato, and a sesame bun.",
    },
    {
      id: "3",
      title: "Sushi",
      description:
        "Fresh and delicious raw fish and rice rolls with soy sauce and wasabi.",
    },
    {
      id: "4",
      title: "Tacos",
      description:
        "Spicy and flavorful tacos with seasoned meat, lettuce, tomato, and salsa.",
    },
    {
      id: "5",
      title: "Pasta",
      description:
        "Classic Italian dish with noodles, tomato sauce, and meatballs.",
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default FoodScreen;
