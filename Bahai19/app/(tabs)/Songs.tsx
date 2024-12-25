import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { View, Text } from "@/components/Themed";
import { useRouter } from "expo-router";

export default function SongsTab() {
  const [songs, setSongs] = useState([]);
  const router = useRouter(); // To handle navigation

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("http://192.168.1.112:3000/songs"); // Replace with your server address
        const data = await response.json();
        setSongs(data.songs);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  // Render each song item
  const renderSongItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.songItem}
      onPress={() =>
        router.push({
          pathname: "../songs/fullpageSong",
          params: {
            id: item.id,
            title: item.title,
            filePath: item.file_path, // Pass the file path
          },
        })
      }
    >
      <Text style={styles.songTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Songs</Text>
      {/* FlatList to display the songs */}
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSongItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  songItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#74b9ff", // A vibrant color for the list item
    borderRadius: 8,
    marginVertical: 8,
  },
  songTitle: {
    fontSize: 18,
    color: "#fff", // White text for contrast
  },
});
