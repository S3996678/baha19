// import { TouchableOpacity, FlatList, ScrollView } from 'react-native';
// import { Text, View, useThemeColor } from '@/components/Themed';
// import { useRouter } from 'expo-router';
// import useFetchCategories from '@/hooks/useFetchCategories'; // Import the custom hook
// import { StyleSheet } from 'react-native';

// const PrayerCategories = () => {
//   const { generalCategories, occasionalCategories, specialCategories, loading } = useFetchCategories(); // Use the hook
//   const router = useRouter();

//   if (loading) {
//     return <Text>Loading...</Text>;
//   }

//   const combinedData = [
//     { title: 'General Prayers', data: generalCategories, type: 'general' },
//     { title: 'Occasional Prayers', data: occasionalCategories, type: 'occasional' },
//     { title: 'Special Tablets', data: specialCategories, type: 'special' },
//   ];

//   return (
//     <FlatList
//       data={combinedData}
//       keyExtractor={(item, index) => index.toString()}
//       renderItem={({ item,index }) => (
//         <View>
//           <View  style={[
//         styles.sectionHeader,
//         index > 0 && { marginTop: 30 } // Add margin only for sections after the first one
//       ]}>
//             <Text style={styles.sectionTitle}>{item.title}</Text>
//           </View>
//           {item.data.map((category) => (
//             <TouchableOpacity
//               key={category}
//               onPress={() => router.push({ pathname: '../prayers/details', params: { category, type: item.type } })}
//               style={styles.button}
//             >
//               <Text style={styles.buttonText}>{category}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       )}
//       contentContainerStyle={styles.contentContainer}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   contentContainer: {
//     paddingBottom: 20,
//     paddingHorizontal: 16,
//     backgroundColor: '#1a1a1a', // Background matches the screen color
//     // paddingVertical: 20,

//   },
//   sectionHeader: {
//     backgroundColor: 'transparent',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#ffffff',
//     textAlign: 'center',
//   },
//   button: {
//     paddingVertical: 16,
//     paddingHorizontal: 14,
//     backgroundColor: '#3A3A3A', // Lighter gray for the buttons
//     borderRadius: 12,
//     marginTop: 12,
//     borderColor: '#4A4A4A', // Slightly darker gray border
//     borderWidth: 1,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 4,
//     alignItems: 'center',  // Center the text inside the button
//   },
//   buttonText: {
//     fontSize: 18,
//     fontWeight: '400',
//     color: '#f0f0f0', // Light gray for text
//     textAlign: 'center',
//   },
// });

// export default PrayerCategories;

//{the one with the icons}
import { TouchableOpacity, FlatList, View } from "react-native";
import { Text, useThemeColor } from "@/components/Themed";
import { useRouter } from "expo-router";
import useFetchCategories from "@/hooks/useFetchCategories";
import { StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"; // For icons
import renderIcon from "../prayers/lcon";

const PrayerCategories = () => {
  const {
    generalCategories,
    occasionalCategories,
    specialCategories,
    loading,
  } = useFetchCategories();
  const router = useRouter();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const combinedData = [
    { title: "General Prayers", data: generalCategories, type: "general" },
    {
      title: "Occasional Prayers",
      data: occasionalCategories,
      type: "occasional",
    },
    { title: "Special Tablets", data: specialCategories, type: "special" },
  ];

  // Explicitly type the category as string

  return (
    <FlatList
      data={combinedData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View>
          <View style={[styles.sectionHeader, index > 0 && { marginTop: 30 }]}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
          </View>
          {item.data.map(
            (
              category: string // Explicitly type the category here as well
            ) => (
              <TouchableOpacity
                key={category}
                onPress={() =>
                  router.push({
                    pathname: "../prayers/details",
                    params: { category, type: item.type },
                  })
                }
                style={styles.card}
              >
                <MaterialCommunityIcons
                  name={renderIcon(category)}
                  size={28}
                  color="#f0f0f0"
                  style={styles.icon}
                />
                <Text style={styles.cardText}>{category}</Text>
              </TouchableOpacity>
            )
          )}
        </View>
      )}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: "#1a1a1a",
  },
  sectionHeader: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 14,
    backgroundColor: "#74b9ff", // Random vibrant color
    borderRadius: 12,
    marginVertical: 10,
    borderWidth: 0, // No border for a simpler look
    elevation: 4,
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

// const styles = StyleSheet.create({
//   contentContainer: {
//     paddingBottom: 20,
//     paddingHorizontal: 16,
//     backgroundColor: "#1a1a1a",
//   },
//   sectionHeader: {
//     backgroundColor: "transparent",
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 28,
//     fontWeight: "700",
//     color: "#ffffff",
//     textAlign: "center",
//   },
//   card: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 18,
//     paddingHorizontal: 18,
//     backgroundColor: "#353535", // Slightly lighter color
//     borderRadius: 8, // Less rounded corners for a flatter look
//     marginVertical: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2, // Softer shadow
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   cardText: {
//     fontSize: 18,
//     fontWeight: "500",
//     color: "#ffffff",
//     marginLeft: 12,
//   },
//   icon: {
//     marginRight: 10,
//   },
// });

export default PrayerCategories;
