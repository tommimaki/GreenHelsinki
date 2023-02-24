import React from "react";
import { Header, Icon } from "@rneui/themed";

export default function AppHeader({ navigation, previous, title }) {
  return (
    <Header
      backgroundColor="#03C03C"
      fontWeight="bold"
      leftComponent={
        previous
          ? {
              icon: "arrow-back",
              color: "#fff",
              style: { color: "white", paddingLeft: 15, paddingBottom: 5 },
              onPress: () => navigation.goBack(),
            }
          : null
      }
      centerComponent={{
        text: title,
        style: { color: "white", fontSize: 20, fontWeight: "bold" },
      }}
      rightComponent={
        <Icon
          name="person-circle-outline"
          type="ionicon"
          color="white"
          onPress={() => navigation.navigate("ProfileScreen")}
        />
      }
      containerStyle={{
        borderRadius: 30,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        paddingBottom: 5,
        elevation: 10, // add box shadow
        shadowColor: "black", // add box shadow
        shadowOffset: { width: 0, height: 2 }, // add box shadow
        shadowOpacity: 0.7, // add box shadow
        shadowRadius: 3.9, // add box shadow
      }}
    />
  );
}
