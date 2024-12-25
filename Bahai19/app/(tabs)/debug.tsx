import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "@/components/Themed";

const LocalStorageViewer = () => {
  const [storageData, setStorageData] = useState<
    { key: string; value: string }[]
  >([]);

  // Function to retrieve all stored data
  const viewAllStoredData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const data = await AsyncStorage.multiGet(keys);
      const formattedData = data.map(([key, value]) => ({
        key,
        value: value || "null",
      }));
      setStorageData(formattedData); // Set the data to state to display in the component
    } catch (error) {
      console.log("Error viewing all data", error);
    }
  };

  // Function to delete an item from local storage
  const deleteItem = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      // Refresh the storage data after deletion
      viewAllStoredData();
    } catch (error) {
      console.log("Error deleting item", error);
    }
  };

  // Load the storage data when the component mounts
  useEffect(() => {
    viewAllStoredData();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Refresh Storage Data" onPress={viewAllStoredData} />
      <ScrollView style={styles.scroll}>
        {storageData.length > 0 ? (
          storageData.map(({ key, value }) => (
            <View key={key} style={styles.item}>
              <Text style={styles.key}>Key: {key}</Text>
              <Text style={styles.value}>Value: {value}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteItem(key)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text>No data in AsyncStorage</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  scroll: {
    marginVertical: 10,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  key: {
    fontWeight: "bold",
  },
  value: {
    color: "gray",
  },
  deleteButton: {
    marginTop: 10,
    paddingVertical: 5,
    backgroundColor: "#ff4d4d",
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default LocalStorageViewer;
