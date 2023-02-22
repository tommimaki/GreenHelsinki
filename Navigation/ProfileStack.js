import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton } from "react-native-paper";
import ProfileScreen from "../screens/ProfileScreen";
import AppHeader from "../components/AppHeader";

const Stack = createNativeStackNavigator();

const ProfileHeader = ({ navigation }) => ({
  header: () => (
    <AppHeader navigation={navigation} title="Profile" style={styles.header} />
  ),
});

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ navigation }) => ({
          ...ProfileHeader({ navigation }),
          headerLeft: () => (
            <IconButton
              icon="account"
              color="white"
              onPress={() => navigation.navigate("ProfileScreen")}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#03C03C",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 20,
  },
});
