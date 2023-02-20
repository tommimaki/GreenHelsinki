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
import RentalBikeScreen from "./screens/RentalBikeScreen";
import RoutePlanScreen from "./screens/RoutePlanScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const RecycleStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RecyclingScreen" component={RecyclingScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
};
const FoodStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FoodScreen" component={FoodScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
};
const BikeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BicyclingScreen" component={BicyclingScreen} />
      <Stack.Screen name="RentalBikeScreen" component={RentalBikeScreen} />
      <Stack.Screen name="RoutePlanScreen" component={RoutePlanScreen} />
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
          component={RecycleStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="FoodScreen"
          options={{ headerShown: false }}
          component={FoodStack}
        />
        <Tab.Screen
          name="BicyclingScreen"
          component={BikeStack}
          options={{ headerShown: false }}
        />
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
