import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";

export default function Quotes() {
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Fetch categories dynamically
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://192.168.1.112:3000/categories/${selectedLetter}`
        );
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [selectedLetter]);

  return (
    <View style={styles.container}>
      {/* Alphabet Slider */}
      <FlatList
        data={alphabet}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedLetter(item)}
            style={[
              styles.letterButton,
              item === selectedLetter && styles.selectedLetter,
            ]}
          >
            <Text
              style={[
                styles.letterText,
                item === selectedLetter && styles.selectedLetterText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.alphabetContainer}
      />

      {/* Categories List */}
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryItem}
              onPress={() =>
                router.push({
                  pathname: "../obligatory/quoteList",
                  params: { category: item },
                })
              }
            >
              <Text style={styles.categoryText}>{item}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.categoryList}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No categories available.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: "#1a1a1a",
  },
  alphabetContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    marginBottom: 10,
  },
  letterButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "#2f2f2f",
    borderRadius: 8,
  },
  selectedLetter: {
    backgroundColor: "#74b9ff",
  },
  letterText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  selectedLetterText: {
    color: "#fff",
  },
  categoryList: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  categoryItem: {
    backgroundColor: "#2f2f2f",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 16,
    color: "#f0f0f0",
    lineHeight: 24,
  },
  loadingText: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginTop: 20,
  },
});
