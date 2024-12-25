import { useState, useEffect } from 'react';
import axios from 'axios';

// Define the Prayer type
type Prayer = {
  id: number;
  category: string;
  text: string;
  author: string;
};

const useFetchPrayers = (category: string | undefined, type: string | undefined) => {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category || !type) return; // Ensure category and type are provided

    let apiUrl = '';
    if (type === 'occasional') {
      apiUrl = `http://192.168.1.112:3000/occasional_prayers/${category}`;
    } else if (type === 'general') {
      apiUrl = `http://192.168.1.112:3000/prayers/${category}`;
    } else {
      apiUrl = `http://192.168.1.112:3000/special_tablets/${category}`;
    }

    axios.get(apiUrl)
      .then(response => {
        setPrayers(response.data.prayers);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching prayers:', error);
        setLoading(false);
      });
  }, [category, type]);

  return { prayers, loading };
};

export default useFetchPrayers;
