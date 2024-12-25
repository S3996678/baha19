import { Text, View } from '@/components/Themed';
import React from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import prayerData from '@/assets/data/prayerData.json'; // Adjust path as needed

const GeneralPrayerList = () => {
  const { category } = useLocalSearchParams();
  const router = useRouter();

  const prayers = prayerData[category];

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{category} Prayers</Text>
      <FlatList
        data={prayers}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/prayers/${category}/${item.id}`)}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default GeneralPrayerList;
