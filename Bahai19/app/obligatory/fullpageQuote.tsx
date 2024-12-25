import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FullPageQuote() {
  const { text, author, id, ref } = useLocalSearchParams(); // Get the quote details from the navigation parameters
  const [isSaved, setIsSaved] = useState(false);
  const navigation = useNavigation();

  const favoriteKey = `quote_${id}`; // Unique key for each quote using the id

  // Use layout effect to add the heart icon to the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSaveToFavorites}>
          <Icon name="heart" size={24} color={isSaved ? "red" : "gray"} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isSaved]);

  // Check if this specific quote is already saved when the component mounts
  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const savedQuote = await AsyncStorage.getItem(favoriteKey);
        if (savedQuote !== null) {
          setIsSaved(true); // Set as saved if the quote is found in storage
        }
      } catch (error) {
        console.error("Failed to load favorite status", error);
      }
    };
    checkIfSaved();
  }, [favoriteKey]);

  const handleSaveToFavorites = async () => {
    try {
      if (isSaved) {
        // If already saved, remove from favorites
        await AsyncStorage.removeItem(favoriteKey);
        setIsSaved(false);
        console.log("Quote removed from favorites.");
      } else {
        // Save to favorites
        await AsyncStorage.setItem(
          favoriteKey,
          JSON.stringify({ text, author, id, ref }) // Include ref in saved data
        );
        setIsSaved(true);
        console.log("Quote saved to favorites.");
      }
    } catch (error) {
      console.error("Failed to save to favorites", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.quoteCard}>
          {/* Quote Text */}
          <Text style={styles.quoteText}>{text}</Text>
          {/* Author and Citation */}
          <View style={styles.authorContainer}>
            <Text style={styles.authorText}>— {author}</Text>
            {/* Comment separating author and reference */}
            {ref && <Text style={styles.refText}>({ref})</Text>}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#1a1a1a", // Dark background color for the whole screen
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
  },
  quoteCard: {
    backgroundColor: "#2f2f2f",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: "100%", // Card spans the screen width with padding
    maxWidth: 500, // Set a max width to prevent overflow
    marginHorizontal: "auto", // Center card horizontally
  },
  quoteText: {
    fontSize: 18,
    lineHeight: 30, // Better readability with increased line height
    color: "#ffffff",
    textAlign: "justify", // Justified text for clean block formatting
  },
  authorContainer: {
    flexDirection: "row", // Align author and ref horizontally
    marginTop: 20, // Space between the quote text and author
    flexWrap: "wrap", // Ensure content wraps within the card
  },
  authorText: {
    fontSize: 16,
    color: "#a8a7a7", // Lighter gray for the author text
    fontStyle: "italic",
  },
  refText: {
    fontSize: 16,
    color: "#a8a7a7", // Lighter gray for the ref text
    fontStyle: "italic",
    marginLeft: 10, // Space between author and ref
  },
});
