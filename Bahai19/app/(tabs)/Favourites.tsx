import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons"; // For icons

export default function Favourites() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push("../prayers/prayerFav")}
        style={styles.card}
      >
        <MaterialCommunityIcons
          name={"hands-pray"}
          size={28}
          color="#f0f0f0"
          style={styles.icon}
        />
        <Text style={styles.cardText}>Prayers</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("../obligatory/quoteFav")}
        style={styles.card}
      >
        <MaterialCommunityIcons
          name={"format-quote-open"}
          size={28}
          color="#f0f0f0"
          style={styles.icon}
        />
        <Text style={styles.cardText}>Quotes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("../songs/songsFav")}
        style={styles.card}
      >
        <MaterialCommunityIcons
          name={"music"}
          size={28}
          color="#f0f0f0"
          style={styles.icon}
        />
        <Text style={styles.cardText}>Songs</Text>
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
    backgroundColor: "#74b9ff", // Random vibrant color for each card
    borderRadius: 12,
    marginVertical: 10,
    width: "80%", // Adjust width to make it look balanced
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
