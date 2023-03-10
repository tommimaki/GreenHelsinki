import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
