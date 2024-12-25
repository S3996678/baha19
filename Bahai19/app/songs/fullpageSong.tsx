import React, { useState, useLayoutEffect, useEffect } from "react";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { View, Text } from "@/components/Themed";
import { WebView } from "react-native-webview";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FullPageSong() {
  const { title, filePath, id } = useLocalSearchParams(); // Get song details
  const [isSaved, setIsSaved] = useState(false);
  const navigation = useNavigation();

  const favoriteKey = `song_${id}`; // Unique key for each song

  // Add the heart icon to the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSaveToFavorites}>
          <Icon name="heart" size={24} color={isSaved ? "red" : "gray"} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isSaved]);

  // Check if the song is already saved
  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const savedSong = await AsyncStorage.getItem(favoriteKey);
        if (savedSong !== null) {
          setIsSaved(true); // Set as saved if the song is found
        }
      } catch (error) {
        console.error("Failed to load favorite status", error);
      }
    };
    checkIfSaved();
  }, [favoriteKey]);

  // Save or remove the song from favorites
  const handleSaveToFavorites = async () => {
    try {
      if (isSaved) {
        await AsyncStorage.removeItem(favoriteKey); // Remove from favorites
        setIsSaved(false);
        console.log("Song removed from favorites.");
      } else {
        await AsyncStorage.setItem(
          favoriteKey,
          JSON.stringify({ title, id, filePath }) // Save song details
        );
        setIsSaved(true);
        console.log("Song saved to favorites.");
      }
    } catch (error) {
      console.error("Failed to save to favorites", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <WebView
        source={{ uri: `http://192.168.1.112:3000${filePath}` }}
        style={styles.pdf}
        scalesPageToFit={true}
        javaScriptEnabled={true}
        injectedJavaScript={`
          document.body.style.backgroundColor = '#1a1a1a'; 
        `}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a", // Dark background
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 100, // Set height
  },
});
