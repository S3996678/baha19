import { useLocalSearchParams } from 'expo-router';
import prayerData from '@/assets/data/prayerData.json'; // Adjust path as needed
import { Text, View } from '@/components/Themed';

const PrayerDetail = () => {
  const { category, id } = useLocalSearchParams();

  const prayer = prayerData[category].find((p) => p.id === parseInt(id));

  if (!prayer) {
    return <Text>Prayer not found</Text>;
  }

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{prayer.title}</Text>
      <Text>{prayer.text}</Text>
    </View>
  );
};

export default PrayerDetail;