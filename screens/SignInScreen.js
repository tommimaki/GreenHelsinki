import React, { useState } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
} from "react-native";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignInScreen({ navigation }) {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  });

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/leaf.png")} style={styles.logo} />
        </View>
        <Text style={styles.header}>Sign In</Text>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <Icon name="email" size={18} color="#008000" />
            <TextInput
              placeholder="email"
              onChangeText={(text) => setValue({ ...value, email: text })}
            />
          </View>
          <View style={styles.input}>
            <Icon name="lock" size={18} color="#008000" />
            <TextInput
              placeholder="Password"
              onChangeText={(text) => setValue({ ...value, password: text })}
              secureTextEntry={true}
            />
          </View>
        </View>
        <Pressable style={styles.button} onPress={signIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
      </View>
      <Text style={styles.signUp}>
        Don't have an account?{" "}
        <Text
          style={styles.signUpLink}
          onPress={() => navigation.navigate("Sign Up")}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  formContainer: {
    width: "80%",
  },
  logoContainer: {
    marginTop: 100,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  header: {
    fontSize: 24,
    color: "#008000",
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#008000",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#008000",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUp: {
    marginTop: 20,
    fontSize: 16,
  },
  signUpLink: {
    color: "#008000",
    textDecorationLine: "underline",
  },
});
