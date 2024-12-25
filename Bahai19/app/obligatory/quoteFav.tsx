import { StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";

// Define the structure of a Prayer
type Prayer = {
  text: string;
  author: string;
  id: string | number;
  category: string;
  ref: string;
};

export default function Favourites() {
  const [savedPrayers, setSavedPrayers] = useState<Prayer[]>([]);
  const router = useRouter();

  // useFocusEffect to re-fetch saved prayers when the screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchSavedPrayers = async () => {
        try {
          const keys = await AsyncStorage.getAllKeys();
          const result = await AsyncStorage.multiGet(keys);

          // Filter out null values and parse the valid JSON strings
          const prayers: Prayer[] = result
            .filter(([key]) => key.startsWith("quote_"))
            .filter((req) => req[1] !== null) // Filter out any null values
            .map((req) => JSON.parse(req[1]!)); // Use '!' to assert that req[1] is not null

          setSavedPrayers(prayers); // Update the state with fetched prayers
        } catch (error) {
          console.error("Failed to load saved prayers", error);
        }
      };

      fetchSavedPrayers();
    }, []) // Empty dependency array ensures this only runs when the screen is focused
  );

  if (savedPrayers.length === 0) {
    return (
      <Text style={styles.noPrayersText}>No prayers saved in favourites.</Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourites</Text>

      <FlatList
        data={savedPrayers}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "./fullpageQuote",
                params: {
                  id: item.id,
                  text: item.text,
                  author: item.author,
                  category: item.category,
                  ref: item.ref,
                },
              });
            }}
            style={styles.prayerItem}
          >
            <Text style={styles.prayerText}>
              {item.text.substring(0, item.text.lastIndexOf(" ", 200))}...
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()} // Use index if the prayer doesn't have a unique ID
        contentContainerStyle={styles.prayerList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1a1a1a", // Consistent dark background
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  prayerItem: {
    backgroundColor: "#2f2f2f", // Same button style as the list view page
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  prayerText: {
    fontSize: 16,
    color: "#f0f0f0",
    lineHeight: 24, // Improved readability
  },
  noPrayersText: {
    fontSize: 18,
    color: "#ccc",
    textAlign: "center",
    marginTop: 20,
  },
  prayerList: {
    paddingBottom: 20,
  },
});
