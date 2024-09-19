import { useMutation } from '@tanstack/react-query';
import { CreateAgentFormFinalValues } from '../types/formValues';
import { Agent } from '../types/agent';

const createAgent = async (
  agent: CreateAgentFormFinalValues
): Promise<Agent> => {
  const formData = new FormData();

  Object.entries(agent).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const response = await fetch(
    'https://api.real-estate-manager.redberryinternship.ge/api/agents',
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

export const useCreateAgent = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return useMutation({
    mutationFn: createAgent,
    onSuccess: () => {
      localStorage.removeItem('avatar');
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      localStorage.removeItem('surname');
      localStorage.removeItem('phone');
      setIsOpen(false);
    },
    onError: (error) => {
      console.error('Error submitting data:', error);
    },
  });
};
