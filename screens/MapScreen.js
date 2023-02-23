import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import { auth, db } from "../firebase/firebase";
import { ref, push, onValue } from "firebase/database";

const MapScreen = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [duplicateItem, setDuplicateItem] = useState(null);

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

  const saveItemToFavorites = () => {
    favorites.forEach((favorite) => {
      console.log(favorite.name_fi);
    });
    const isItemInFavorites = favorites.some(
      (favorite) => favorite.name_fi === item.name_fi
    );
    if (isItemInFavorites) {
      setDuplicateItem(item);
      setModalVisible(true);

      console.log("Item is already in favorites.");
      return;
    }
    const user = auth.currentUser;
    const fref = ref(db, `favorites/${user.uid}`);
    console.log("added item" + item.name_fi);
    push(fref, item);
  };

  const DuplicateItemModal = ({ visible, item, onClose }) => {
    return visible && item ? (
      <View style={styles.modal}>
        <Modal visible={visible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              The item "{item.name_fi}" is already in your favorites list.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={onClose}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    ) : null;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require("../assets/bg2.jpeg")}
          style={styles.backgroundImage}
        />

        <View style={styles.infoContainer}>
          {item.name_fi && <Text style={styles.title}>{item.name_fi}</Text>}
          {item.street_address_fi && item.address_city_fi && (
            <Text style={styles.address}>
              {item.street_address_fi}, {item.address_city_fi}
            </Text>
          )}

          {item.desc_en && <Text style={styles.address}> {item.desc_en} </Text>}
          {item.picture_url && (
            <Image source={{ uri: item.picture_url }} style={styles.image} />
          )}
          <View style={styles.add}>
            <TouchableOpacity
              style={styles.button}
              onPress={saveItemToFavorites}
            >
              <MaterialIcons
                name="star"
                size={24}
                color="white"
                style={styles.icon}
              />
              <Text style={styles.buttonText}>Add to favorites</Text>
            </TouchableOpacity>
          </View>
        </View>
        <DuplicateItemModal
          visible={modalVisible}
          item={duplicateItem}
          onClose={() => setModalVisible(false)}
        />

        {item.latitude && item.longitude && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: item.latitude,
              longitude: item.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
            />
          </MapView>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 8,
    resizeMode: "cover",
  },
  add: {
    alignItems: "center",
    marginTop: 10,
    borderColor: "white",
    borderWidth: 2,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#03C03C",
    padding: 10,
    borderRadius: 8,
    width: 200,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },

  infoContainer: {
    width: "90%",
    marginHorizontal: 8,
    marginTop: 100,
    backgroundColor: "#03C03C",
    padding: 16,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 50,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    borderLeftColor: "white",
    borderLeftWidth: 3,
    elevation: 10, // add box shadow
    shadowColor: "black", // add box shadow
    shadowOffset: { width: 0, height: 2 }, // add box shadow
    shadowOpacity: 0.7, // add box shadow
    shadowRadius: 3.9, // add box shadow
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  address: {
    fontSize: 14,
    marginBottom: 8,
    color: "white",
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  map: {
    flex: 1,
    width: "100%",
    height: 400,
    borderTopWidth: 2,
    borderTopColor: "black",
    borderWidth: 1,
    borderColor: "green",
  },
  backgroundImage: {
    position: "absolute",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 1,
  },
  modal: {
    height: 200, // set the height of the modal container
    width: "80%", // set the width of the modal container
    alignSelf: "center", // center the modal horizontally
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  modalButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MapScreen;
