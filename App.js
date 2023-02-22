import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import Nav from "./Navigation/StackNavigator";
import AuthStack from "./Navigation/AuthStack";
import BaseNav from "./Navigation/BaseNav";
import { RootStack } from "./Navigation/StackNavigator";

{
  /* <Nav /> */
}
export default function App() {
  return (
    <NavigationContainer>
      {/* <AuthStack /> */}
      <BaseNav />
    </NavigationContainer>
  );
}

{
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#green",
    alignItems: "center",
    justifyContent: "center",
  },
});
