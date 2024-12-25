import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function MorningQuote() {
  const router = useRouter();

  const fetchQuote = async (length: string) => {
    try {
      const response = await fetch(
        `http://192.168.1.112:3000/quotes/random/${length}?author=Bahá’u’lláh`
      );
      const data = await response.json();
      if (data.quote) {
        router.push({
          pathname: "./fullpageQuote",
          params: {
            id: data.quote.id,
            text: data.quote.text,
            author: data.quote.author,
            category: data.quote.category,
            ref: data.quote.ref,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => fetchQuote("short")} style={styles.card}>
        <Ionicons name="text" size={28} color="#f0f0f0" style={styles.icon} />
        <Text style={styles.cardText}>Short</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => fetchQuote("medium")}
        style={styles.card}
      >
        <Ionicons name="text" size={28} color="#f0f0f0" style={styles.icon} />
        <Text style={styles.cardText}>Medium</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => fetchQuote("long")} style={styles.card}>
        <Ionicons name="text" size={28} color="#f0f0f0" style={styles.icon} />
        <Text style={styles.cardText}>Long</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a", // Dark background for contrast
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 14,
    backgroundColor: "#74b9ff", // Vibrant color for cards
    borderRadius: 12,
    marginVertical: 10,
    width: "80%", // Balanced width
    elevation: 4, // Adds shadow on Android
  },
  cardText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#ffffff", // White text for contrast
    marginLeft: 12,
  },
  icon: {
    marginRight: 10,
  },
});
