import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../context/ModalContext';

type DeleteRealEstateResponse = { message: string };

const deleteRealEstate = async (
  id: string
): Promise<DeleteRealEstateResponse> => {
  const response = await fetch(
    `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 9cfee65c-3590-420c-8e46-7914f73113b5`,
      },
    }
  );

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to delete Real estate: ${errorMessage}`);
  }

  return response.json();
};

export const useDeleteRealEstate = (id: string) => {
  const navigate = useNavigate();
  const { setIsOpen } = useModal();
  return useMutation({
    mutationFn: () => deleteRealEstate(id),
    onSuccess: () => {
      navigate('/');
      setIsOpen(false);
    },
    onError: (error) => {
      console.error('Error deleting real estate:', error);
    },
  });
};
