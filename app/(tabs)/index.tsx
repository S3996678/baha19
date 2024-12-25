import { TouchableOpacity, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import prayerData from '@/assets/data/prayerData.json'; // Adjust path if needed

const PrayerCategories = () => {
  const router = useRouter();
  const categories = Object.keys(prayerData);

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>General Prayers</Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`../prayers/${item}`)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default PrayerCategories;