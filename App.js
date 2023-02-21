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

// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();
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
              style: { color: "white", paddingLeft: 15, paddingBottom: 5 },
              onPress: () => navigation.goBack(),
            }
          : null
      }
      centerComponent={{
        text: title,
        style: { color: "white", fontSize: 20, fontWeight: "bold" },
      }}
      style={{
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 20,
      }}
      containerStyle={{
        borderRadius: 30,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        height: 100,
        paddingBottom: 5,
        elevation: 10, // add box shadow
        shadowColor: "black", // add box shadow
        shadowOffset: { width: 0, height: 2 }, // add box shadow
        shadowOpacity: 0.7, // add box shadow
        shadowRadius: 3.9, // add box shadow
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
        barStyle={{
          backgroundColor: "#03C03C",
          borderWidth: 1,
          borderColor: "white",
        }}
        inactiveColor="white"
        activeColor="green"
        screenOptions={({ route }) => ({
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
            return <Ionicons name={iconName} size={30} color={color} />;
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
          options={{ headerShown: false, tabBarLabel: "Thrift Stores" }}
        />
        <Tab.Screen
          name="FoodScreen"
          options={{ headerShown: false, tabBarLabel: "Restaurants" }}
          component={FoodStack}
        />
        <Tab.Screen
          name="BicyclingScreen"
          component={BikeStack}
          options={{ headerShown: false, tabBarLabel: "Bicycling" }}
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
