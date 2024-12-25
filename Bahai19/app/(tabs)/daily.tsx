import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons"; // For icons

export default function TabTwoScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push("../prayers/obligatory")}
        style={styles.card}
      >
        <MaterialCommunityIcons
          name={"hands-pray"}
          size={28}
          color="#f0f0f0"
          style={styles.icon}
        />
        <Text style={styles.cardText}>Obligatory Prayer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("../obligatory/A95")}
        style={styles.card}
      >
        <MaterialCommunityIcons
          name={"abacus"}
          size={28}
          color="#f0f0f0"
          style={styles.icon}
        />
        <Text style={styles.cardText}>95 Allah'u'Abhá</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("../obligatory/morningQuote")}
        style={styles.card}
      >
        <Ionicons
          name={"sunny"}
          size={28}
          color="#f0f0f0"
          style={styles.icon}
        />
        <Text style={styles.cardText}>Morning Reading</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("../obligatory/eveningQuote")}
        style={styles.card}
      >
        <Ionicons name={"moon"} size={28} color="#f0f0f0" style={styles.icon} />
        <Text style={styles.cardText}>Evening Reading</Text>
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
