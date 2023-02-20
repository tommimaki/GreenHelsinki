import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import RecyclingScreen from "./screens/RecyclingScreen";
import FoodScreen from "./screens/FoodScreen";
import BicyclingScreen from "./screens/BicyclingScreen";
import MapScreen from "./screens/MapScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RecyclingScreen" component={RecyclingScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen
          name="RecyclingScreen"
          component={StackNav}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="FoodScreen" component={FoodScreen} />
        <Tab.Screen name="BicyclingScreen" component={BicyclingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
