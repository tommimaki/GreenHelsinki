import React from "react";
import { Text, Pressable, Image, View } from "react-native";

function WelcomeScreen({ navigation }) {
  return (
    <View className="w-full h-full">
      <View className="mx-4 h-full flex justify-center align-center space-y-6">
        <View></View>
        <Text className="text-blue text-2xl font-bold text-center mx-6">
          Keep all you client conversations in one place
        </Text>
        <Text className="text-white text-base text-center mx-4">
          At legal call we allow you to contact your clients through voice and
          text without giving out your phone number
        </Text>
        <View>
          <Pressable className="bg-blue  rounded-3xl py-2 px-4 m-4">
            <Text
              className="text-center text-white font-bold text-base"
              onPress={() => navigation.navigate("Sign In")}
            >
              Sign In
            </Text>
          </Pressable>
          <Pressable className="bg-blue rounded-3xl py-2 px-4 m-4">
            <Text
              className="text-center text-white font-bold text-base"
              onPress={() => navigation.navigate("Sign Up")}
            >
              Sign Up
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
export default WelcomeScreen;
