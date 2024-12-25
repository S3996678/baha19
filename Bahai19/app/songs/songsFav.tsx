import { StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";

// Define the structure of a Prayer
type Prayer = {
  filePath: string;
  title: string;
  id: string | number;
};

export default function songsFav() {
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
            .filter(([key]) => key.startsWith("song_"))
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
                pathname: "./fullpageSong",
                params: {
                  id: item.id,
                  title: item.title,
                  filePath: item.filePath,
                },
              });
            }}
            style={styles.songItem}
          >
            <Text style={styles.songTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()} // Use index if the prayer doesn't have a unique ID
        contentContainerStyle={styles.songList}
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
    fontSize: 24,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
  },
  songItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#74b9ff", // Vibrant color similar to the SongsTab
    borderRadius: 8,
    marginVertical: 8,
  },
  songTitle: {
    fontSize: 18,
    color: "#fff", // White text for contrast
  },
  noPrayersText: {
    fontSize: 18,
    color: "#ccc",
    textAlign: "center",
    marginTop: 20,
  },
  songList: {
    paddingBottom: 20,
  },
});
