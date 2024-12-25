import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarActiveTintColor: "#74b9ff",
        tabBarStyle: {
          backgroundColor: "#1a1a1a", // Static dark background
        },
        headerStyle: {
          backgroundColor: "#1a1a1a", // Dark background for tabs header
        },
        headerTintColor: "#e5e5e5", // Light text/icons for tabs header
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Prayer",
          tabBarIcon: ({ color }) => (
            <Feather name="book-open" size={24} color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="daily"
        options={{
          title: "Daily",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="checklist" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Songs"
        options={{
          title: "Songs",
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="music-tone-alt" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Quotes"
        options={{
          title: "Quotes",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="quote-right" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Favourites"
        options={{
          title: "Favourites",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
