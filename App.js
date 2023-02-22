import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import Nav from "./Navigation/StackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <Nav />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#green",
    alignItems: "center",
    justifyContent: "center",
  },
});
