import { useQuery } from '@tanstack/react-query';
import { Region } from '../types/region';

const getRegions = async (): Promise<Region[]> => {
  const response = await fetch(
    `https://api.real-estate-manager.redberryinternship.ge/api/regions`,
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

export const useRegionsData = () => {
  return useQuery({ queryKey: ['regions'], queryFn: getRegions });
};
