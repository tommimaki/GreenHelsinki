import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { auth } from "../firebase/firebase";

function ProfileScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.profileHeader}>My Profile</Text>
        {user && <Text style={styles.email}>{user.email}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ProfileScreen;
