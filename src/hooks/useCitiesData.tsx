import { useQuery } from '@tanstack/react-query';
import { City } from '../types/city';

const getCities = async (): Promise<City[]> => {
  const response = await fetch(
    `https://api.real-estate-manager.redberryinternship.ge/api/cities`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 9cfee65c-3590-420c-8e46-7914f73113b5`,
      },
    }
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useCitiesData = () => {
  return useQuery({ queryKey: ['cities'], queryFn: getCities });
};
