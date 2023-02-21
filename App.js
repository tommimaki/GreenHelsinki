import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import HomeScreen from "./screens/HomeScreen";
import RecyclingScreen from "./screens/RecyclingScreen";
import FoodScreen from "./screens/FoodScreen";
import BicyclingScreen from "./screens/BicyclingScreen";
import MapScreen from "./screens/MapScreen";
import RentalBikeScreen from "./screens/RentalBikeScreen";
import RoutePlanScreen from "./screens/RoutePlanScreen";
import { Header } from "@rneui/themed";
// import { MaterialCommunityIcons } from "react-native-vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppHeader = ({ navigation, previous, title }) => {
  return (
    <Header
      backgroundColor="#03C03C"
      fontWeight="bold"
      leftComponent={
        previous
          ? {
              icon: "arrow-back",
              color: "#fff",
              style: { color: "white" },
              onPress: () => navigation.goBack(),
            }
          : null
      }
      centerComponent={{
        text: title,
        style: { color: "white", fontSize: 20, fontWeight: "bold" },
      }}
      style={{
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}
      containerStyle={{
        // borderBottomWidth: 10,
        borderRadius: 30,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        height: 100,
      }}
    />
  );
};

const HomeHeader = ({ navigation, route }) => ({
  header: () => <AppHeader navigation={navigation} title="Home" />,
});

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation, route }) => HomeHeader({ navigation, route })}
      />
    </Stack.Navigator>
  );
};
const FoodHeader = ({ navigation }) => ({
  header: () => (
    <AppHeader navigation={navigation} title="Food" style={styles.header} />
  ),
});

const FoodStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FoodScreen"
        component={FoodScreen}
        options={({ navigation, route }) => FoodHeader({ navigation, route })}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={({ navigation, route }) => MapHeader({ navigation, route })}
      />
    </Stack.Navigator>
  );
};
const RecycleHeader = ({ navigation, route }) => ({
  header: () => (
    <AppHeader
      navigation={navigation}
      previous={route.name !== "RecyclingScreen"}
      title="Recycling"
    />
  ),
});

const RecycleStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RecyclingScreen"
        component={RecyclingScreen}
        options={({ navigation, route }) =>
          RecycleHeader({ navigation, route })
        }
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={({ navigation, route }) => MapHeader({ navigation, route })}
      />
    </Stack.Navigator>
  );
};

const BicycleHeader = ({ navigation, route }) => ({
  header: () => (
    <AppHeader
      navigation={navigation}
      previous={route.name !== "BicyclingScreen"}
      title="Bicycling"
    />
  ),
});

const BikeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BicyclingScreen"
        component={BicyclingScreen}
        options={({ navigation, route }) =>
          BicycleHeader({ navigation, route })
        }
      />
      <Stack.Screen
        name="RentalBikeScreen"
        component={RentalBikeScreen}
        options={({ navigation, route }) => MapHeader({ navigation, route })}
      />
      <Stack.Screen
        name="RoutePlanScreen"
        component={RoutePlanScreen}
        options={({ navigation, route }) => MapHeader({ navigation, route })}
      />
    </Stack.Navigator>
  );
};
const MapHeader = ({ navigation, route }) => ({
  header: () => (
    <AppHeader
      leftComponent={{
        icon: "arrow-back",
        onPress: () => navigation.goBack(),
      }}
      navigation={navigation}
      previous={route.name !== "FoodScreen"}
      title="Map"
    />
  ),
});

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tapBarStyle: {
            height: 150,
            backgroundColor: "green",
            borderRadius: 20,
          },
          style: { backgroundColor: "green" },
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "HomeScreen") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "RecyclingScreen") {
              iconName = focused ? "cart" : "cart-outline";
            } else if (route.name === "FoodScreen") {
              iconName = focused ? "fast-food" : "fast-food-outline";
            } else if (route.name === "BicyclingScreen") {
              iconName = focused ? "bicycle" : "bicycle-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="HomeScreen"
          options={{ headerShown: false }}
          component={HomeStack}
        />
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
    backgroundColor: "#green",
    alignItems: "center",
    justifyContent: "center",
  },
});
