import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerTitle: "", // Blank to prevent route name fallback
          headerStyle: {
            backgroundColor: "#1a1a1a", // Universal dark background for all headers
          },
          headerTintColor: "#e5e5e5", // Universal light text/icons color for all headers
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="prayers/details" options={{ title: "details" }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen name="prayers/fullPage" options={{ title: "prayer" }} />
        <Stack.Screen
          name="prayers/obligatory"
          options={{ title: "obligatory" }}
        />
        <Stack.Screen
          name="obligatory/A95"
          options={{ title: "95 Allah'u'Abhá" }}
        />
        <Stack.Screen
          name="obligatory/fullpageQuote"
          options={{ title: "Quote" }}
        />
        <Stack.Screen
          name="obligatory/morningQuote"
          options={{ title: "morning" }}
        />

        <Stack.Screen
          name="obligatory/eveningQuote"
          options={{ title: "evening" }}
        />
        <Stack.Screen name="songs/fullpageSong" options={{ title: "song" }} />
      </Stack>
    </ThemeProvider>
  );
}
