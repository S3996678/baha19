import { StyleSheet } from "react-native";
import { TouchableOpacity, Vibration } from "react-native";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

export default function A95() {
  const [count, setCount] = useState(0);

  const incrementCounter = () => {
    if (count === 94) {
      setCount(count + 1);
      Vibration.vibrate(2000);
    } else if (count < 95) {
      setCount(count + 1);
    } else if (count === 95) {
      setCount(1);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={incrementCounter}
      activeOpacity={1}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={incrementCounter}
        activeOpacity={0.6}
      >
        <Text style={styles.counter}>{count}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c1e", // Dark background for sleek design
  },
  button: {
    width: 350,
    height: 350,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C3E50",
    borderRadius: 175, // Circle shape
    shadowColor: "#000", // Add shadow for depth
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20, // Increased shadow radius
    elevation: 15, // More elevation for stronger shadow on Android
    borderWidth: 2, // Slight border to give an inner glow effect
    borderColor: "rgba(255,255,255,0.1)", // Subtle light border
  },
  counter: {
    fontSize: 80, // Increase font size for impact
    color: "#ECF0F1",
    fontWeight: "bold",
  },
});
