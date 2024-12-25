import { useState, useEffect } from 'react';
import axios from 'axios';

// Define the type for Prayer
type Prayer = {
  id: number;
  category: string;
  text: string;
  author: string;
};

// Define the type for categories (array of strings)
type Category = string;

const useFetchCategories = () => {
  const [generalCategories, setGeneralCategories] = useState<Category[]>([]);
  const [occasionalCategories, setOccasionalCategories] = useState<Category[]>([]);
  const [specialCategories, setSpecialCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch general prayers
    axios.get<{ prayers: Prayer[] }>('http://192.168.1.112:3000/prayers')
      .then(response => {
        const fetchedGeneralCategories = [...new Set(response.data.prayers.map(prayer => prayer.category))];
        setGeneralCategories(fetchedGeneralCategories);
      })
      .catch(error => console.error('Error fetching general categories:', error));

    // Fetch special prayers
    axios.get<{ prayers: Prayer[] }>('http://192.168.1.112:3000/special_tablets')
      .then(response => {
        const fetchedSpecialCategories = [...new Set(response.data.prayers.map(prayer => prayer.category))];
        setSpecialCategories(fetchedSpecialCategories);
      })
      .catch(error => console.error('Error fetching special categories:', error));

    // Fetch occasional prayers
    axios.get<{ prayers: Prayer[] }>('http://192.168.1.112:3000/occasional_prayers')
      .then(response => {
        const fetchedOccasionalCategories = [...new Set(response.data.prayers.map(prayer => prayer.category))];
        setOccasionalCategories(fetchedOccasionalCategories);
      })
      .catch(error => console.error('Error fetching occasional categories:', error))
      .finally(() => setLoading(false));
  }, []);

  return { generalCategories, occasionalCategories, specialCategories, loading };
};

export default useFetchCategories;
