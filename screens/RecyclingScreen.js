import React from "react";
import { FlatList, Text, View } from "react-native";

const RecyclingScreen = () => {
  const data = [
    { id: "1", title: "Item 1" },
    { id: "2", title: "Item 2" },
    { id: "3", title: "Item 3" },
    { id: "4", title: "Item 4" },
    { id: "5", title: "Item 5" },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={{ padding: 16 }}>
        <Text>{item.title}</Text>
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

export default RecyclingScreen;
