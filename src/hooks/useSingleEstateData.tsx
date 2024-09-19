import { useQuery } from '@tanstack/react-query';

type City = {
  id: number;
  name: string;
  region_id: number;
  region: Region;
};

type Region = {
  id: number;
  name: string;
};

type Agent = {
  id: number;
  name: string;
  surname: string;
  email: string;
  avatar: string;
  phone: string;
};

type RealEstate = {
  id: number;
  address: string;
  image: string;
  zip_code: string;
  description: string;
  price: number;
  bedrooms: number;
  area: number;
  is_rental: number;
  agent_id: number;
  city_id: number;
  created_at: string;
  city: City;
  agent: Agent;
};

const getSingleEstate = async (id: string): Promise<RealEstate> => {
  const response = await fetch(
    `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
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

export const useSingleEstateData = (id: string) => {
  return useQuery({
    queryKey: ['real-estate', id],
    queryFn: () => getSingleEstate(id),
  });
};
