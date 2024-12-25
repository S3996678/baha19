import { Text, View } from "@/components/Themed";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FlatList, TouchableOpacity, StyleSheet } from "react-native";
import useFetchPrayers from "@/hooks/useFetchPrayers"; // Import the custom hook

export default function Details() {
  const { category, type } = useLocalSearchParams(); // Get category and type from the params
  const router = useRouter();

  // Use the custom hook to fetch prayers
  const { prayers, loading } = useFetchPrayers(
    category as string,
    type as string
  );

  if (loading) {
    return <Text style={styles.loadingText}>Loading prayers...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>{category} Prayers</Text>

      {/* Prayer List */}
      {prayers.length > 0 ? (
        <FlatList
          data={prayers}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "./fullPage",
                  params: { id: item.id, text: item.text, author: item.author },
                });
              }}
              style={styles.prayerItem}
            >
              {/* Displaying a preview of the prayer text */}
              <Text style={styles.prayerText}>
                {item.text.substring(0, item.text.lastIndexOf(" ", 200))}...
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.prayerList}
        />
      ) : (
        <Text style={styles.noPrayersText}>
          No prayers available for this category.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1a1a1a", // Consistent dark background
  },
  loadingText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
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
