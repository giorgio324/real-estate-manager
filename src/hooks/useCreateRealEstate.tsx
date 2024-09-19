import { useMutation } from '@tanstack/react-query';
import { CreateListingFormFinalValues } from '../types/formValues';
import { RealEstate } from '../types/realEstate';
import { useNavigate } from 'react-router-dom';

const crateRealEstate = async (
  estate: CreateListingFormFinalValues
): Promise<RealEstate> => {
  const formData = new FormData();

  Object.entries(estate).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const response = await fetch(
    'https://api.real-estate-manager.redberryinternship.ge/api/real-estates',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer 9cfee65c-3590-420c-8e46-7914f73113b5`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to create agent: ${errorMessage}`);
  }

  return response.json();
};

export const useCreateRealEstate = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: crateRealEstate,
    onSuccess: () => {
      localStorage.removeItem('address');
      localStorage.removeItem('agent');
      localStorage.removeItem('area');
      localStorage.removeItem('bedrooms');
      localStorage.removeItem('description');
      localStorage.removeItem('image');
      localStorage.removeItem('is_rental');
      localStorage.removeItem('price');
      localStorage.removeItem('zip_code');
      localStorage.removeItem('city');
      localStorage.removeItem('region');
      navigate('/');
    },
    onError: (error) => {
      console.error('Error submitting data:', error);
    },
  });
};
