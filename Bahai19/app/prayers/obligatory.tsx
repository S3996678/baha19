import { StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const fetchPrayerById = async (id: number) => {
  try {
    const response = await fetch(
      `http://192.168.1.112:3000/obligatory_prayers/${id}`
    );
    const data = await response.json();
    return data.prayer;
  } catch (error) {
    console.error("Error fetching prayer:", error);
    return null;
  }
};

export default function ObligatoryPrayers() {
  const [prayers, setPrayers] = useState<{ [key: string]: any }>({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shortPrayer = await fetchPrayerById(1);
        const mediumPrayer = await fetchPrayerById(2);
        const longPrayer = await fetchPrayerById(3);

        setPrayers({
          short: shortPrayer,
          medium: mediumPrayer,
          long: longPrayer,
        });
      } catch (error) {
        console.error("Error fetching prayers:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "./fullPage",
            params: {
              id: 1,
              text: prayers.short?.text,
              author: prayers.short?.author,
            },
          });
        }}
        style={styles.card}
      >
        <Ionicons name="text" size={28} color="#f0f0f0" style={styles.icon} />
        <Text style={styles.cardText}>Short</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "./fullPage",
            params: {
              id: 2,
              text: prayers.medium?.text,
              author: prayers.medium?.author,
            },
          });
        }}
        style={styles.card}
      >
        <Ionicons name="text" size={28} color="#f0f0f0" style={styles.icon} />
        <Text style={styles.cardText}>Medium</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "./fullPage",
            params: {
              id: 3,
              text: prayers.long?.text,
              author: prayers.long?.author,
            },
          });
        }}
        style={styles.card}
      >
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
