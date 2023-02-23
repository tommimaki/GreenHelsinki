import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import HomeStack from "./Navigation/StackNavigator/";

import HomeScreen from "../screens/HomeScreen";
import RecyclingScreen from "../screens/RecyclingScreen";
import FoodScreen from "../screens/FoodScreen";
import BicyclingScreen from "../screens/BicyclingScreen";
import MapScreen from "../screens/MapScreen";
import RentalBikeScreen from "../screens/RentalBikeScreen";
import RoutePlanScreen from "../screens/RoutePlanScreen";
import AppHeader from "../components/AppHeader";
import ProfileScreen from "../screens/ProfileScreen";
// import { MaterialCommunityIcons } from "react-native-vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeHeader = ({ navigation, route }) => ({
  header: () => <AppHeader navigation={navigation} title="Home" />,
});

const ProfileHeader = ({ navigation, route }) => ({
  header: () => (
    <AppHeader
      leftComponent={{
        icon: "arrow-back",
        onPress: () => navigation.goBack(),
      }}
      navigation={navigation}
      previous={route.name !== "HomeScreen"}
      title="profile"
    />
  ),
});

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation, route }) => HomeHeader({ navigation, route })}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ navigation, route }) =>
          ProfileHeader({ navigation, route })
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
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
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

export const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeStack}
        options={{ header: () => <AppHeader title="Home" /> }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileStack}
        options={{ title: "Profile" }}
      />
    </Stack.Navigator>
  );
};

export default function Nav() {
  return (
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
