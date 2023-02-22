import { Input } from "@rneui/base";
import React from "react";
import { Text, View, TextInput } from "react-native";
import { Button } from "react-native-paper";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, app } from "../firebase/firebase";

function WelcomeScreen({ navigation }) {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
  });

  function signUp() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }
  }
  function create() {
    createUserWithEmailAndPassword(auth, value.email, value.password);
    console.log(auth);
  }

  console.log(value);
  return (
    <View className="w-full h-full">
      <View>
        <Text> welcome</Text>
      </View>

      <View>
        <Text>Signup</Text>
        <TextInput
          placeholder="Email"
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
        />

        <Button onPress={create}> signup</Button>
      </View>
      <Text className="text-center text-white font-main text-base">
        Have an account?{" "}
        <Text
          className="text-blue"
          onPress={() => navigation.navigate("Sign In")}
        >
          Sign In
        </Text>
      </Text>
      <Text className="text-center text-white font-main text-base">
        New here?{" "}
        <Text
          className="text-blue"
          onPress={() => navigation.navigate("Sign Up")}
        >
          Sign up here!
        </Text>
      </Text>
    </View>
  );
}
export default WelcomeScreen;
