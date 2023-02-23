import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { db, auth } from "../firebase/firebase";
import { ref, push, onValue, remove } from "firebase/database";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  function fetchFavorites() {
    const user = auth.currentUser;
    const itemsRef = ref(db, `favorites/${user.uid}`);
    onValue(
      itemsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const favoritesArray = [];
          Object.entries(data).forEach(([key, { title, ...item }]) => {
            favoritesArray.push({
              title: title,
              key: key,
              ...item,
            });
          });

          setFavorites(favoritesArray);
        }
      },
      (error) => {
        console.log("onValue error:", error);
      }
    );
  }

  useEffect(() => {
    fetchFavorites();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("User signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.log("Error signing out user:", error);
      });
  }

  function deleteItem(itemKey) {
    const user = auth.currentUser;
    const itemRef = ref(db, `favorites/${user.uid}/${itemKey}`);
    console.log(itemRef);
    remove(itemRef)
      .then(() => {
        console.log(`Item with ID ${itemKey} was deleted from the database.`);
        // call the database to retrieve the updated list of favorites
        getFavorites();
      })
      .catch((error) => {
        console.log(`Error deleting item with ID ${itemKey}: ${error.message}`);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <MaterialCommunityIcons name="email" size={24} color="#262626" />
        <Text style={styles.email}>{user && user.email}</Text>
        <TouchableOpacity onPress={handleSignOut}>
          <AntDesign name="logout" size={24} color="#262626" />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.FlatList}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("MapScreen", { item: item });
              }}
              onLongPress={() => {
                deleteItem(item.key);
              }}
            >
              <View style={styles.listItem}>
                <Text style={styles.addyText}> {item.name_en}</Text>
                <Text style={styles.addyText}>{item.street_address_en}</Text>
                <Text style={styles.showOnMapText}>Show on Map</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        data={favorites}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  profileContainer: {
    marginTop: 120,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  email: {
    fontSize: 30,
    marginLeft: 10,
    fontWeight: "bold",
  },

  profileHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#262626",
  },
  email: {
    fontSize: 18,
    color: "#262626",
    marginTop: 10,
  },
  FlatList: {
    paddingTop: 20,
  },
  listcontainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  addyText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#262626",
  },
  showOnMapText: {
    fontSize: 14,
    color: "#388E3C",
  },
});

export default ProfileScreen;
