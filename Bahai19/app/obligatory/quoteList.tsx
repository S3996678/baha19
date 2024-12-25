import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { useLocalSearchParams, useRouter } from "expo-router";

type Quote = {
  id: number;
  text: string;
  author: string;
};

export default function QuotesList() {
  const { category } = useLocalSearchParams();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://192.168.1.112:3000/quotes/${category}`
        );
        const data = await response.json();
        setQuotes(data.quotes || []);
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [category]);

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Quotes</Text>
      <FlatList
        data={quotes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.quoteItem}
            onPress={() =>
              router.push({
                pathname: "./fullpageQuote",
                params: {
                  id: item.id,
                  text: item.text,
                  author: item.author,
                },
              })
            }
          >
            <Text style={styles.quoteText}>
              {item.text.substring(0, 100)}...
            </Text>
            <Text style={styles.authorText}>— {item.author}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1a1a1a",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  quoteItem: {
    backgroundColor: "#2f2f2f",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  quoteText: {
    fontSize: 16,
    color: "#f0f0f0",
    marginBottom: 8,
  },
  authorText: {
    fontSize: 14,
    color: "#a9a9a9",
  },
  listContainer: {
    paddingBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginTop: 20,
  },
});
